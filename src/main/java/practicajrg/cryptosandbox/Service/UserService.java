package practicajrg.cryptosandbox.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import practicajrg.cryptosandbox.Reposritory.UserRepository;
import practicajrg.cryptosandbox.entities.Usuario;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Usuario saveUser(Usuario user) {
        return userRepository.save(user);
    }
    public Usuario findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    public List<Usuario> findAll() {
        return userRepository.findAll();
    }
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
