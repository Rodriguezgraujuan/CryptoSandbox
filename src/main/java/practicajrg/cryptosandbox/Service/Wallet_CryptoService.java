package practicajrg.cryptosandbox.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import practicajrg.cryptosandbox.Reposritory.UserRepository;
import practicajrg.cryptosandbox.Reposritory.Wallet_CryptoRepository;
import practicajrg.cryptosandbox.entities.Transaction;
import practicajrg.cryptosandbox.entities.Usuario;
import practicajrg.cryptosandbox.entities.Wallet_Crypto;

import java.util.List;

@Service
public class Wallet_CryptoService {
    @Autowired
    private Wallet_CryptoRepository walletCryptoRepository;

    public Wallet_Crypto saveWallet_Crypto(Wallet_Crypto walletCrypto) {
        return walletCryptoRepository.save(walletCrypto);
    }
    public Wallet_Crypto findById(Long id) {
        return walletCryptoRepository.findById(id).orElse(null);
    }
    public List<Wallet_Crypto> findAll() {
        return walletCryptoRepository.findAll();
    }
    public void deleteById(Long id) {
        walletCryptoRepository.deleteById(id);
    }
    public List<Wallet_Crypto> findByWalletId(Long id) {
        return walletCryptoRepository.findByWalletId(id);
    }
}
