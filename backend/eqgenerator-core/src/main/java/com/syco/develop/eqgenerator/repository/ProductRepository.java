package com.syco.develop.eqgenerator.repository;

import com.syco.develop.eqgenerator.model.jpa.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    ProductEntity findByName(String name);
}