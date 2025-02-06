package practicajrg.cryptosandbox.controller;

import jakarta.transaction.Transactional;
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
    @GetMapping("/transactionUser")
    List<Transaction> transaction() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Wallet wallet = userService.findByUsername(username).getWallet();
        return wallet.getTransactions().stream().toList();
    }

    @PostMapping("/createTransaction")
    @Transactional
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
        if (transaction.getOperation().equals("Compra")&& transaction.getWallet().getBalance() <= transaction.getQuantity() * crypto.getValue()) {
            throw new IllegalArgumentException("Saldo insuficiente para realizar la compra");
        }
            if(!transaction.getOperation().equals("Intercambio")){

                if(transaction.getOperation().equals("Compra")){
                    transaction.setQuantity(transaction.getAmount() / crypto.getValue());
                    resultado += transaction.getWallet().getBalance()-transaction.getQuantity() * cryptoService.findByName(transaction.getCrypto_name()).getValue();
                    walletCrypto.setQuantity(Math.round((walletCrypto.getQuantity()+transaction.getQuantity())*100.0)/100.0);
                        walletCryptoService.saveWallet_Crypto(walletCrypto);
                } else {
                    transaction.setAmount(transaction.getQuantity() * crypto.getValue());
                    resultado += transaction.getWallet().getBalance()+transaction.getQuantity() * cryptoService.findByName(transaction.getCrypto_name()).getValue();
                    if (transaction.getQuantity()<walletCrypto.getQuantity()){
                        walletCrypto.setQuantity(Math.round((walletCrypto.getQuantity()-transaction.getQuantity())*100.0)/100.0);
                    }else{
                        throw new IllegalArgumentException("Cantidad insuficiente de criptomonedas para la venta");
                    }
                    walletCryptoService.saveWallet_Crypto(walletCrypto);
                }
                transaction.setAmount(transaction.getQuantity() * cryptoService.findByName(transaction.getCrypto_name()).getValue());
                transaction.getWallet().setBalance(resultado);

            } else {

                Crypto cryptoExchange = cryptoService.findByName(transaction.getCrypto_exchange());
                if ((transaction.getQuantity()<=walletCrypto.getQuantity())&&transaction.getQuantity()>=0.001){
                    double quantityExchange = crypto.getValue()*transaction.getQuantity()/cryptoExchange.getValue();
                    for (Wallet_Crypto wC: walletCryptoService.findAll()){
                        if (wC.getWallet().equals(wallet) && wC.getCrypto().equals(cryptoExchange)) {
                            wC.setQuantity(wC.getQuantity()+quantityExchange);
                            walletCrypto.setQuantity(walletCrypto.getQuantity()-transaction.getQuantity());
                            if (walletCrypto.getQuantity()<=0.001){
                                walletCrypto.setQuantity(0.0);
                            }
                            walletCryptoService.saveWallet_Crypto(walletCrypto);
                            walletCryptoService.saveWallet_Crypto(wC);
                            transaction.setAmount(Math.round(quantityExchange*100.0)/100.0);
                        }
                    }
                }else {
                    throw new IllegalArgumentException("Cantidad invalida");
                }
        }
        transaction.setCommission(0);
        transactionService.saveTransaction(transaction);
    }
}
