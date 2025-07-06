package ma.fs.uae.ac.mupresence.controller;

import ma.fs.uae.ac.mupresence.dto.PresenseDTO;
import ma.fs.uae.ac.mupresence.dto.StudentExamDTO;
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

    @GetMapping("/filiere/{username}")
    ResponseEntity<List<String>> filiereListByUser(@PathVariable String username) {

        return ResponseEntity.ok(presenceService.filiereListByUser(username));
    }

    @GetMapping("/module")
    ResponseEntity<List<String>> filiereListByUser(@RequestParam String filiere,
                                                   @RequestParam String username) {

        return ResponseEntity.ok(presenceService.moduleListByUserAndFiliere(username,filiere));
    }

    @GetMapping("/room")
    public ResponseEntity<List<String>> roomList(
            @RequestParam String module,
            @RequestParam String filiere,
            @RequestParam String username) {
        return ResponseEntity.ok(presenceService.roomListByUserAndFiliereAndModule(username, filiere, module));
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentExamDTO>> studentList(
            @RequestParam String module,
            @RequestParam String filiere,
            @RequestParam String username,
            @RequestParam String room
            ) {
        return ResponseEntity.ok(presenceService.studentListByUserAndFiliereAndModuleAndRoom(username, filiere, module,room));
    }
    @PostMapping("/studentsPresence")
    public void studentList(
            @RequestParam String module,
            @RequestParam String filiere,
            @RequestParam String username,
            @RequestParam String room,
            @RequestBody List<StudentExamDTO> students
    ) {
        presenceService.studenPresenceByUserAndFiliereAndModuleAndRoom(username, filiere, module,room,students);
    }
    @PostMapping
    ResponseEntity<List<PresenseDTO>> survChoose(@RequestBody PresenseDTO presenseDTO) {
        return ResponseEntity.ok(presenceService.survChoose(presenseDTO));
    }

}
