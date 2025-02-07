package practicajrg.cryptosandbox.controller;

import org.springframework.web.bind.annotation.*;
import practicajrg.cryptosandbox.Service.CryptoService;
import practicajrg.cryptosandbox.Service.RegistroService;
import practicajrg.cryptosandbox.entities.Crypto;
import practicajrg.cryptosandbox.entities.Registro;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CryptoController {

    private final CryptoService cryptoService;
    private final RegistroService registroService;

    public CryptoController(CryptoService cryptoService, RegistroService registroService) {
        this.cryptoService = cryptoService;
        this.registroService = registroService;
    }

    @GetMapping("/cryptos")
    List<Crypto> all() {
        return cryptoService.findAll();
    }

    @GetMapping("/cryptos/{id}")
    Crypto one(@PathVariable Long id) {
        return cryptoService.findById(id);
    }

    @GetMapping("/crypto/{name}")
    Crypto oneName(@PathVariable String name) {
        return cryptoService.findByName(name);
    }


    @GetMapping("/registro/{symbol}")
    List<Registro> registro(@PathVariable String symbol) {
        return registroService.findBySymbol(symbol);
    }

}
