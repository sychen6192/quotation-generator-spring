package com.syco.develop.eqgenerator.service;

import com.syco.develop.eqgenerator.model.jpa.CompanyEntity;

import java.util.List;
import java.util.Optional;

public interface CompanyService {

    CompanyEntity saveCompany(CompanyEntity company);

    List<CompanyEntity> getAllCompanies();

    Optional<CompanyEntity> getCompanyById(Long id);

    boolean existsById(Long id);

    void deleteCompanyById(Long id);
}
