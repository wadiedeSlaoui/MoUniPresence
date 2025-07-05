package ma.fs.uae.ac.mupresence.services.impl;

import ma.fs.uae.ac.mupresence.dto.PresenseDTO;
import ma.fs.uae.ac.mupresence.model.FiliereEntity;
import ma.fs.uae.ac.mupresence.model.ModuleEntity;
import ma.fs.uae.ac.mupresence.model.PresenceEntity;
import ma.fs.uae.ac.mupresence.repository.*;
import ma.fs.uae.ac.mupresence.services.PresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PresenceServiceImpl implements PresenceService {
    @Autowired
    private FiliereRepository filiereRepository;
    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private PresenseRepository presenseRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<PresenseDTO> listPresense() {
        List<PresenseDTO> presenseDTOList = new ArrayList<>();
        List<FiliereEntity> filiereEntities = filiereRepository.findAll();
        for (FiliereEntity filiereEntity : filiereEntities) {
            List<ModuleEntity> moduleEntities = moduleRepository.findByFiliereEntity(filiereEntity);
            for (ModuleEntity moduleEntity : moduleEntities) {
                List<String> roomList = examRepository.findSallesByModuleId(moduleEntity.getIdModule());
                for (String room : roomList) {
                    PresenseDTO presenseDTO = new PresenseDTO();
                    presenseDTO.setFiliere(filiereEntity.getNom());
                    presenseDTO.setRoom(room);
                    presenseDTO.setModule(moduleEntity.getNom());
                    Optional<PresenceEntity> presenceEntity = presenseRepository.findByModuleEntityAndRoom(moduleEntity, room);
                    presenceEntity.ifPresent(entity -> presenseDTO.setSurvaillant(entity.getSurv().getFirstName() +" "+ entity.getSurv().getLastName()));
                    presenseDTOList.add(presenseDTO);
                }
            }
        }
        return presenseDTOList;
    }

    @Override
    public List<PresenseDTO> survChoose(PresenseDTO presenseDTO) {
        Optional<FiliereEntity> filiere = filiereRepository.findByNom(presenseDTO.getFiliere());
        if (filiere.isPresent()) {
            ModuleEntity module = moduleRepository.findByFiliereEntityAndNom(filiere.get(), presenseDTO.getModule());
            Optional<PresenceEntity> presenceEntity = presenseRepository.findByModuleEntityAndRoom(module, presenseDTO.getRoom());
            PresenceEntity presense;
            if (presenceEntity.isEmpty()) {
                presense = new PresenceEntity();
                presense.setSurv(userRepository.findByFirstNameAndLastName(presenseDTO.getSurvaillant().split(" ")[0], presenseDTO.getSurvaillant().split(" ")[1]));
                presense.setModuleEntity(module);
                presense.setRoom(presenseDTO.getRoom());
                presense.setExams(examRepository.findByModuleEntityAndSalle(module, presense.getRoom()));
            } else {
                presense = presenceEntity.get();
                presense.setSurv(userRepository.findByFirstNameAndLastName(presenseDTO.getSurvaillant().split(" ")[0], presenseDTO.getSurvaillant().split(" ")[1]));
            }
            presenseRepository.save(presense);
        }
        return listPresense();
    }
}
