package ma.fs.uae.ac.mupresence;

import ma.fs.uae.ac.mupresence.entity.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MupresenceApplication {

	public static void main(String[] args) {
		User user = new User();
		user.setUsername("test1");
		System.out.println(user.getUsername());


		SpringApplication.run(MupresenceApplication.class, args);
	}

}
