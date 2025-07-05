package ma.fs.uae.ac.mupresence.services;

import ma.fs.uae.ac.mupresence.dto.RapportDTO;

import java.util.List;

public interface RapportService {

    RapportDTO addRapport(RapportDTO rapportDTO);

    List<RapportDTO> listerRapport();

    List<RapportDTO> deleteRapport(Integer rapportId);

    List<RapportDTO> updateRapport(Integer rapportId,RapportDTO rapportDTO);

}
