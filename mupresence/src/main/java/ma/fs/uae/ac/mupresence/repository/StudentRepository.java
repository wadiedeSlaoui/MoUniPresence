package ma.fs.uae.ac.mupresence.repository;

import ma.fs.uae.ac.mupresence.model.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity,Integer> {
}
