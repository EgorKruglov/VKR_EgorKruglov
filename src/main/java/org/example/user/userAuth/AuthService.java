package org.example.user.userAuth;

import lombok.RequiredArgsConstructor;
import org.example.user.userAuth.authModel.UserAuthRequest;
import org.example.user.userAuth.authModel.UserAuthResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String jwtToken = jwtService.generateToken(userPrincipal);

        return new UserAuthResponse(
                jwtToken,
                userPrincipal.getAuthorities().toString()
        );
    }
}
