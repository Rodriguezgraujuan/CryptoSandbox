package practicajrg.cryptosandbox.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import practicajrg.cryptosandbox.Service.ReportesService;
import practicajrg.cryptosandbox.Service.UserService;
import practicajrg.cryptosandbox.entities.Reporte;
import practicajrg.cryptosandbox.entities.Usuario;

@Controller
public class ReportesController {
    private final ReportesService reportesService;
    private final UserService userService;

    public ReportesController(ReportesService reportesService, UserService userService){
        this.reportesService = reportesService;
        this.userService = userService;
    }
    @PostMapping("/addReport")
    public ResponseEntity<?> addReport(@RequestBody Reporte reporte){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Usuario usuario = userService.findByUsername(authentication.getName());
        reporte.setUsuario(usuario);
        reportesService.saveReporte(reporte);
        return ResponseEntity.ok("Reporte enviado correctamente");
    }
}
