package practicajrg.cryptosandbox.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import practicajrg.cryptosandbox.Service.*;

@Controller
public class dbController {


    private final CryptoService cryptoService;

    public dbController(CryptoService cryptoService) {
        this.cryptoService = cryptoService;
    }

    @GetMapping("/actualizarBD")
    public String actualizarBD() {
        cryptoService.updateBD();
        return "redirect:/";
    }

}
