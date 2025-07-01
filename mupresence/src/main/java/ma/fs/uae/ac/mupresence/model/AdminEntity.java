package ma.fs.uae.ac.mupresence.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "Admin")
@Data
public class AdminEntity {
    @Id
    @GeneratedValue
    private String matriculeAdmin;
}
