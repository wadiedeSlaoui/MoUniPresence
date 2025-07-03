package ma.fs.uae.ac.mupresence.mapper;


import ma.fs.uae.ac.mupresence.dto.UserDTO;
import ma.fs.uae.ac.mupresence.model.UserEntity;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
    UserDTO userToUserDTO(UserEntity user);


    @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
    UserEntity userDTOToUser(UserDTO user);

    List<UserDTO> listUserEntityToUserDTO(List<UserEntity> userEntities);
}
