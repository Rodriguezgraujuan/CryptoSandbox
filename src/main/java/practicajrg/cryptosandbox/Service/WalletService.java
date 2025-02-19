package practicajrg.cryptosandbox.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import practicajrg.cryptosandbox.Reposritory.WalletRepository;
import practicajrg.cryptosandbox.entities.Wallet;

import java.util.List;

@Service
public class WalletService {
    @Autowired
    private WalletRepository walletRepository;

    public Wallet saveWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }
    public List<Wallet> findAll() {
        return walletRepository.findAll();
    }

}
