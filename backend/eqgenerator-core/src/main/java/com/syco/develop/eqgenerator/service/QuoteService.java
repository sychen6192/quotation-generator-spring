package com.syco.develop.eqgenerator.service;

import com.syco.develop.eqgenerator.model.jpa.QuoteEntity;

import java.util.List;
import java.util.Optional;

public interface QuoteService {
    QuoteEntity saveQuote(QuoteDTO quote);

    List<QuoteEntity> getAllQuotes();

    Optional<QuoteEntity> getQuoteById(Long id);

    void deleteQuoteById(Long id);
}
