package ma.fs.uae.ac.mupresence.repository;


import ma.fs.uae.ac.mupresence.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<UserEntity,Integer> {

    Optional<UserEntity> findByUsername(String username);
    UserEntity findByFirstNameAndLastName(String firstName,String lastName);
    @Query(value = "SELECT * FROM users WHERE role = 'ROLE_SURVEILLANT'", nativeQuery = true)
    List<UserEntity> findAllSurveillant();
}
