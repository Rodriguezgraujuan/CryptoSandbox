package practicajrg.cryptosandbox.controller;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import practicajrg.cryptosandbox.Service.*;
import practicajrg.cryptosandbox.entities.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class UsuarioController {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final WalletService walletService;
    private final CryptoService cryptoService;
    private final Wallet_CryptoService walletCryptoService;
    private final ReportesService reportesService;

    public UsuarioController(PasswordEncoder passwordEncoder, UserService userService, WalletService walletService, CryptoService cryptoService, Wallet_CryptoService walletCryptoService, ReportesService reportesService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.walletService = walletService;
        this.cryptoService = cryptoService;
        this.walletCryptoService = walletCryptoService;
        this.reportesService = reportesService;
    }

    @GetMapping("/users")
    List<Usuario> all() {
        return userService.findAll();
    }

    @GetMapping("/user")
    List<String> info() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> userInfo;
        if (authentication.getPrincipal() instanceof OAuth2User) {
            userInfo = new ArrayList<>(Arrays.asList(((OAuth2User) authentication.getPrincipal()).getAttribute("name"), ((OAuth2User) authentication.getPrincipal()).getAttribute("email")));
        }else {
            userInfo = new ArrayList<>(Arrays.asList(userService.findByUsername(authentication.getName()).getUsername(), userService.findByUsername(authentication.getName()).getEmail()));
        }
        return userInfo;
    }

    @PostMapping("/register")
    @Transactional
    ResponseEntity<?> create(@RequestBody Usuario user) {
        if (user.getUsername() == null || user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Faltan datos requeridos");
        } else if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("El correo ya esta registrado");
        }else{
            try {
                user.setRol("USER");
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userService.saveUser(user);

                Wallet wallet = new Wallet();
                wallet.setUser(user);
                wallet.setBalance(100000);
                walletService.saveWallet(wallet);

                for (Crypto crypto : cryptoService.findAll()) {
                    Wallet_Crypto wallet_crypto = new Wallet_Crypto();
                    wallet_crypto.setWallet(wallet);
                    wallet_crypto.setCrypto(crypto);
                    wallet_crypto.setQuantity(0);
                    walletCryptoService.saveWallet_Crypto(wallet_crypto);
                }

                return ResponseEntity.status(HttpStatus.CREATED).body("Usuario creado con éxito");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el usuario");
            }
        }
    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        Usuario usuario = userService.findByEmail(email);
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado");
        }

        boolean isPasswordValid = userService.validatePassword(password, usuario.getPassword());
        if (!isPasswordValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
        }

        return ResponseEntity.status(HttpStatus.OK).body("Login exitoso");
    }

    @PostMapping("/editProfile")
    public void editProfile(@RequestBody Usuario usuario) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario loggedUser = userService.findByUsername(authentication.getName());
        loggedUser.setUsername(usuario.getUsername());
        loggedUser.setEmail(usuario.getEmail());
        loggedUser.setPassword(passwordEncoder.encode(usuario.getPassword()));
        userService.saveUser(loggedUser);
    }


    @GetMapping("/delete")
    public ResponseEntity<String> deleteUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userService.deleteById(userService.findByUsername(authentication.getName()).getId());
        return ResponseEntity.ok("Usuario eliminado correctamente");
    }

    @GetMapping("/reportes")
    List<Reporte> reportes(){
        List<Reporte> rep = reportesService.findAll();
        if (rep==null){
            rep=new ArrayList<>();
        }
        return reportesService.findAll();
    }
}
