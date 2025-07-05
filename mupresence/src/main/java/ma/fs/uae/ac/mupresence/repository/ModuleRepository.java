package ma.fs.uae.ac.mupresence.repository;

import ma.fs.uae.ac.mupresence.model.FiliereEntity;
import ma.fs.uae.ac.mupresence.model.ModuleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<ModuleEntity,String> {

    List<ModuleEntity> findByFiliereEntity(FiliereEntity filiereEntity);
    ModuleEntity findByFiliereEntityAndNom(FiliereEntity filiereEntity,String nom);
}
