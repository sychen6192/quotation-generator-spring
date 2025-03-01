package com.syco.develop.eqgenerator.controller.rest;

import com.google.gson.Gson;
import com.syco.develop.eqgenerator.model.dto.CompanyDTO;
import com.syco.develop.eqgenerator.model.jpa.CompanyEntity;
import com.syco.develop.eqgenerator.service.CompanyService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<CompanyDTO>> getAllCompanies() {
        List<CompanyEntity> companies = companyService.getAllCompanies();
        List<CompanyDTO> companyDTOs = companies.stream()
                .map(company -> modelMapper.map(company, CompanyDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(companyDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDTO> getCompanyById(@PathVariable Long id) {
        return companyService.getCompanyById(id)
                .map(company -> ResponseEntity.ok(modelMapper.map(company, CompanyDTO.class)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CompanyDTO> createCompany(@RequestBody String body) {
        Gson gson = new Gson();
        CompanyDTO companyDTO = gson.fromJson(body, CompanyDTO.class);
        CompanyEntity companyEntity = modelMapper.map(companyDTO, CompanyEntity.class);
        CompanyEntity savedCompany = companyService.saveCompany(companyEntity);
        CompanyDTO savedCompanyDTO = modelMapper.map(savedCompany, CompanyDTO.class);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedCompanyDTO.getId())
                .toUri();

        return ResponseEntity.created(location).body(savedCompanyDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyDTO> updateCompany(
            @PathVariable Long id,
            @RequestBody String body) {
        Gson gson = new Gson();
        CompanyDTO companyDTO = gson.fromJson(body, CompanyDTO.class);
        return companyService.getCompanyById(id)
                .map(existingCompany -> {
                    existingCompany.setName(companyDTO.getName());
                    existingCompany.setTaxId(companyDTO.getTaxId());
                    existingCompany.setPhoneNumber(companyDTO.getPhoneNumber());
                    existingCompany.setAddress(companyDTO.getAddress());
                    CompanyEntity updatedCompany = companyService.saveCompany(existingCompany);
                    CompanyDTO updatedCompanyDTO = modelMapper.map(updatedCompany, CompanyDTO.class);

                    return ResponseEntity.ok(updatedCompanyDTO);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        if (companyService.existsById(id)) {
            companyService.deleteCompanyById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
