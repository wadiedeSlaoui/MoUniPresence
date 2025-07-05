package ma.fs.uae.ac.mupresence.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class ModuleDTO {

    private String moduleName;
    private String moduleId;

    private List<StudentDTO> students;
}
