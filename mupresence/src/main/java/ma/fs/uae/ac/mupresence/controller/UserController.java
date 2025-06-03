package ma.fs.uae.ac.mupresence.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @GetMapping("/test")
    public String test(){
        return "test";
    }
    @GetMapping("/testWithoutCred")
    public String testWithoutCred(){
        return "testWithoutCred";
    }

}
