package com.syco.develop.eqgenerator.service;

import com.syco.develop.eqgenerator.model.jpa.CompanyEntity;
import com.syco.develop.eqgenerator.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService{

    @Autowired
    private CompanyRepository companyRepository;

    public CompanyEntity saveCompany(CompanyEntity company) {
        return companyRepository.save(company);
    }

    public List<CompanyEntity> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Optional<CompanyEntity> getCompanyById(Long id) {
        return companyRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return companyRepository.existsById(id);
    }

    public void deleteCompanyById(Long id) {
        companyRepository.deleteById(id);
    }
}
