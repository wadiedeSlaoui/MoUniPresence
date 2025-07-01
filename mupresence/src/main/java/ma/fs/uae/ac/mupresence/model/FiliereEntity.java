package ma.fs.uae.ac.mupresence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "Filiere")
@Data
public class FiliereEntity  {
    @Id
    @GeneratedValue
    private int idFiliere;
    private String nom;



}