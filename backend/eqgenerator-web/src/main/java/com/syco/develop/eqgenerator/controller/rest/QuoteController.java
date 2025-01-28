package com.syco.develop.eqgenerator.controller.rest;

import com.syco.develop.eqgenerator.model.jpa.QuoteEntity;
import com.syco.develop.eqgenerator.service.QuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    @Autowired
    private QuoteService quoteService;

    @PostMapping
    public ResponseEntity<QuoteEntity> createQuote(@RequestBody QuoteEntity quote) {
        QuoteEntity savedQuote = quoteService.saveQuote(quote);
        return ResponseEntity.ok(savedQuote);
    }

    @GetMapping
    public ResponseEntity<List<QuoteEntity>> getAllQuotes() {
        List<QuoteEntity> quotes = quoteService.getAllQuotes();
        return ResponseEntity.ok(quotes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuoteEntity> getQuoteById(@PathVariable Long id) {
        return quoteService.getQuoteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuoteEntity> updateQuote(
            @PathVariable Long id,
            @RequestBody QuoteEntity quote) {
        return quoteService.getQuoteById(id)
                .map(existingQuote -> {
                    existingQuote.setQuoteDescription(quote.getQuoteDescription());
                    existingQuote.setValidUntil(quote.getValidUntil());
                    existingQuote.setAuthor(quote.getAuthor());
                    existingQuote.setSales(quote.getSales());
                    existingQuote.setPayment(quote.getPayment());
                    existingQuote.setTaxIsIncluded(quote.isTaxIsIncluded());
                    existingQuote.setShippingDate(quote.getShippingDate());
                    existingQuote.setShippingMethod(quote.getShippingMethod());
                    QuoteEntity updatedQuote = quoteService.saveQuote(existingQuote);
                    return ResponseEntity.ok(updatedQuote);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuote(@PathVariable Long id) {
        if (quoteService.getQuoteById(id).isPresent()) {
            quoteService.deleteQuoteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
