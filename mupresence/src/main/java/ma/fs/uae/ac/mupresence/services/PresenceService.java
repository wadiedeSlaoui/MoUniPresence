package ma.fs.uae.ac.mupresence.services;

import ma.fs.uae.ac.mupresence.dto.PresenseDTO;

import java.util.List;

public interface PresenceService {

    List<PresenseDTO> listPresense();

    List<PresenseDTO> survChoose(PresenseDTO presenseDTO);
}
