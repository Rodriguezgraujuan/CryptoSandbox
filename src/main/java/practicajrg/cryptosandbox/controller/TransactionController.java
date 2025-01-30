package practicajrg.cryptosandbox.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import practicajrg.cryptosandbox.Service.CryptoService;
import practicajrg.cryptosandbox.Service.TransactionService;
import practicajrg.cryptosandbox.entities.Transaction;

import java.util.List;

@RestController
@CrossOrigin("*")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }


    @GetMapping("/transactions")
    List<Transaction> all() {return transactionService.findAll();}

    //La id es la id del wallet
    @GetMapping("/transaction/{id}")
    List<Transaction> transaction(@PathVariable Long id) {
        return transactionService.findAll().stream().filter(t -> t.getWallet().getId().equals(id)).toList();
    }


}
