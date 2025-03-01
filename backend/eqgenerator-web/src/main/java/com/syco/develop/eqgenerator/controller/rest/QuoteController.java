package com.syco.develop.eqgenerator.controller.rest;

import com.google.gson.Gson;
import com.syco.develop.eqgenerator.model.dto.QuoteDTO;
import com.syco.develop.eqgenerator.model.jpa.QuoteEntity;
import com.syco.develop.eqgenerator.service.QuoteService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/quotes")
@Slf4j
public class QuoteController {

    @Autowired
    private QuoteService quoteService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<QuoteDTO>> getAllQuotes() {
        List<QuoteEntity> quotes = quoteService.getAllQuotes();
        List<QuoteDTO> quoteDTOs = quotes.stream()
                .map(quote -> modelMapper.map(quote, QuoteDTO.class))
                .toList();
        return ResponseEntity.ok(quoteDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuoteDTO> getQuoteById(@PathVariable Long id) {
        return quoteService.getQuoteById(id)
                .map(quote -> ResponseEntity.ok(modelMapper.map(quote, QuoteDTO.class)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<QuoteDTO> createQuote(@RequestBody String body) {
        log.info("Received payload: {}", body);
        Gson gson = new Gson();
        QuoteDTO quoteDTO = gson.fromJson(body, QuoteDTO.class);
        QuoteEntity savedQuote = quoteService.saveQuote(quoteDTO);
        QuoteDTO savedQuoteDTO = modelMapper.map(savedQuote, QuoteDTO.class);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedQuoteDTO.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedQuoteDTO);
    }


    @PutMapping("/{id}")
    public ResponseEntity<QuoteDTO> updateQuote(@PathVariable Long id, @RequestBody QuoteDTO quoteDTO) {
        return quoteService.getQuoteById(id)
                .map(existingQuote -> {
                    existingQuote.setRemark(quoteDTO.getRemark());
                    existingQuote.setValidUntil(quoteDTO.getValidUntil());
                    existingQuote.setAuthor(quoteDTO.getAuthor());
                    existingQuote.setSales(quoteDTO.getSales());
                    existingQuote.setPayment(quoteDTO.getPayment());
                    existingQuote.setTaxIsIncluded(quoteDTO.isTaxIsIncluded());
                    existingQuote.setShippingDate(quoteDTO.getShippingDate());
                    existingQuote.setShippingMethod(quoteDTO.getShippingMethod());
                    QuoteEntity updatedQuote = quoteService.saveQuote(existingQuote);
                    QuoteDTO updatedQuoteDTO = modelMapper.map(updatedQuote, QuoteDTO.class);
                    return ResponseEntity.ok(updatedQuoteDTO);
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
