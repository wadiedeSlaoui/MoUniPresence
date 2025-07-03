package ma.fs.uae.ac.mupresence.services;


import ma.fs.uae.ac.mupresence.dto.AuthRequest;
import ma.fs.uae.ac.mupresence.dto.UserDTO;

import java.util.List;

public interface UserService {

    void registerUser(UserDTO userDTO);
    String createAuthenticationToken (AuthRequest authRequest);

    UserDTO getUser(String username);

    List<UserDTO> getUsers();
}
