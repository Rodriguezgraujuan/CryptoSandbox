package practicajrg.cryptosandbox.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import practicajrg.cryptosandbox.Reposritory.UserRepository;
import practicajrg.cryptosandbox.entities.Usuario;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository usuarioRepository;
    static int contador=0;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            throw new BadCredentialsException("Credenciales incorrectas");
        }else{
            contador++;
        }
        if (contador>=2){
            contador=0;
            throw new BadCredentialsException("Credenciales incorrectas");
        }
            return User.withUsername(usuario.getEmail())
                    .password(usuario.getPassword())
                    .roles(usuario.getRol())
                    .build();
        } catch (Exception e) {
            throw new BadCredentialsException("Credenciales incorrectas");
        }
    }

}
