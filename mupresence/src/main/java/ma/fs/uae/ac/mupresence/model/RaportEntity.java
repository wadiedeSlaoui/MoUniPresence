package ma.fs.uae.ac.mupresence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "Rapport")
@Data
public class RaportEntity {
    @Id
    @GeneratedValue
    private int idRapport;
    private int IdExamen;
    private String content;
    private int dateGeneration;

}
