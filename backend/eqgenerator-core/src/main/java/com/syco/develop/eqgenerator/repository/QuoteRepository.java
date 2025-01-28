package com.syco.develop.eqgenerator.repository;

import com.syco.develop.eqgenerator.model.jpa.QuoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<QuoteEntity, Long> {
}
