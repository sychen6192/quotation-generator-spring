package com.syco.develop.eqgenerator.model.jpa;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = "quotes")
public class QuoteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quote_description")
    private String quoteDescription;

    @Column(name = "quote_valid_date", nullable = false)
    private LocalDate validUntil;

    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "sales", nullable = false)
    private String sales;

    @Column(name = "payment", nullable = false)
    private String payment;

    @Column(name = "tax_is_included", nullable = false)
    private boolean taxIsIncluded;

    @Column(name = "shipping_date")
    private Date shippingDate;

    @Column(name = "shipping_method")
    private String shippingMethod;

    // 關聯到 CompanyEntity（多對一）
    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private CompanyEntity company;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdTimestamp;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedTimestamp;

    @PrePersist
    protected void onCreate() {
        this.createdTimestamp = LocalDateTime.now();
        this.updatedTimestamp = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedTimestamp = LocalDateTime.now();
    }

}
