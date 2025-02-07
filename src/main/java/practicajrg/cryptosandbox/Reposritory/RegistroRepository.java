package practicajrg.cryptosandbox.Reposritory;

import org.springframework.data.jpa.repository.JpaRepository;
import practicajrg.cryptosandbox.entities.Crypto;
import practicajrg.cryptosandbox.entities.Registro;

import java.util.List;

public interface RegistroRepository extends JpaRepository<Registro, Long> {
    List<Registro> findByCryptoSymbol(String symbol);
}
