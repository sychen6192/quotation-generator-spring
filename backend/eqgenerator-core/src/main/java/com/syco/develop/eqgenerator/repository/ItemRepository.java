package com.syco.develop.eqgenerator.repository;

import com.syco.develop.eqgenerator.model.jpa.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {
    ItemEntity findByName(String name);
}