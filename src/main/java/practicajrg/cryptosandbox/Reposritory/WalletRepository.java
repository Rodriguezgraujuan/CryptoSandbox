package practicajrg.cryptosandbox.Reposritory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import practicajrg.cryptosandbox.entities.Wallet;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
}
