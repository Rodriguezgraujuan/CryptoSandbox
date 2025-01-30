package practicajrg.cryptosandbox.controller;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import practicajrg.cryptosandbox.Service.CryptoService;
import practicajrg.cryptosandbox.Service.UserService;
import practicajrg.cryptosandbox.Service.WalletService;
import practicajrg.cryptosandbox.Service.Wallet_CryptoService;
import practicajrg.cryptosandbox.entities.Crypto;
import practicajrg.cryptosandbox.entities.Usuario;
import practicajrg.cryptosandbox.entities.Wallet;
import practicajrg.cryptosandbox.entities.Wallet_Crypto;

import java.util.List;

@RestController
@CrossOrigin("http://127.0.0.1:5500")
public class UsuarioController {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final WalletService walletService;
    private final CryptoService cryptoService;
    private final Wallet_CryptoService walletCryptoService;

    public UsuarioController(PasswordEncoder passwordEncoder, UserService userService, WalletService walletService, CryptoService cryptoService, Wallet_CryptoService walletCryptoService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.walletService = walletService;
        this.cryptoService = cryptoService;
        this.walletCryptoService = walletCryptoService;
    }

    @GetMapping("/users")
    List<Usuario> all() {
        return userService.findAll();
    }

    @GetMapping("/user/{id}")
    Usuario info(@PathVariable Long id) {
        return userService.findById(id);
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
}
