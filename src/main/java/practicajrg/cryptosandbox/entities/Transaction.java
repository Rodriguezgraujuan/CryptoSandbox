package practicajrg.cryptosandbox.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "Transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_transaction;

    @Column(name = "operation")
    private String operation;

    @Column(name = "crypto_name")
    private String crypto_name;

    @Column(name = "crypto_exchange")
    private String crypto_exchange;

    @Column(name = "quantity")
    private double quantity;

    @Column(name = "amount")
    private double amount;

    @Column(name = "commission")
    private double commission;

    @Column(name = "Date")
    private LocalDate date;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "wallet_id", nullable = false)
    @JsonIgnore
    private Wallet wallet;

    public Wallet getWallet() {
        return wallet;
    }

    public double getAmount() {
        return amount;
    }

    public double getCommission() {
        return commission;
    }

    public Long getId_transaction() {
        return id_transaction;
    }

    public double getQuantity() {
        return quantity;
    }

    public String getCrypto_name() {
        return crypto_name;
    }

    public String getOperation() {
        return operation;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setCommission(double commission) {
        this.commission = commission;
    }

    public void setCrypto_name(String crypto_name) {
        this.crypto_name = crypto_name;
    }

    public void setId_transaction(Long id_transaction) {
        this.id_transaction = id_transaction;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public String getCrypto_exchange() {
        return crypto_exchange;
    }

    public void setCrypto_exchange(String crypto_exchange) {
        this.crypto_exchange = crypto_exchange;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
