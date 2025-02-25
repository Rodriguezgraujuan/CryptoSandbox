package practicajrg.cryptosandbox.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class redirectController {
    @GetMapping("/")
    public String redirectToHome() {
        return "redirect:/invitado.html";
    }
    @GetMapping("")
    public String redirectToHome2() {
        return "redirect:/invitado.html";
    }
}
