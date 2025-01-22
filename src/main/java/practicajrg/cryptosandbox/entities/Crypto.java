package practicajrg.cryptosandbox.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Crypto")
public class Crypto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "value")
    private double value;

}
