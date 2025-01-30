package practicajrg.cryptosandbox.Service;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import practicajrg.cryptosandbox.Reposritory.CryptoRepository;
import practicajrg.cryptosandbox.Reposritory.RegistroRepository;
import practicajrg.cryptosandbox.Reposritory.UserRepository;
import practicajrg.cryptosandbox.entities.Crypto;
import practicajrg.cryptosandbox.entities.Registro;
import practicajrg.cryptosandbox.entities.Usuario;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
public class CryptoService {
    private final String API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=30&page=1&sparkline=false";

    @Autowired
    private CryptoRepository cryptoRepository;
    @Autowired
    private RegistroRepository registroRepository;

    public Crypto saveCrypto(Crypto crypto) {
        return cryptoRepository.save(crypto);
    }
    public Crypto findById(Long id) {
        return cryptoRepository.findById(id).orElse(null);
    }
    public List<Crypto> findAll() {
        return cryptoRepository.findAll();
    }
    public void deleteById(Long id) {
        cryptoRepository.deleteById(id);
    }

    public Crypto findByName(String name) {
        return cryptoRepository.findByName(name);
    }

    @Scheduled(fixedRate=180000)
    public void updateBD() {
        if (cryptoRepository.findAll().isEmpty()) {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<List> response = restTemplate.getForEntity(API_URL, List.class);
            List<Map<String, Object>> cryptoList = response.getBody();

            List<Crypto> result = new ArrayList<>();
            List<Registro> registros = new ArrayList<>();
            if (cryptoList != null) {
                for (Map<String, Object> crypto : cryptoList) {
                    result.add(cryptoApiGet(crypto));
                    registros.add(new Registro(cryptoApiGet(crypto).getValue(), cryptoApiGet(crypto).getLast_updated(), cryptoApiGet(crypto)));
                }
            }
            cryptoRepository.saveAll(result);
            registroRepository.saveAll(registros);
        }else {
            // Si ya hay criptomonedas en la base de datos, las actualizamos
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<List> response = restTemplate.getForEntity(API_URL, List.class);
            List<Map<String, Object>> cryptoList = response.getBody();

            if (cryptoList != null) {
                for (Map<String, Object> crypto : cryptoList) {
                    Crypto cryptoApiGet = cryptoApiGet(crypto);

                    // Buscar si la criptomoneda ya está en la base de datos
                    Optional<Crypto> existingCrypto = Optional.ofNullable(cryptoRepository.findByName(cryptoApiGet.getName()));

                    if (existingCrypto.isPresent()) {
                        Crypto cryptoToUpdate = getCrypto(existingCrypto, cryptoApiGet);
                        cryptoRepository.save(cryptoToUpdate);
                        registroRepository.save(new Registro(cryptoToUpdate.getValue(), cryptoToUpdate.getLast_updated(), cryptoToUpdate));
                    } else {
                        // Si la criptomoneda no existe, la creamos y la guardamos
                        cryptoRepository.save(cryptoApiGet(crypto)); // Guardamos la nueva criptomoneda
                        new Registro(cryptoApiGet(crypto).getValue(), cryptoApiGet(crypto).getLast_updated(), cryptoApiGet(crypto));
                    }
                }
            }
        }

    }

    private static Crypto getCrypto(Optional<Crypto> existingCrypto, Crypto cryptoApiGet) {
        Crypto cryptoToUpdate = existingCrypto.get();
        cryptoToUpdate.setValue(cryptoApiGet.getValue());
        cryptoToUpdate.setSymbol(cryptoApiGet.getSymbol());
        cryptoToUpdate.setLast_updated(cryptoApiGet.getLast_updated());
        cryptoToUpdate.setHigh_24h(cryptoApiGet.getHigh_24h());
        cryptoToUpdate.setLow_24h(cryptoApiGet.getLow_24h());
        cryptoToUpdate.setMarket_cap(cryptoApiGet.getMarket_cap());
        cryptoToUpdate.setMarket_cap_rank(cryptoApiGet.getMarket_cap_rank());
        cryptoToUpdate.setPrice_change_percentage_24h(cryptoApiGet.getPrice_change_percentage_24h());
        cryptoToUpdate.setPrice_change_24h(cryptoApiGet.getPrice_change_24h());
        return cryptoToUpdate;
    }

    private Crypto cryptoApiGet(Map<String, Object> crypto) {
        String name = (String) crypto.get("name");
        Number priceNumber = (Number) crypto.get("current_price");
        String symbol = (String) crypto.get("symbol");
        String last_updated = (String) crypto.get("last_updated");
        Instant instant = Instant.parse(last_updated);
        LocalDate date = instant.atZone(ZoneId.systemDefault()).toLocalDate();
        Number high_24h = (Number) crypto.get("high_24h");
        Number low_24h = (Number) crypto.get("low_24h");
        Number market_cap = (Number) crypto.get("market_cap");
        Integer market_cap_rank = (Integer) crypto.get("market_cap_rank");
        Number price_change_percentage_24h = (Number) crypto.get("price_change_percentage_24h");
        Number price_change_24h = (Number) crypto.get("price_change_24h");
        double price = priceNumber.doubleValue();
        double low = low_24h.doubleValue();
        double high = high_24h.doubleValue();
        double market_cap_value = market_cap.doubleValue();
        double price_change_percentage_24h_value = price_change_percentage_24h.doubleValue();
        double price_change_24h_value = price_change_24h.doubleValue();
        
        return new Crypto(name, price, symbol, date, high, low, market_cap_value, market_cap_rank, price_change_percentage_24h_value, price_change_24h_value);
    }
}
