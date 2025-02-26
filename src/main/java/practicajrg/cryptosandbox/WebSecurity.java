package practicajrg.cryptosandbox;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import practicajrg.cryptosandbox.Reposritory.UserRepository;
import practicajrg.cryptosandbox.Service.*;
import practicajrg.cryptosandbox.controller.UsuarioController;
import practicajrg.cryptosandbox.entities.Crypto;
import practicajrg.cryptosandbox.entities.Usuario;
import practicajrg.cryptosandbox.entities.Wallet;
import practicajrg.cryptosandbox.entities.Wallet_Crypto;

import java.util.Map;

@Configuration
public class WebSecurity {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WalletService walletService;
    @Autowired
    private CryptoService cryptoService;
    @Autowired
    private Wallet_CryptoService wallet_CryptoService;

    @Bean //Update
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(auth -> auth
                        .requestMatchers("/correo/**","/Css/**","/images/**", "/Js/**", "/char/**", "/images/**", "/login", "/register", "/register.html", "invitado.html", "/cryptos", "/registro/{symbol}", "/aboutUs.html").permitAll()
                        .requestMatchers("/administrador.html", "/").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .formLogin(login -> login
                        .loginPage("/login") // Define la URL de tu propio formulario de login
                        .loginProcessingUrl("/login") // URL que manejará la autenticación
                        .usernameParameter("email") // Nombre del parámetro del formulario
                        .passwordParameter("password")
                        .successHandler(customSuccessHandler())
                        .failureHandler(customFailureHandler())
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            request.getSession().invalidate(); // Invalidar la sesión manualmente
                            response.sendRedirect("/login?logout");
                        })
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/login") // Página personalizada de login para OAuth2
                        .defaultSuccessUrl("/home.html", true) // Redirigir a /dashboard después de un login exitoso
                        .failureUrl("/login?error")
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService)
                        )
                        .successHandler(oauth2SuccessHandler())
                );
        return http.build();
    }

    private AuthenticationSuccessHandler oauth2SuccessHandler() {
        return (request, response, authentication) -> {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            Map<String, Object> attributes = oAuth2User.getAttributes();
            String email = (String) attributes.get("email");
            String name = (String) attributes.get("name");

            Usuario usuario = userRepository.findByEmail(email);

            if (usuario == null) {
                usuario = new Usuario();
                usuario.setEmail(email);
                usuario.setUsername(name);
                usuario.setPassword(passwordEncoder().encode("1"));
                if (usuario.getEmail().equals("juan@gmail.com")) {
                    usuario.setRol("ADMIN");
                }else {
                    usuario.setRol("USER");
                }
                userRepository.save(usuario);
                UsuarioController.setWalletUsuarios(usuario, walletService, cryptoService, wallet_CryptoService);
            }
            response.sendRedirect("/home.html");
        };
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);

        authenticationManagerBuilder
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder);

        return authenticationManagerBuilder.build();
    }


    //Metodo de autenticacion
    @Bean
    public UserDetailsService userDetailsService() {
        return customUserDetailsService;
    }


    //Codificación
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE0", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }

    @Bean
    public AuthenticationSuccessHandler customSuccessHandler() {
        return (request, response, authentication) -> {
            CustomUserDetailsService.resetContador();

            String redirectUrl = "/home.html";
            if (AuthorityUtils.authorityListToSet(authentication.getAuthorities()).contains("ROLE_ADMIN")) {
                redirectUrl = "/administrador.html";
            }
            response.sendRedirect(redirectUrl);
        };
    }

    @Bean
    public AuthenticationFailureHandler customFailureHandler() {
        return (request, response, exception) -> {
            String errorMessage = "Error de autenticación.";
            if (exception instanceof UsernameNotFoundException) {
                errorMessage = "Usuario no encontrado.";
            } else if (exception instanceof BadCredentialsException) {
                errorMessage = "Credenciales incorrectas.";
            }

            request.getSession().setAttribute("loginError", errorMessage);
            response.sendRedirect("/login?error=true");
        };
    }


}
