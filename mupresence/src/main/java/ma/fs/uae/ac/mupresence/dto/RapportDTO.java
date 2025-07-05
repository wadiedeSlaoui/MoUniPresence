package ma.fs.uae.ac.mupresence.dto;

import lombok.Data;

import java.util.Date;

@Data
public class RapportDTO {
    private String surveillant;
    private String filiere;
    private String module;
    private String leCas;
    private String studentFullName;
    private String nuApogee;
    private String description;
    private Date dateGeneration;
}
