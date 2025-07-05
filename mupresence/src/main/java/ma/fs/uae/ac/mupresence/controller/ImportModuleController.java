package ma.fs.uae.ac.mupresence.controller;

import ma.fs.uae.ac.mupresence.dto.ImportedDataDTO;
import ma.fs.uae.ac.mupresence.services.ImportModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/import/module")
public class ImportModuleController {

    @Autowired
    private ImportModuleService importModuleService;

    @PostMapping
    private ResponseEntity<Void> importModule(@RequestBody ImportedDataDTO importedDataDTO) {
        importModuleService.importModule(importedDataDTO);
        return new ResponseEntity<>(HttpStatusCode.valueOf(200));
    }
}
