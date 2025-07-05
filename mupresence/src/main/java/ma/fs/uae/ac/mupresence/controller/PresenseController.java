package ma.fs.uae.ac.mupresence.controller;

import jakarta.persistence.GeneratedValue;
import ma.fs.uae.ac.mupresence.dto.PresenseDTO;
import ma.fs.uae.ac.mupresence.services.PresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/presence")

public class PresenseController {

    @Autowired
    private PresenceService presenceService;
    @GetMapping
    ResponseEntity<List<PresenseDTO>> presenseList() {
        return ResponseEntity.ok(presenceService.listPresense());
    }

    @PostMapping
    ResponseEntity<List<PresenseDTO>> survChoose(@RequestBody PresenseDTO presenseDTO) {
        return ResponseEntity.ok(presenceService.survChoose(presenseDTO));
    }

}
