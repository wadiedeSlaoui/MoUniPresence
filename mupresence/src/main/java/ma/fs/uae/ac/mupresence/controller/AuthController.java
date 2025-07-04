package ma.fs.uae.ac.mupresence.controller;


import ma.fs.uae.ac.mupresence.dto.AuthRequest;
import ma.fs.uae.ac.mupresence.dto.UserDTO;
import ma.fs.uae.ac.mupresence.services.UserService;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserService userService;

    public AuthController (UserService userService){
        this.userService = userService;
    }


    @PostMapping("/login")
    public String login (@RequestBody AuthRequest authRequest){
        return userService.createAuthenticationToken(authRequest);
    }

    @PostMapping("/register")
    public void register ( @RequestBody UserDTO user){
         userService.registerUser(user);
    }

    @GetMapping("/user/{username}")
    public UserDTO getUser ( @PathVariable String username){
        return userService.getUser(username);
    }


}
