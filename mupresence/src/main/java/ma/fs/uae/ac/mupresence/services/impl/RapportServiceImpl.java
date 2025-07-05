package ma.fs.uae.ac.mupresence.services.impl;

import ma.fs.uae.ac.mupresence.dto.RapportDTO;
import ma.fs.uae.ac.mupresence.mapper.RapportMapper;
import ma.fs.uae.ac.mupresence.model.RaportEntity;
import ma.fs.uae.ac.mupresence.repository.RapportRepository;
import ma.fs.uae.ac.mupresence.services.RapportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
public class RapportServiceImpl implements RapportService {

    @Autowired
    private RapportMapper rapportMapper;

    @Autowired
    private RapportRepository rapportRepository;

    @Override
    public RapportDTO addRapport(RapportDTO rapportDTO) {
        rapportDTO.setDateGeneration(new Date());
        return rapportMapper.rapportToRapportDTO(rapportRepository.save(rapportMapper.rapportDTOToRapport(rapportDTO)));
    }

    @Override
    public List<RapportDTO> listerRapport() {
        return rapportMapper.listRapportEntityToRapportDTO(rapportRepository.findAll());
    }

    @Override
    public List<RapportDTO> deleteRapport(Integer rapportId) {
        rapportRepository.deleteById(rapportId);
        return rapportMapper.listRapportEntityToRapportDTO(rapportRepository.findAll());
    }

    @Override
    public List<RapportDTO> updateRapport(Integer rapportId, RapportDTO rapportDTO) {
        Optional<RaportEntity> raport = rapportRepository.findById(rapportId);
        if(raport.isPresent()){
            RaportEntity raportEntity = raport.get();
            raportEntity.setModule(rapportDTO.getModule());
            raportEntity.setFiliere(rapportDTO.getFiliere());
            raportEntity.setDescription(rapportDTO.getDescription());
            raportEntity.setNuApogee(rapportDTO.getNuApogee());
            raportEntity.setLeCas(rapportDTO.getLeCas());
            raportEntity.setStudentFullName(rapportDTO.getStudentFullName());
            raportEntity.setDateGeneration(new Date());
            rapportRepository.save(raportEntity);
        }
        return rapportMapper.listRapportEntityToRapportDTO(rapportRepository.findAll());
    }
}
