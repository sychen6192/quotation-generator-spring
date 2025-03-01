package com.syco.develop.eqgenerator.model.dto;

import lombok.Data;

import java.util.Date;

@Data
public class QuoteDTO {
    private Long id;
    private String remark;
    private Date validUntil;
    private String author;
    private String sales;
    private String payment;
    private boolean taxIsIncluded;
    private Date shippingDate;
    private String shippingMethod;
    private Long companyId;
    private List<QuoteItemDTO> items;
}
