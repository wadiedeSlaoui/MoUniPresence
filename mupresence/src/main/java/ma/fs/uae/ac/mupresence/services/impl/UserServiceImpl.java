package ma.fs.uae.ac.mupresence.services.impl;


import ma.fs.uae.ac.mupresence.config.JwtUtil;
import ma.fs.uae.ac.mupresence.dto.AuthRequest;
import ma.fs.uae.ac.mupresence.dto.UserDTO;
import ma.fs.uae.ac.mupresence.mapper.UserMapper;
import ma.fs.uae.ac.mupresence.model.UserEntity;
import ma.fs.uae.ac.mupresence.repository.UserRepository;
import ma.fs.uae.ac.mupresence.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    private final UserDetailsService userDetailsService;
    @Autowired
    public UserServiceImpl(UserRepository userRepository,UserMapper userMapper
            ,PasswordEncoder passwordEncoder,AuthenticationManager authenticationManager,
                           JwtUtil jwtUtil,UserDetailsService userDetailsService){
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void registerUser(UserDTO userDTO) {
        UserEntity user = userMapper.userDTOToUser(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public String createAuthenticationToken(AuthRequest authRequest) {
       authenticationManager.authenticate(
               new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
       );
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());

        return jwtUtil.generateToken(userDetails);
    }


}
