package ma.fs.uae.ac.mupresence.repository;


import ma.fs.uae.ac.mupresence.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Integer> {

    Optional<UserEntity> findByUsername(String username);
}
