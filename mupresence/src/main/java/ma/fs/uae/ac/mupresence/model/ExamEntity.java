package ma.fs.uae.ac.mupresence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "Examen")
@Data
    public class ExamEntity {
        @Id
        @GeneratedValue
        private int idExamen;
        private int idmodule;
        private int date;
        private int heure;
        private String salle;


}
