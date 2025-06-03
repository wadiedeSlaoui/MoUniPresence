package ma.fs.uae.ac.mupresence.mapper;


import ma.fs.uae.ac.mupresence.dto.UserDTO;
import ma.fs.uae.ac.mupresence.model.UserEntity;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    @Mapping(target = "matricule", source = "username")
    @Mapping(target = "codeValidation", source = "codeValidation")
    @Mapping(target = "mail", source = "mail")
    @Mapping(target = "password", source = "password")
    @Mapping(target = "role", source = "role")
    @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
    UserDTO userToUserDTO(UserEntity user);

    @Mapping(target = "username", source = "matricule")
    @Mapping(target = "codeValidation", source = "codeValidation")
    @Mapping(target = "mail", source = "mail")
    @Mapping(target = "password", source = "password")
    @Mapping(target = "role", source = "role")
    @BeanMapping(unmappedTargetPolicy = ReportingPolicy.IGNORE)
    UserEntity userDTOToUser(UserDTO user);
}
