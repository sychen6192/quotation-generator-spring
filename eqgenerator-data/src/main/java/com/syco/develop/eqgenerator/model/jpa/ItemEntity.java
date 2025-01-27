package com.syco.develop.eqgenerator.model.jpa;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "items")
public class ItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    @Positive
    private Integer quantity;

    @NotNull
    @Positive
    private Integer unitPrice;

    @Transient
    public Integer getTotalPrice() {
        return this.unitPrice * this.quantity;
    }

    // 關聯到 QuoteEntity（多對一）
    @ManyToOne
    @JoinColumn(name = "quote_id", nullable = false)
    private QuoteEntity quote;
}
