package com.syco.develop.eqgenerator.model.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private Integer price;
    private String description;
}