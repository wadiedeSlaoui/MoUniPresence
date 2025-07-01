package ma.fs.uae.ac.mupresence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Presence")
@Data
public class PresenceEntity {

    @Id
    @GeneratedValue
    private int idPres;
    private int idexamen;
    private int idetudiant;
    private int idsurveillant;
    private String statut;
    private int date;
    private int heure;

    // Getters and setters
}