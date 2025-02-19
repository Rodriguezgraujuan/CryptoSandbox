package practicajrg.cryptosandbox.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import practicajrg.cryptosandbox.Reposritory.UserRepository;
import practicajrg.cryptosandbox.controller.UsuarioController;
import practicajrg.cryptosandbox.entities.Usuario;
import java.util.Collections;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WalletService walletService;
    @Autowired
    private CryptoService cryptoService;
    @Autowired
    private Wallet_CryptoService walletCryptoService;

    private final OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();

    private final PasswordEncoder passwordEncoder;

    public CustomOAuth2UserService(@Lazy PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest){
        OAuth2User oAuth2User = delegate.loadUser(userRequest);
        String email = oAuth2User.getAttribute("email");

        Usuario usuario = userRepository.findByEmail(email);

        Usuario user;
        if (usuario==null) {
            // Si el usuario no existe, creamos uno nuevo
            user = new Usuario();
            user.setEmail(email);
            user.setUsername(oAuth2User.getAttribute("name"));
            if (user.getUsername()==null){
                user.setUsername(oAuth2User.getAttribute("login"));
            }
            user.setPassword(passwordEncoder.encode("1"));  // O cualquier otra lógica
            user.setRol("USER");
            userRepository.save(user);

            UsuarioController.setWalletUsuarios(user, walletService, cryptoService, walletCryptoService);
        }

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                oAuth2User.getAttributes(), "email"
        );
    }
}
