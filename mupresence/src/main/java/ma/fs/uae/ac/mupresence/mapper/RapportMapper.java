package ma.fs.uae.ac.mupresence.mapper;

import ma.fs.uae.ac.mupresence.dto.RapportDTO;
import ma.fs.uae.ac.mupresence.model.RaportEntity;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE)

public interface RapportMapper {
    @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
    RapportDTO rapportToRapportDTO(RaportEntity raport);


    @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
    RaportEntity rapportDTOToRapport(RapportDTO rapport);

    List<RapportDTO> listRapportEntityToRapportDTO(List<RaportEntity> userEntities);
}
