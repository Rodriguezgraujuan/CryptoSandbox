package practicajrg.cryptosandbox.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import practicajrg.cryptosandbox.Reposritory.ReportesRepository;
import practicajrg.cryptosandbox.entities.Crypto;
import practicajrg.cryptosandbox.entities.Reporte;

import java.util.List;

@Service
public class ReportesService {
    @Autowired
    private final ReportesRepository reportesRepository;

    public ReportesService(ReportesRepository reportesRepository) {
        this.reportesRepository = reportesRepository;
    }

    public Reporte saveReporte(Reporte reporte) {
        return reportesRepository.save(reporte);
    }
    public Reporte findById(Long id) {
        return reportesRepository.findById(id).orElse(null);
    }
    public List<Reporte> findAll() {
        return reportesRepository.findAll();
    }
    public void deleteById(Long id) {
        reportesRepository.deleteById(id);
    }
}
