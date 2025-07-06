package ma.fs.uae.ac.mupresence.services.impl;

import ma.fs.uae.ac.mupresence.dto.PresenseDTO;
import ma.fs.uae.ac.mupresence.dto.StudentExamDTO;
import ma.fs.uae.ac.mupresence.model.*;
import ma.fs.uae.ac.mupresence.repository.*;
import ma.fs.uae.ac.mupresence.services.PresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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
                    presenceEntity.ifPresent(entity -> presenseDTO.setSurvaillant(entity.getSurv().getUsername()));
                    presenseDTOList.add(presenseDTO);
                }
            }
        }
        return presenseDTOList;
    }

    @Override
    public List<String> filiereListByUser(String username) {
        Optional<UserEntity> userEntity = userRepository.findByUsername(username);
        Set<String> filiers = new HashSet<>();
        if(userEntity.isPresent()){
            List<PresenceEntity> presenceEntities = presenseRepository.findBySurvAndSubmited(userEntity.get(),false);
            for(PresenceEntity presenceEntity :presenceEntities){
                filiers.add(presenceEntity.getModuleEntity().getFiliereEntity().getNom());
            }
        }

        return filiers.stream().toList();
    }

    @Override
    public List<String> moduleListByUserAndFiliere(String username, String filiere) {
        Optional<UserEntity> userEntity = userRepository.findByUsername(username);
        Set<String> modules = new HashSet<>();
        if(userEntity.isPresent()){
            List<PresenceEntity> presenceEntities = presenseRepository.findBySurvAndSubmited(userEntity.get(),false);
            for(PresenceEntity presenceEntity :presenceEntities){
                if(filiere.equals(presenceEntity.getModuleEntity().getFiliereEntity().getNom())){
                    modules.add(presenceEntity.getModuleEntity().getNom());
                }
            }
        }

        return modules.stream().toList();
    }

    @Override
    public List<PresenseDTO> survChoose(PresenseDTO presenseDTO) {
        Optional<FiliereEntity> filiere = filiereRepository.findByNom(presenseDTO.getFiliere());
        if (filiere.isPresent()) {
            ModuleEntity module = moduleRepository.findByFiliereEntityAndNom(filiere.get(), presenseDTO.getModule());
            Optional<PresenceEntity> presenceEntity = presenseRepository.findByModuleEntityAndRoomAndSubmited(module, presenseDTO.getRoom(),false);
            PresenceEntity presense;
            if (presenceEntity.isEmpty()) {
                presense = new PresenceEntity();
                presense.setSurv(userRepository.findByUsername(presenseDTO.getSurvaillant()).orElse(null));
                presense.setModuleEntity(module);
                presense.setRoom(presenseDTO.getRoom());
                presense.setExams(examRepository.findByModuleEntityAndSalle(module, presense.getRoom()));
            } else {
                presense = presenceEntity.get();
                presense.setSurv(userRepository.findByUsername(presenseDTO.getSurvaillant()).orElse(null));
            }
            if (presense.getSurv() == null && presense.getIdPres() != null) {
                presenseRepository.deleteById(presense.getIdPres());
            } else if (presense.getSurv() != null) {
                presenseRepository.save(presense);
            }
        }
        return listPresense();
    }

    @Override
    public List<String> roomListByUserAndFiliereAndModule(String username, String filiere, String module) {
        Optional<UserEntity> userEntity = userRepository.findByUsername(username);
        ModuleEntity moduleEn = moduleRepository.findByFiliereEntityAndNom(filiereRepository.findByNom(filiere).orElse(null),module);
        Set<String> modules = new HashSet<>();
        if(userEntity.isPresent()){
            List<PresenceEntity> presenceEntities = presenseRepository.findBySurvAndModuleEntityAndSubmited(userEntity.get(),moduleEn,false);
            for(PresenceEntity presenceEntity :presenceEntities){
                modules.add(presenceEntity.getRoom());
            }
        }
        return modules.stream().toList();
    }

    @Override
    public List<StudentExamDTO> studentListByUserAndFiliereAndModuleAndRoom(String username, String filiere, String module, String room) {
        Optional<UserEntity> userEntity = userRepository.findByUsername(username);
        ModuleEntity moduleEn = moduleRepository.findByFiliereEntityAndNom(filiereRepository.findByNom(filiere).orElse(null),module);
        List<StudentExamDTO> studentExamDTOS = new ArrayList<>();
        if(userEntity.isPresent()){
            PresenceEntity presenceEntities = presenseRepository.findBySurvAndModuleEntityAndRoomAndSubmited(userEntity.get(),moduleEn,room,false);
            for(ExamEntity exam :presenceEntities.getExams()){
                StudentExamDTO studentExamDTO = new StudentExamDTO();
                studentExamDTO.setStudent_code(exam.getStudentEntity().getIdEtu());
                studentExamDTO.setFirstName(exam.getStudentEntity().getFirstname());
                studentExamDTO.setLastName(exam.getStudentEntity().getLastName());
                studentExamDTO.setPlaceNumber(exam.getStudentEntity().getPlaceNumber());
                studentExamDTO.setCne(exam.getStudentEntity().getCne());
                studentExamDTOS.add(studentExamDTO);
            }
        }
        return studentExamDTOS;
    }
    @Override
    public void studenPresenceByUserAndFiliereAndModuleAndRoom(String username, String filiere, String module, String room, List<StudentExamDTO> studentsPresense) {
        Optional<UserEntity> userEntity = userRepository.findByUsername(username);
        ModuleEntity moduleEn = moduleRepository.findByFiliereEntityAndNom(filiereRepository.findByNom(filiere).orElse(null),module);
        if(userEntity.isPresent()){
            PresenceEntity presenceEntities = presenseRepository.findBySurvAndModuleEntityAndRoomAndSubmited(userEntity.get(),moduleEn,room,false);
            for(ExamEntity exam :presenceEntities.getExams()){
                for(StudentExamDTO studentExamDTO : studentsPresense){
                    if(Objects.equals(studentExamDTO.getStudent_code(), exam.getStudentEntity().getIdEtu())){
                        exam.setPresent(studentExamDTO.isPresent());
                        examRepository.save(exam);
                    }
                }
            }
            presenceEntities.setSubmited(true);
            presenseRepository.save(presenceEntities);

        }
    }
}
