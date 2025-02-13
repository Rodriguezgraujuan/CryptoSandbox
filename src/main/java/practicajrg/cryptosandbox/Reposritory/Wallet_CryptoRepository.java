package practicajrg.cryptosandbox.Reposritory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import practicajrg.cryptosandbox.entities.Wallet_Crypto;

import java.util.List;

@Repository
public interface Wallet_CryptoRepository extends JpaRepository<Wallet_Crypto, Long> {
    List<Wallet_Crypto> findByWalletId(Long id);
}
