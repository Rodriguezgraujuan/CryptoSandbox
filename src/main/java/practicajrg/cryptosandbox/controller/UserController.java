package practicajrg.cryptosandbox.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import practicajrg.cryptosandbox.Service.UserService;
import practicajrg.cryptosandbox.Service.WalletService;
import practicajrg.cryptosandbox.entities.Usuario;
import practicajrg.cryptosandbox.entities.Wallet;

@Controller
public class UserController {

    private final UserService userService;
    private final WalletService walletService;

    public UserController(UserService userService, WalletService walletService) {
        this.userService = userService;
        this.walletService = walletService;
    }

    @GetMapping("/")
    public String getAllUsers(Model model) {
        model.addAttribute("users", userService.findAll());
        return "index";
    }

    @GetMapping("/create")
    public String createUser(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "create";
    }

    @PostMapping("/createUser")
    public String createUser(Usuario user) {
        userService.saveUser(user);
        Wallet wallet = new Wallet();
        wallet.setUser(user);
        wallet.setBalance(1000);
        walletService.saveWallet(wallet);
        return "redirect:/";
    }

    @GetMapping("delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (id != null) {
            userService.deleteById(id);
        }
        return "redirect:/";
    }
}
