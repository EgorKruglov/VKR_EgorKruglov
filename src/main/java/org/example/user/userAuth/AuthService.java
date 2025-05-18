package org.example.user.userAuth;

import lombok.RequiredArgsConstructor;
import org.example.user.userAuth.authModel.UserAuthRequest;
import org.example.user.userAuth.authModel.UserAuthResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;

    public UserAuthResponse auth(UserAuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String jwtToken = jwtService.generateToken(userDetails);

        User user = (User) authentication.getPrincipal();

        return new UserAuthResponse(
                jwtToken,
                user.getUsername()  // Я пока не понимаю, норм ли, что я отправляю почту? Можно ли её вместо id использовать? Мне кажется это вообще норм абсолютно.
        );
    }
}
