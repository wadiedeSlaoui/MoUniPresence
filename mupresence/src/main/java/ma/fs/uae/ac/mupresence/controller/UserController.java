package ma.fs.uae.ac.mupresence.controller;

import ma.fs.uae.ac.mupresence.dto.UserDTO;
import ma.fs.uae.ac.mupresence.model.UserEntity;
import ma.fs.uae.ac.mupresence.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("")
    public List<UserDTO> getAllUsers() {
        return userService.getUsers();
    }

}
