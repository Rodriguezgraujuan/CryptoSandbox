package practicajrg.cryptosandbox.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import practicajrg.cryptosandbox.Service.*;
import practicajrg.cryptosandbox.entities.*;

import java.util.List;

@Controller
public class pruebasController {
    /*

    private final UserService userService;
    private final WalletService walletService;
    private final TransactionService transactionService;
    private final CryptoService cryptoService;
    private final Wallet_CryptoService walletCryptoService;

    public pruebasController(UserService userService, WalletService walletService, TransactionService transactionService, CryptoService cryptoService, Wallet_CryptoService walletCryptoService) {
        this.userService = userService;
        this.walletService = walletService;
        this.transactionService = transactionService;
        this.cryptoService = cryptoService;
        this.walletCryptoService = walletCryptoService;
    }

    @GetMapping("/")
    public String getAllUsers(Model model) {
        model.addAttribute("wallet_cryptos", walletCryptoService.findAll());
        model.addAttribute("users", userService.findAll());
        model.addAttribute("cryptos", cryptoService.findAll());
        return "index";
    }

    @GetMapping("/cryptos")
    List<Crypto> all() {
        return cryptoService.findAll();
    }


    @GetMapping("/transactions")
    public String getTransactions(Model model) {
        model.addAttribute("transactions",transactionService.findAll() );
        return "transaciones";
    }

    @GetMapping("/register")
    public String createUser(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "auth/register";
    }


    @PostMapping("/register")
    public String createUser(Usuario user) {
        user.setRol("USER");
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
        };
        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (id != null) {
            userService.deleteById(id);
        }
        return "redirect:/";
    }

    @GetMapping("/transactionCreate/{id}")
    public String transaction(Model model, @PathVariable Long id) {
        Transaction transaction = new Transaction();
        transaction.setWallet(walletService.findById(id));
        model.addAttribute("cryptos", cryptoService.findAll());
        model.addAttribute("transaction", transaction);
        return "transactionCreate";
    }

    @PostMapping("/createTransaction")
    public String createTransaction(Transaction transaction) {
        wallet_crypto(transaction);
        return "redirect:/";
    }

    @GetMapping("/actualizarBD")
    public String actualizarBD() {
        cryptoService.updateBD();
        return "redirect:/";
    }



    private void wallet_crypto(Transaction transaction) {
        double resultado = 0;

        Crypto crypto = cryptoService.findByName(transaction.getCrypto_name());
        Wallet wallet= transaction.getWallet();
        Wallet_Crypto walletCrypto = new Wallet_Crypto();
        for (Wallet_Crypto wC : walletCryptoService.findAll()) {
            if (wC.getWallet().equals(wallet) && wC.getCrypto().equals(crypto)) {
                walletCrypto = wC;
            }
        }
        if(!transaction.getOperation().equals("Intercambio")){

            if(transaction.getOperation().equals("Compra")){
                resultado += transaction.getWallet().getBalance()-transaction.getQuantity() * cryptoService.findByName(transaction.getCrypto_name()).getValue();
                walletCrypto.setQuantity(walletCrypto.getQuantity() + transaction.getQuantity());
                walletCryptoService.saveWallet_Crypto(walletCrypto);
            } else {
                resultado += transaction.getWallet().getBalance()+transaction.getQuantity() * cryptoService.findByName(transaction.getCrypto_name()).getValue();
                walletCrypto.setQuantity(walletCrypto.getQuantity()-transaction.getQuantity());
                walletCryptoService.saveWallet_Crypto(walletCrypto);
            }
            walletCryptoService.saveWallet_Crypto(walletCrypto);
            transaction.getWallet().setBalance(resultado);

        } else {
            Crypto cryptoExchange = cryptoService.findByName(transaction.getCrypto_exchange());
            if ((transaction.getQuantity()<walletCrypto.getQuantity())){
                double quantityExchange = crypto.getValue()*transaction.getQuantity()/cryptoExchange.getValue();
                for (Wallet_Crypto wC: walletCryptoService.findAll()){
                    if (wC.getWallet().equals(wallet) && wC.getCrypto().equals(cryptoExchange)) {
                        wC.setQuantity(wC.getQuantity()+quantityExchange);
                        walletCryptoService.saveWallet_Crypto(wC);
                        walletCrypto.setQuantity(walletCrypto.getQuantity()-transaction.getQuantity());
                    }
                }
            }
        }

        transaction.setCommission(0);
        transaction.setAmount(transaction.getQuantity() * cryptoService.findByName(transaction.getCrypto_name()).getValue());
        transactionService.saveTransaction(transaction);


    }

     */

}
