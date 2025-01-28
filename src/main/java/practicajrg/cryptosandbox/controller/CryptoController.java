package practicajrg.cryptosandbox.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import practicajrg.cryptosandbox.Service.CryptoService;
import practicajrg.cryptosandbox.entities.Crypto;

import java.util.List;

@RestController
public class CryptoController {

    private final CryptoService cryptoService;

    public CryptoController(CryptoService cryptoService) {
        this.cryptoService = cryptoService;
    }

    @GetMapping("/cryptos")
    List<Crypto> all() {
        return cryptoService.findAll();
    }
}
