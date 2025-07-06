package ma.fs.uae.ac.mupresence.repository;

import ma.fs.uae.ac.mupresence.model.ModuleEntity;
import ma.fs.uae.ac.mupresence.model.PresenceEntity;
import ma.fs.uae.ac.mupresence.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface PresenseRepository extends JpaRepository<PresenceEntity,Integer> {
    Optional<PresenceEntity> findByModuleEntityAndRoomAndSubmited(ModuleEntity moduleEntity,String room,Boolean submited);
    Optional<PresenceEntity> findByModuleEntityAndRoom(ModuleEntity moduleEntity,String room);

    List<PresenceEntity> findBySurvAndSubmited(UserEntity surv,Boolean submited);

    List<PresenceEntity> findBySurvAndModuleEntityAndSubmited(UserEntity surv,ModuleEntity entity,Boolean submited);

    PresenceEntity findBySurvAndModuleEntityAndRoomAndSubmited(UserEntity surv,ModuleEntity entity,String room,Boolean submited);
}
