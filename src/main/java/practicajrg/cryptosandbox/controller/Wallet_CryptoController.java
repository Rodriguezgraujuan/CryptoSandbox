package practicajrg.cryptosandbox.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import practicajrg.cryptosandbox.Service.CryptoService;
import practicajrg.cryptosandbox.Service.Wallet_CryptoService;
import practicajrg.cryptosandbox.entities.Wallet_Crypto;

import java.util.List;

@RestController
@CrossOrigin("*")
public class Wallet_CryptoController {

    private final Wallet_CryptoService walletCryptoService;


    public Wallet_CryptoController(Wallet_CryptoService walletCryptoService) {
        this.walletCryptoService = walletCryptoService;
    }

    @GetMapping("/CryptosUser/{id}")
    List<Wallet_Crypto> findCryptosUser(@PathVariable Long id) {
        return walletCryptoService.findAll().stream().filter(wc -> wc.getWallet().getId().equals(id) && wc.getQuantity()>0).toList();}
}
