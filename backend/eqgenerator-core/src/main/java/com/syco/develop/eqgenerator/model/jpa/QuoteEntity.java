package com.syco.develop.eqgenerator.model.jpa;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "quotes")
public class QuoteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valid_until", nullable = false)
    private Date validUntil;

    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "sales", nullable = false)
    private String sales;

    @Column(name = "payment", nullable = false)
    private String payment;

    @Column(name = "tax_is_included", nullable = false)
    private boolean taxIsIncluded;

    @Column(name = "remark")
    private String remark;

    @Column(name = "shipping_date")
    private Date shippingDate;

    @Column(name = "shipping_method")
    private String shippingMethod;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private CompanyEntity company;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    @OneToMany(mappedBy = "quote", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuoteItemEntity> items = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

}
