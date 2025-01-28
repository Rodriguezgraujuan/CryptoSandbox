package practicajrg.cryptosandbox.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Wallet_Crypto")
public class Wallet_Crypto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private double quantity;

    @ManyToOne
    @JoinColumn(name = "wallet_id", referencedColumnName = "id", nullable = false)
    private Wallet wallet;

    @ManyToOne
    @JoinColumn(name = "crypto_id", referencedColumnName = "id", nullable = false)
    private Crypto crypto;

    public Wallet getWallet() {
        return wallet;
    }

    public Long getId() {
        return id;
    }

    public double getQuantity() {
        return quantity;
    }

    public Crypto getCrypto() {
        return crypto;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }

    public void setCrypto(Crypto crypto) {
        this.crypto = crypto;
    }
}
