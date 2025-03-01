package com.syco.develop.eqgenerator.model.jpa;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "quote_items")
public class QuoteItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "quote_id", nullable = false)
    private QuoteEntity quote;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @Column(name = "quantity", nullable = false)
    private int quantity;
}
