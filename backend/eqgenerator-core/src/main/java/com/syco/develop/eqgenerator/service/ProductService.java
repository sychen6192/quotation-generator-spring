package com.syco.develop.eqgenerator.service;

import com.syco.develop.eqgenerator.model.jpa.ProductEntity;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    ProductEntity saveProduct(ProductEntity company);

    List<ProductEntity> getAllProducts();

    Optional<ProductEntity> getProductById(Long id);

    boolean existsById(Long id);

    void deleteProductById(Long id);

}
