package practicajrg.cryptosandbox.controller;

import jakarta.mail.MessagingException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import practicajrg.cryptosandbox.Service.EmailService;

@RestController
@RequestMapping("/correo")
public class EmailController {

        private final EmailService emailService;

        public EmailController(EmailService emailService) {
            this.emailService = emailService;
        }

        @PostMapping("/enviar")
        public String enviarCorreo(@RequestParam String destinatario) {
            try {
                emailService.enviarCorreo(destinatario, "¡Bienvenido!", "Hola, gracias por registrarte.");
                return "Correo enviado con éxito a " + destinatario;
            } catch (MessagingException e) {
                return "Error al enviar el correo: " + e.getMessage();
            }
        }
}

