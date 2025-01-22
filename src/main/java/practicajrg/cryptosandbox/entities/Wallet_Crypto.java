package practicajrg.cryptosandbox.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Wallet_Crypto")
public class Wallet_Crypto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "wallet_id", referencedColumnName = "id", nullable = false)
    private Wallet wallet;

    @ManyToOne
    @JoinColumn(name = "crypto_id", referencedColumnName = "id", nullable = false)
    private Crypto crypto;

}
