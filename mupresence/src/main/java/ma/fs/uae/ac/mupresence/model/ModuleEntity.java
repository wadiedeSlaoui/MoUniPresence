package ma.fs.uae.ac.mupresence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Module")
@Data
public class ModuleEntity {
    @Id
    @GeneratedValue
    private int idModule;
    private String nom;
    private String semestre;
    private int idfiliere;
}
