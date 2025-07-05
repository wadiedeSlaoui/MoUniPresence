package ma.fs.uae.ac.mupresence.services.impl;

import jakarta.transaction.Transactional;
import ma.fs.uae.ac.mupresence.dto.ImportedDataDTO;
import ma.fs.uae.ac.mupresence.dto.ModuleDTO;
import ma.fs.uae.ac.mupresence.dto.StudentDTO;
import ma.fs.uae.ac.mupresence.model.*;
import ma.fs.uae.ac.mupresence.repository.ExamRepository;
import ma.fs.uae.ac.mupresence.repository.FiliereRepository;
import ma.fs.uae.ac.mupresence.repository.ModuleRepository;
import ma.fs.uae.ac.mupresence.repository.StudentRepository;
import ma.fs.uae.ac.mupresence.services.ImportModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class IImportModuleServiceImpl implements ImportModuleService {
    @Autowired
    private FiliereRepository filiereRepository;
    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ExamRepository examRepository;

    @Override
    @Transactional
    public void importModule(ImportedDataDTO importedDataDTO) {
        Optional<FiliereEntity> filiereEntityOpt = filiereRepository.findByNom(importedDataDTO.getFiliere());
        FiliereEntity filiereEntity = new FiliereEntity();

        if (filiereEntityOpt.isEmpty()) {
            filiereEntity.setNom(importedDataDTO.getFiliere());
            filiereEntity = filiereRepository.save(filiereEntity);
        } else {
            filiereEntity = filiereEntityOpt.get();
        }
        for (ModuleDTO moduleDTO : importedDataDTO.getModules()) {
            Optional<ModuleEntity> moduleEntityOpt = moduleRepository.findById(moduleDTO.getModuleId());
            ModuleEntity moduleEntity;
            if (moduleEntityOpt.isEmpty()) {
                moduleEntity = new ModuleEntity();
                moduleEntity.setIdModule(moduleDTO.getModuleId());
                moduleEntity.setNom(moduleDTO.getModuleName());
                moduleEntity.setFiliereEntity(filiereEntity);
                moduleEntity = moduleRepository.save(moduleEntity);
            } else {
                moduleEntity = moduleEntityOpt.get();
            }


            for (StudentDTO studentDTO : moduleDTO.getStudents()) {
                Optional<StudentEntity> studentEntityOp = studentRepository.findById(studentDTO.getCodEtu());
                StudentEntity studentEntity = new StudentEntity();
                if (studentEntityOp.isEmpty()) {
                    studentEntity.setIdEtu(studentDTO.getCodEtu());
                    studentEntity.setCne(studentDTO.getMassarCode());
                    studentEntity.setPlaceNumber(studentDTO.getPlaceNumber());
                    studentEntity.setRoom(studentDTO.getRoom());
                    studentEntity = studentRepository.save(studentEntity);

                } else {
                    studentEntity = studentEntityOp.get();
                }
                Optional<ExamEntity> examEntityOpt = examRepository.findByStudentEntityAndModuleEntityAndYearAndSession(studentEntity, moduleEntity, importedDataDTO.getYear(), importedDataDTO.getSession());
                if (examEntityOpt.isEmpty()) {
                    ExamEntity examEntity = new ExamEntity();
                    examEntity.setModuleEntity(moduleEntity);
                    examEntity.setStudentEntity(studentEntity);
                    examEntity.setSalle(studentDTO.getRoom());
                    examEntity.setPlace(studentDTO.getPlaceNumber());
                    examEntity.setSession(importedDataDTO.getSession());
                    examEntity.setYear(importedDataDTO.getYear());
                    examRepository.save(examEntity);
                } else {
                    ExamEntity examEntity = examEntityOpt.get();
                    examEntity.setSalle(studentDTO.getRoom());
                    examEntity.setPlace(studentDTO.getPlaceNumber());
                    examRepository.save(examEntity);
                }

            }

        }
    }
}
