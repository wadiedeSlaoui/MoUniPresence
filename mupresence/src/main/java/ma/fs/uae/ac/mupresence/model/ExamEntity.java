package ma.fs.uae.ac.mupresence.model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "Examen")
@Data
public class ExamEntity {
    @Id
    @GeneratedValue
    private Integer idExamen;
    @ManyToOne
    @JoinColumn(name="id_etu", nullable=false)
    private StudentEntity studentEntity;
    @ManyToOne
    @JoinColumn(name="id_module", nullable=false)
    private ModuleEntity moduleEntity;
    private String salle;
    private String place;
    private String year;
    private String session;
    private boolean present = false;


}
