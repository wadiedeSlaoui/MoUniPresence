package ma.fs.uae.ac.mupresence.dto;

import lombok.Data;

@Data
public class UserDTO {

    private String matricule;
    private String fullName;
    private String password;
    private String mail;
    private Long codeValidation;
    private String role;


}
