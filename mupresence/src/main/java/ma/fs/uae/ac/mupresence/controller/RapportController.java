package ma.fs.uae.ac.mupresence.controller;

import ma.fs.uae.ac.mupresence.dto.RapportDTO;
import ma.fs.uae.ac.mupresence.services.RapportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rapport")
public class RapportController {

    @Autowired
    private RapportService rapportService;
    @GetMapping
    public List<RapportDTO> findAllRapprt(){
        return rapportService.listerRapport();
    }
    @PostMapping
    public RapportDTO saveRapport(@RequestBody RapportDTO rapportDTO){
        return rapportService.addRapport(rapportDTO);
    }
    @PutMapping("/{id}")
    public List<RapportDTO> updateRapport(@PathVariable Integer id, @RequestBody RapportDTO rapportDTO){
        return rapportService.updateRapport(id,rapportDTO);
    }
    @DeleteMapping("/{id}")
    public List<RapportDTO> updateRapport(@PathVariable Integer id){
        return rapportService.deleteRapport(id);
    }
}
