// package com.bookreview.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.authentication.ProviderManager;
// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     private final JwtAuthEntryPoint authEntryPoint;
//     private final JwtAuthenticationFilter jwtAuthenticationFilter;
//     private final UserDetailsService userDetailsService;

//     public SecurityConfig(JwtAuthEntryPoint authEntryPoint,
//                         JwtAuthenticationFilter jwtAuthenticationFilter,
//                         UserDetailsService userDetailsService) {
//         this.authEntryPoint = authEntryPoint;
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//         this.userDetailsService = userDetailsService;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         return http
//             .csrf(AbstractHttpConfigurer::disable)
//             .exceptionHandling(exception -> exception
//                 .authenticationEntryPoint(authEntryPoint)
//             )
//             .sessionManagement(session -> session
//                 .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//             )
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/api/auth/**").permitAll()
//                 .requestMatchers("/api/user/**").hasRole("USER")
//                 .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                 .requestMatchers("/api/auth/me").authenticated()
//                 .anyRequest().authenticated()
//             )
//             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
//             .build();
//     }

//     @Bean
//     public AuthenticationProvider authenticationProvider() {
//         DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//         authProvider.setUserDetailsService(userDetailsService);
//         authProvider.setPasswordEncoder(passwordEncoder());
//         return authProvider;
//     }

//     @Bean
//     public AuthenticationManager authenticationManager() {
//         return new ProviderManager(authenticationProvider());
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }
// }

//Navaneethan

package com.bookreview.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthEntryPoint authEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(JwtAuthEntryPoint authEntryPoint,
                        JwtAuthenticationFilter jwtAuthenticationFilter,
                        UserDetailsService userDetailsService) {
        this.authEntryPoint = authEntryPoint;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
    }

    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //     return http
    //         .csrf(AbstractHttpConfigurer::disable)
    //         .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Add this line
    //         .exceptionHandling(exception -> exception
    //             .authenticationEntryPoint(authEntryPoint)
    //         )
    //         .sessionManagement(session -> session
    //             .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    //         )
    //         .authorizeHttpRequests(auth -> auth
    //             .requestMatchers("/api/auth/**").permitAll()
    //             .requestMatchers("/api/user/**").hasRole("USER")
    //             .requestMatchers("/api/admin/**").hasRole("ADMIN")
    //             .requestMatchers("/api/auth/me").authenticated()
    //             .anyRequest().authenticated()
    //         )
    //         .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
    //         .build();
    // }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .exceptionHandling(exception -> exception
                .authenticationEntryPoint(authEntryPoint)
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN") // Allow ADMIN to access user endpoints
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/auth/me").authenticated()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    // Add this CORS configuration method
    // @Bean
    // CorsConfigurationSource corsConfigurationSource() {
    //     CorsConfiguration configuration = new CorsConfiguration();
    //     configuration.setAllowedOrigins(List.of("http://localhost:5173"));
    //     configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    //     configuration.setAllowedHeaders(List.of("*"));
    //     configuration.setAllowCredentials(true);
        
    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     source.registerCorsConfiguration("/api/**", configuration);
    //     return source;
    // }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply to all paths
        return source;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(authenticationProvider());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}