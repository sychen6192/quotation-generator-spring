package com.syco.develop.eqgenerator.controller.rest;

import com.google.gson.Gson;
import com.syco.develop.eqgenerator.model.dto.ProductDTO;
import com.syco.develop.eqgenerator.model.jpa.ProductEntity;
import com.syco.develop.eqgenerator.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductEntity> products = productService.getAllProducts();
        List<ProductDTO> productDTOs = products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .toList();
        return ResponseEntity.ok(productDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(product -> ResponseEntity.ok(modelMapper.map(product, ProductDTO.class)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody String body) {
        Gson gson = new Gson();
        ProductDTO productDTO = gson.fromJson(body, ProductDTO.class);
        ProductEntity productEntity = modelMapper.map(productDTO, ProductEntity.class);
        ProductEntity savedProduct = productService.saveProduct(productEntity);
        ProductDTO savedProductDTO = modelMapper.map(savedProduct, ProductDTO.class);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedProductDTO.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedProductDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @RequestBody String body) {
        Gson gson = new Gson();
        ProductDTO productDTO = gson.fromJson(body, ProductDTO.class);
        return productService.getProductById(id)
                .map(existingProduct -> {
                    existingProduct.setName(productDTO.getName());
                    existingProduct.setPrice(productDTO.getPrice());
                    ProductEntity updatedProduct = productService.saveProduct(existingProduct);
                    ProductDTO updatedProductDTO = modelMapper.map(updatedProduct, ProductDTO.class);

                    return ResponseEntity.ok(updatedProductDTO);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.existsById(id)) {
            productService.deleteProductById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
