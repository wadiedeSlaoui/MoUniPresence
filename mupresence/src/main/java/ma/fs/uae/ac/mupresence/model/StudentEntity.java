package ma.fs.uae.ac.mupresence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Students")
@Data
public class StudentEntity  {
    @Id
    @GeneratedValue
    private int idEtu;
    private String apogee;
    private String cne;
    private int idfiliere;
    private String niveau;

}