package practicajrg.cryptosandbox.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.CannotAcquireLockException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ErrorAdviserController {

    @ExceptionHandler({CannotAcquireLockException.class})
    public String handleDeadlockException() {
        SecurityContextHolder.clearContext();
        return "redirect:/register";
    }
}
