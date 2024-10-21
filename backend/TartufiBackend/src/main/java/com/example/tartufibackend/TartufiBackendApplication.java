package com.example.tartufibackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.tartufibackend")
public class TartufiBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TartufiBackendApplication.class, args);
    }

}
