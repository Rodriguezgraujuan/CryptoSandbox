package practicajrg.cryptosandbox.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import practicajrg.cryptosandbox.Reposritory.CryptoRepository;
import practicajrg.cryptosandbox.Reposritory.RegistroRepository;
import practicajrg.cryptosandbox.entities.Crypto;
import practicajrg.cryptosandbox.entities.Registro;

import java.util.List;

@Service
public class RegistroService {

    @Autowired
    private RegistroRepository registroRepository;

    public Registro saveCrypto(Registro registro) {
        return registroRepository.save(registro);
    }
    public Registro findById(Long id) {
        return registroRepository.findById(id).orElse(null);
    }
    public List<Registro> findAll() {
        return registroRepository.findAll();
    }
    public void deleteById(Long id) {
        registroRepository.deleteById(id);
    }

    public List<Registro> findBySymbol(String symbol) {
        return registroRepository.findByCryptoSymbol(symbol);
    }
}
