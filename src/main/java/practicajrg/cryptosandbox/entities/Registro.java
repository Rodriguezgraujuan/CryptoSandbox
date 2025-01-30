package practicajrg.cryptosandbox.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "registro")
public class Registro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "value")
    private double value;

    @Column(name = "date")
    private LocalDate date;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "crypto_id", nullable = false)
    private Crypto crypto;

    public Registro(double value, LocalDate lastUpdated, Crypto crypto) {
        this.value = value;
        this.date = lastUpdated;
        this.crypto = crypto;
    }

    public Registro() {

    }


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
