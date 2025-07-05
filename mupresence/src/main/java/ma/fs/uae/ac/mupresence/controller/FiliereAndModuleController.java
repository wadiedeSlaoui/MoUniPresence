package ma.fs.uae.ac.mupresence.controller;

import ma.fs.uae.ac.mupresence.services.FiliereAndModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/filiereAndModule")
public class FiliereAndModuleController {

    @Autowired
    private FiliereAndModuleService filiereAndModuleService;


    @GetMapping
    public List<String> getFilieres(){
        return filiereAndModuleService.getFiliers();
    }

    @GetMapping("/{filiere}")
    public List<String> getModulesByFiliere(@PathVariable String filiere){
        if(filiere == null){
            return new ArrayList<>();
        }
        return filiereAndModuleService.getModules(filiere);
    }

}
