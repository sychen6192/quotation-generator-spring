package com.syco.develop.eqgenerator.service;

import com.syco.develop.eqgenerator.model.jpa.ItemEntity;
import com.syco.develop.eqgenerator.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public ItemEntity saveItem(ItemEntity company) {
        return itemRepository.save(company);
    }

    public List<ItemEntity> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<ItemEntity> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public void deleteItemById(Long id) {
        itemRepository.deleteById(id);
    }
}
