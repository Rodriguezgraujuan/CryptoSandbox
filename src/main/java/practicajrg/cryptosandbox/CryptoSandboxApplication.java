package practicajrg.cryptosandbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CryptoSandboxApplication {

    public static void main(String[] args) {
        SpringApplication.run(CryptoSandboxApplication.class, args);
    }

}
