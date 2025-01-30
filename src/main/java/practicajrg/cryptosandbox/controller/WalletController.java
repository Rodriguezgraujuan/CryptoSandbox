package practicajrg.cryptosandbox.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import practicajrg.cryptosandbox.Service.CryptoService;
import practicajrg.cryptosandbox.Service.WalletService;
import practicajrg.cryptosandbox.entities.Wallet;

import java.util.List;

@RestController
@CrossOrigin("*")
public class WalletController {
    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/wallets")
    public List<Wallet> all() {
        return walletService.findAll();
    }

    @GetMapping("/wallet/{id}")
    public Wallet wallet(@PathVariable Long id) {
        return walletService.findById(id);
    }
}
