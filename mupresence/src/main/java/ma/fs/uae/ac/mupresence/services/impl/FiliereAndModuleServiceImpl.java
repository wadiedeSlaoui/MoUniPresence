package ma.fs.uae.ac.mupresence.services.impl;

import ma.fs.uae.ac.mupresence.model.FiliereEntity;
import ma.fs.uae.ac.mupresence.model.ModuleEntity;
import ma.fs.uae.ac.mupresence.repository.FiliereRepository;
import ma.fs.uae.ac.mupresence.repository.ModuleRepository;
import ma.fs.uae.ac.mupresence.services.FiliereAndModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FiliereAndModuleServiceImpl implements FiliereAndModuleService {
    @Autowired
    private FiliereRepository filiereRepository;
    @Autowired
    private ModuleRepository moduleRepository;
    @Override
    public List<String> getFiliers() {
        return filiereRepository.findAll().stream().map(FiliereEntity::getNom).collect(Collectors.toList());
    }

    @Override
    public List<String> getModules(String filiere) {
        FiliereEntity filiereEntity = filiereRepository.findByNom(filiere).orElse(null);
        return moduleRepository.findByFiliereEntity(filiereEntity).stream().map(ModuleEntity::getNom).toList();
    }
}
