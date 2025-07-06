package ma.fs.uae.ac.mupresence.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class StudentExamDTO {
    private Integer student_code;
    private String cne;
    private String firstName;
    private String lastName;
    private String placeNumber;
    private boolean present;
}
