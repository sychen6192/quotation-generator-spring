package com.syco.develop.eqgenerator.controller.rest;

import com.syco.develop.eqgenerator.model.jpa.CompanyEntity;
import com.syco.develop.eqgenerator.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping
    public ResponseEntity<CompanyEntity> createCompany(@RequestBody CompanyEntity company) {
        CompanyEntity savedCompany = companyService.saveCompany(company);
        return ResponseEntity.ok(savedCompany);
    }

    @GetMapping
    public ResponseEntity<List<CompanyEntity>> getAllCompanies() {
        List<CompanyEntity> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyEntity> getCompanyById(@PathVariable Long id) {
        return companyService.getCompanyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyEntity> updateCompany(
            @PathVariable Long id,
            @RequestBody CompanyEntity company) {
        return companyService.getCompanyById(id)
                .map(existingCompany -> {
                    existingCompany.setName(company.getName());
                    existingCompany.setTaxId(company.getTaxId());
                    existingCompany.setPhoneNumber(company.getPhoneNumber());
                    existingCompany.setAddress(company.getAddress());
                    CompanyEntity updatedCompany = companyService.saveCompany(existingCompany);
                    return ResponseEntity.ok(updatedCompany);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        if (companyService.getCompanyById(id).isPresent()) {
            companyService.deleteCompanyById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
