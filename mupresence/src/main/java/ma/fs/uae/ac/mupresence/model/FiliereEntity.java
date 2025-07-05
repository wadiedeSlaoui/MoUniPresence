package ma.fs.uae.ac.mupresence.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Entity
@Table(name = "Filiere")
@Data
public class FiliereEntity  {
    @Id
    @Column(name = "id_filiere")
    @GeneratedValue
    private Integer idFiliere;
    private String nom;





}