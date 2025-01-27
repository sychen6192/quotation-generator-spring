package com.syco.develop.eqgenerator;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.Metamodel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.syco.develop.eqgenerator"})
public class EqgeneratorApplication {
    @Autowired
    private EntityManager entityManager;

    public static void main(String[] args) {
        SpringApplication.run(EqgeneratorApplication.class, args);
    }

    @PostConstruct
    public void checkEntities() {
        Metamodel metamodel = entityManager.getMetamodel();
        for (EntityType<?> entity : metamodel.getEntities()) {
            System.out.println("Loaded entity: " + entity.getName());
        }
    }
}
