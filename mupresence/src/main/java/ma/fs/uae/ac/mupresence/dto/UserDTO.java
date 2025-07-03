package ma.fs.uae.ac.mupresence.dto;

import lombok.Data;

@Data
public class UserDTO {

    private String username;
    private String firstName;
    private String lastName;
    private String password;
    private String mail;
    private Long codeValidation;
    private String role;


}
