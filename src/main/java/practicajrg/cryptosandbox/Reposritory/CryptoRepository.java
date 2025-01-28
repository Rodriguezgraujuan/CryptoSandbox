package practicajrg.cryptosandbox.Reposritory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import practicajrg.cryptosandbox.entities.Crypto;

@Repository
public interface CryptoRepository extends JpaRepository<Crypto, Long> {
    Crypto findByName(String name);
}
