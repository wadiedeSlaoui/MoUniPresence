package ma.fs.uae.ac.mupresence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Date;


@Entity
@Table(name = "Rapport")
@Data
public class RaportEntity {
    @Id
    @GeneratedValue
    private int idRapport;
    private String surveillant;
    private String filiere;
    private String module;
    private String leCas;
    private String studentFullName;
    private String nuApogee;
    private String description;
    private Date dateGeneration;

}
