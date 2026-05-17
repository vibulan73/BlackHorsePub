package com.blackhorsepub.BlackHorse_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(CorsProperties.class)
public class BlackHorseBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlackHorseBackendApplication.class, args);
	}

}
