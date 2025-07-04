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

import java.util.List;
import java.util.Optional;

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

    @Override
    public UserDTO getUser(String username) {
        return userMapper.userToUserDTO(userRepository.findByUsername(username).get());
    }

    @Override
    public List<UserDTO> getUsers() {
        return userMapper.listUserEntityToUserDTO(userRepository.findAll());
    }
    @Override
    public void deleteUser(String username) {
        Optional<UserEntity> user = userRepository.findByUsername(username);
        if(user.isEmpty()){
            throw new RuntimeException("User not found with username: " + username);
        }
        userRepository.delete(user.get());

    }

    @Override
    public UserDTO updateUser(String username, UserDTO userDTO) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with Username: " + username));

        // Update fields
        user.setUsername(userDTO.getUsername());
        user.setLastName(userDTO.getLastName());
        user.setFirstName(userDTO.getFirstName());
        user.setMail(userDTO.getMail());
        user.setRole(userDTO.getRole());

        // Only encode if password changed
        if (userDTO.getPassword() != null && !userDTO.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        UserEntity updated = userRepository.save(user);
        return userMapper.userToUserDTO(updated);
    }

}
