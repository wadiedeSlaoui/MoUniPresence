package ma.fs.uae.ac.mupresence.repository;

import ma.fs.uae.ac.mupresence.model.FiliereEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FiliereRepository extends JpaRepository<FiliereEntity,Integer> {
    Optional<FiliereEntity> findByNom(String name);
}
