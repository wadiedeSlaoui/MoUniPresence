package ma.fs.uae.ac.mupresence.repository;

import ma.fs.uae.ac.mupresence.model.ExamEntity;
import ma.fs.uae.ac.mupresence.model.ModuleEntity;
import ma.fs.uae.ac.mupresence.model.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExamRepository extends JpaRepository<ExamEntity, Integer> {
    Optional<ExamEntity> findByStudentEntityAndModuleEntityAndYearAndSession(StudentEntity studentEntity, ModuleEntity moduleEntity,String year,String session);

    List<ExamEntity> findByModuleEntityAndSalle(ModuleEntity module, String salle);
    @Query(value = "SELECT DISTINCT salle FROM Examen WHERE id_module = :moduleId", nativeQuery = true)
    List<String> findSallesByModuleId(@Param("moduleId") String moduleId);
}
