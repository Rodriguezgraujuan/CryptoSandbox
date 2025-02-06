package practicajrg.cryptosandbox.entities;

import jakarta.persistence.*;
import org.springframework.security.core.userdetails.User;

@Entity
public class Reporte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="descripcion")
    private String descripcion;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id", nullable = false)
    private Usuario usuario;

    public Long getId() {
        return id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
