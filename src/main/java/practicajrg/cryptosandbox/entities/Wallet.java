package practicajrg.cryptosandbox.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import practicajrg.cryptosandbox.entities.Transaction;
import practicajrg.cryptosandbox.entities.Usuario;
import practicajrg.cryptosandbox.entities.Wallet_Crypto;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Wallet")
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "balance", nullable = false)
    private double balance;

    @OneToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    @JsonIgnore
    private Usuario user;

    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Transaction> transactions;

    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Wallet_Crypto> walletCryptos = new HashSet<>();

    public void setUser(Usuario user) {
        this.user = user;
    }

    public Usuario getUser() {
        return user;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }

    public Set<Wallet_Crypto> getWalletCryptos() {
        return walletCryptos;
    }

    public void setWalletCryptos(Set<Wallet_Crypto> walletCryptos) {
        this.walletCryptos = walletCryptos;
    }
}
