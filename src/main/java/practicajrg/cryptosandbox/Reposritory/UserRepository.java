package practicajrg.cryptosandbox.Reposritory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import practicajrg.cryptosandbox.entities.Usuario;

@Repository
public interface UserRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
    Usuario findByUsername(String username);

}
