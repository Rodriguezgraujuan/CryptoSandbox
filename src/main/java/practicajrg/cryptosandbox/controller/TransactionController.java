package practicajrg.cryptosandbox.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.HttpMediaTypeException;
import org.springframework.web.bind.annotation.*;
import practicajrg.cryptosandbox.Service.*;
import practicajrg.cryptosandbox.entities.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin("*")
public class TransactionController {
    private final CryptoService cryptoService;
    private final TransactionService transactionService;
    private final Wallet_CryptoService walletCryptoService;
    private final WalletService walletService;
    private final UserService userService;

    public TransactionController(CryptoService cryptoService, TransactionService transactionService, Wallet_CryptoService walletCryptoService, WalletService walletService, UserService userService) {
        this.cryptoService = cryptoService;
        this.transactionService = transactionService;
        this.walletCryptoService = walletCryptoService;
        this.walletService = walletService;
        this.userService = userService;
    }


    @GetMapping("/transactions")
    List<Transaction> all() {return transactionService.findAll();}

    //La id es la id del wallet
    @GetMapping("/transaction/{id}")
    List<Transaction> transaction(@PathVariable Long id) {
        return transactionService.findAll().stream().filter(t -> t.getWallet().getId().equals(id)).toList();
    }

    @PostMapping("/createTransaction")
    public ResponseEntity<String> createTransaction(@RequestBody Transaction transaction) {
        transactionCreate(transaction);
        return ResponseEntity.ok("Transaction created successfully");
    }





    private void transactionCreate(Transaction transaction) {
        double resultado = 0;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Wallet userWallet = userService.findByUsername(username).getWallet();
        transaction.setWallet(userWallet);
        Crypto crypto = cryptoService.findByName(transaction.getCrypto_name());
        Wallet wallet= transaction.getWallet();
        Wallet_Crypto walletCrypto = new Wallet_Crypto();
        for (Wallet_Crypto wC : walletCryptoService.findAll()) {
            if (wC.getWallet().equals(wallet) && wC.getCrypto().equals(crypto)) {
                walletCrypto = wC;
            }
        }
        if (transaction.getWallet().getBalance() >= transaction.getQuantity() * crypto.getValue()&& transaction.getOperation().equals("Compra")){
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

    }
}
