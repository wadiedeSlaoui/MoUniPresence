package ma.fs.uae.ac.mupresence.services;

import ma.fs.uae.ac.mupresence.dto.PresenseDTO;
import ma.fs.uae.ac.mupresence.dto.StudentExamDTO;

import java.util.List;

public interface PresenceService {

    List<PresenseDTO> listPresense();
    List<String> filiereListByUser(String username);

    List<String> moduleListByUserAndFiliere(String username, String filiere);

    List<PresenseDTO> survChoose(PresenseDTO presenseDTO);

    List<String> roomListByUserAndFiliereAndModule(String usernmae, String filiere, String module);

    List<StudentExamDTO> studentListByUserAndFiliereAndModuleAndRoom(String username, String filiere, String module, String room);

    void studenPresenceByUserAndFiliereAndModuleAndRoom(String username, String filiere, String module, String room, List<StudentExamDTO> studentsPresense);
}
