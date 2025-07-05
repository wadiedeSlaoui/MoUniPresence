package ma.fs.uae.ac.mupresence.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "Presence")
@Data
public class PresenceEntity {

    @Id
    @GeneratedValue
    private Integer idPres;

    @OneToMany
    private List<ExamEntity> exams;

    @ManyToOne
    @JoinColumn(name="id_module", nullable=false)
    private ModuleEntity moduleEntity;

    private String room;
    @ManyToOne
    @JoinColumn(name="id", nullable=false)
    private UserEntity surv;



    // Getters and setters
}