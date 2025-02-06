package practicajrg.cryptosandbox.Reposritory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import practicajrg.cryptosandbox.entities.Registro;
import practicajrg.cryptosandbox.entities.Reporte;

@Repository
public interface ReportesRepository extends JpaRepository<Reporte, Long> {
}
