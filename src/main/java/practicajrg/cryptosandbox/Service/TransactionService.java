package practicajrg.cryptosandbox.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import practicajrg.cryptosandbox.Reposritory.*;
import practicajrg.cryptosandbox.entities.*;

import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
    public List<Transaction> findAll() {
        return transactionRepository.findAll();
    }

    public List<Transaction> findByOperation(String operation) {

        return transactionRepository.findByOperation(operation);}
}
