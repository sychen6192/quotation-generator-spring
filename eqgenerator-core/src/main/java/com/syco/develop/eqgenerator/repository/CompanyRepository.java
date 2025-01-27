package com.syco.develop.eqgenerator.repository;

import com.syco.develop.eqgenerator.model.jpa.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<CompanyEntity, Long> {
    CompanyEntity findByName(String name);
}