package com.syco.develop.eqgenerator.model.dto;

import lombok.Data;

@Data
public class CompanyDTO {
    private Long id;
    private String name;
    private String taxId;
    private String phoneNumber;
    private String address;
}