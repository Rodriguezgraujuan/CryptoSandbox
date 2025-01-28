package practicajrg.cryptosandbox.Service;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import practicajrg.cryptosandbox.Reposritory.CryptoRepository;
import practicajrg.cryptosandbox.Reposritory.UserRepository;
import practicajrg.cryptosandbox.entities.Crypto;
import practicajrg.cryptosandbox.entities.Usuario;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CryptoService {
    private final String API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=30&page=1&sparkline=false";

    @Autowired
    private CryptoRepository cryptoRepository;

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

    public void updateBD() {
        cryptoRepository.deleteAll();
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List> response = restTemplate.getForEntity(API_URL, List.class);
        List<Map<String, Object>> cryptoList = response.getBody();

        List<Crypto> result = new ArrayList<>();
        if (cryptoList != null) {
            for (Map<String, Object> crypto : cryptoList) {
                String name = (String) crypto.get("name");
                Number priceNumber = (Number) crypto.get("current_price");
                double price = priceNumber.doubleValue();
                result.add(new Crypto(name, price));
            }
        }
        cryptoRepository.saveAll(result);
    }
}
