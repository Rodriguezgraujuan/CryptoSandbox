package practicajrg.cryptosandbox.controller;

import org.springframework.web.bind.annotation.*;
import practicajrg.cryptosandbox.Service.CryptoService;
import practicajrg.cryptosandbox.entities.Crypto;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CryptoController {

    private final CryptoService cryptoService;

    public CryptoController(CryptoService cryptoService) {
        this.cryptoService = cryptoService;
    }

    @GetMapping("/cryptos")
    List<Crypto> all() {
        return cryptoService.findAll();
    }

    @GetMapping("/cryptos/{id}")
    Crypto one(@PathVariable Long id) {
        return cryptoService.findById(id);
    }

}
