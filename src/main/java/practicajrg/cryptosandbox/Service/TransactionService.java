package practicajrg.cryptosandbox.Service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import practicajrg.cryptosandbox.Reposritory.*;
import practicajrg.cryptosandbox.entities.*;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
    public Transaction findById(Long id) {
        return transactionRepository.findById(id).orElse(null);
    }

    public List<Transaction> findAll() {
        return transactionRepository.findAll();
    }
    public void deleteById(Long id) {
        transactionRepository.deleteById(id);
    }


    public List<Transaction> findByWalletId(Long walletId) {
        return transactionRepository.findByWalletId(walletId);
    }

    public List<Transaction> findByOperation(String operation) {

        return transactionRepository.findByOperation(operation);}
}
