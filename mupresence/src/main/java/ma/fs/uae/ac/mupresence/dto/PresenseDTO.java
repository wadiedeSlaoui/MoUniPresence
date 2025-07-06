package ma.fs.uae.ac.mupresence.dto;

import lombok.Data;

@Data
public class PresenseDTO {

    private String filiere;
    private String survaillant;
    private String module;
    private String room;
    private boolean submitted;
}
