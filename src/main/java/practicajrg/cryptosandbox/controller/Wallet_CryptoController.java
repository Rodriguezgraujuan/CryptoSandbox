package practicajrg.cryptosandbox.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import practicajrg.cryptosandbox.Service.UserService;
import practicajrg.cryptosandbox.Service.Wallet_CryptoService;
import practicajrg.cryptosandbox.entities.Wallet_Crypto;

import java.util.List;

@RestController
@CrossOrigin("*")
public class Wallet_CryptoController {

    private final Wallet_CryptoService walletCryptoService;
    private final UserService userService;


    public Wallet_CryptoController(Wallet_CryptoService walletCryptoService, UserService userService) {
        this.walletCryptoService = walletCryptoService;
        this.userService = userService;
    }

    @GetMapping("/CryptosUser/{id}")
    List<Wallet_Crypto> findCryptosUser(@PathVariable Long id) {
        return walletCryptoService.findAll().stream().filter(wc -> wc.getWallet().getId().equals(id) && wc.getQuantity()>0).toList();}

    @GetMapping("/CryptosOwn")
    List<Wallet_Crypto> findCryptoUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username;
        if (authentication.getPrincipal() instanceof OAuth2User) {
            username=((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        }else {
            username=authentication.getName();
        }
        return walletCryptoService.findByWalletId(userService.findByUsername(username).getWallet().getId());
    }
}
