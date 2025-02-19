package practicajrg.cryptosandbox.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import practicajrg.cryptosandbox.Service.UserService;
import practicajrg.cryptosandbox.Service.WalletService;
import practicajrg.cryptosandbox.entities.Wallet;
import practicajrg.cryptosandbox.entities.Wallet_Crypto;

import java.util.List;

@RestController
@CrossOrigin("*")
public class WalletController {
    private final WalletService walletService;
    private final UserService userService;

    public WalletController(WalletService walletService, UserService userService) {
        this.walletService = walletService;
        this.userService = userService;
    }

    @GetMapping("/wallets")
    List<Wallet> all() {
        return walletService.findAll();
    }

    @GetMapping("/walletUser")
    List<Wallet_Crypto> wallet() {
        Wallet wallet=TransactionController.userGetOauthWallet(userService);
        return wallet.getWalletCryptos().stream().filter(p->p.getQuantity()>0.0).toList();
    }

    @GetMapping("/getWallet")
    double getWallet() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username;
        if (authentication.getPrincipal() instanceof OAuth2User) {
            username=((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        }else {
             username=authentication.getName();
        }
        return userService.findByUsername(username).getWallet().getBalance();
    }

    @PostMapping("/addcash")
    public void addCash(@RequestBody Wallet wallet) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username;
        if (authentication.getPrincipal() instanceof OAuth2User) {
            username=((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        }else {
            username=authentication.getName();
        }
        double balance = wallet.getBalance();
        Wallet userWallet = userService.findByUsername(username).getWallet();
        userWallet.setBalance(userWallet.getBalance() + balance);
        walletService.saveWallet(userWallet);
    }
}
