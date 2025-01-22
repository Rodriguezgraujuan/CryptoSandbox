package practicajrg.cryptosandbox.entities;

import jakarta.persistence.*;

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

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "amount")
    private double amount;

    @Column(name = "commission")
    private double commission;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "wallet_id", nullable = false)
    private Wallet wallet;
}
