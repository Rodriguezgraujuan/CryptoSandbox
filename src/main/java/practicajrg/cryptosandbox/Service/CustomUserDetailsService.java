package practicajrg.cryptosandbox.Service;

import org.springframework.beans.factory.annotation.Autowired;
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


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
        UserDetails user = User.withUsername(usuario.getUsername())
                .password(usuario.getPassword())
                .roles(usuario.getRol())
                .build();
        return user;
    }
}
