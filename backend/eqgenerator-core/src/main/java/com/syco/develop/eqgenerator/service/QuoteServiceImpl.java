package com.syco.develop.eqgenerator.service;

import com.syco.develop.eqgenerator.model.dto.QuoteDTO;
import com.syco.develop.eqgenerator.model.jpa.QuoteEntity;
import com.syco.develop.eqgenerator.repository.QuoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuoteServiceImpl implements QuoteService {

    @Autowired
    private QuoteRepository quoteRepository;

    public QuoteEntity saveQuote(QuoteDTO quote) {
        return quoteRepository.save(quote);
    }

    public List<QuoteEntity> getAllQuotes() {
        return quoteRepository.findAll();
    }

    public Optional<QuoteEntity> getQuoteById(Long id) {
        return quoteRepository.findById(id);
    }

    public void deleteQuoteById(Long id) {
        quoteRepository.deleteById(id);
    }
}
