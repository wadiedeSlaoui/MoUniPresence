package ma.fs.uae.ac.mupresence.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Module")
@Data
public class ModuleEntity {
    @Id
    private String idModule;
    private String nom;
    private String semestre;
    @ManyToOne
    @JoinColumn(name="id_filiere", nullable=false)
    private FiliereEntity filiereEntity;
}
