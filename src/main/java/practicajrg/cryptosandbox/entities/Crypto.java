package practicajrg.cryptosandbox.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "Crypto")
public class Crypto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "symbol")
    private String symbol;

    @Column(name = "value")
    private double value;

    @Column(name = "last_updated")
    private LocalDate last_updated;

    @Column(name = "high_24h")
    private double high_24h;

    @Column(name = "low_24h")
    private double low_24h;

    @Column(name = "market_cap")
    private double market_cap;

    @Column(name = "market_cap_rank")
    private int market_cap_rank;

    @Column(name = "price_change_percentage_24h")
    private double price_change_percentage_24h;

    @Column(name = "price_change_24h")
    private double price_change_24h;

    @OneToMany(mappedBy = "crypto", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Registro> cryptosRegister;

    public Crypto() {}

    public Crypto(String name, double price, String symbol, LocalDate lastUpdated, Double high24h, Double low24h, Double marketCap, Integer marketCapRank, Double priceChangePercentage24h, Double priceChange24h) {

        this.name = name;
        this.value = price;
        this.symbol = symbol;
        this.last_updated = lastUpdated;
        this.high_24h = high24h;
        this.low_24h = low24h;
        this.market_cap=marketCap;
        this.market_cap_rank=marketCapRank;
        this.price_change_24h=priceChange24h;
        this.price_change_percentage_24h=priceChangePercentage24h;}


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

    public Set<Registro> getCryptosRegister() {
        return cryptosRegister;
    }

    public void setCryptosRegister(Set<Registro> cryptosRegister) {
        this.cryptosRegister = cryptosRegister;
    }

    public void setHigh_24h(double high_24h) {
        this.high_24h = high_24h;
    }

    public void setLast_updated(LocalDate last_updated) {
        this.last_updated = last_updated;
    }

    public void setLow_24h(double low_24h) {
        this.low_24h = low_24h;
    }

    public void setMarket_cap(double market_cap) {
        this.market_cap = market_cap;
    }

    public void setMarket_cap_rank(int market_cap_rank) {
        this.market_cap_rank = market_cap_rank;
    }

    public void setPrice_change_24h(double price_change_24h) {
        this.price_change_24h = price_change_24h;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public void setPrice_change_percentage_24h(double price_change_percentage_24h) {
        this.price_change_percentage_24h = price_change_percentage_24h;
    }

    public double getHigh_24h() {
        return high_24h;
    }

    public double getLow_24h() {
        return low_24h;
    }

    public double getMarket_cap() {
        return market_cap;
    }

    public double getPrice_change_24h() {
        return price_change_24h;
    }

    public double getPrice_change_percentage_24h() {
        return price_change_percentage_24h;
    }

    public int getMarket_cap_rank() {
        return market_cap_rank;
    }

    public String getSymbol() {
        return symbol;
    }

    public LocalDate getLast_updated() {
        return last_updated;
    }
}
