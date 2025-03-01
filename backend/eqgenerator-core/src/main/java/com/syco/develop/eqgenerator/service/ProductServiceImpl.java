package com.syco.develop.eqgenerator.service;

import com.syco.develop.eqgenerator.model.jpa.ProductEntity;
import com.syco.develop.eqgenerator.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductEntity saveProduct(ProductEntity company) {
        return productRepository.save(company);
    }

    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<ProductEntity> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return productRepository.existsById(id);
    }

    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }
}
