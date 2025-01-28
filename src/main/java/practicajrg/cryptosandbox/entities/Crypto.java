package practicajrg.cryptosandbox.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;


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

    public Crypto() {}

    public Crypto(String name, double price) {
        this.name = name;
        this.value = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getValue() {
        double resultado= value;
        if (Math.round(value * 100.0) / 100.0!=0) {
            resultado = Math.round(value * 100.0) / 100.0;
        }
        return resultado;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
