package com.teste.conhecimento.controller;

import com.teste.conhecimento.dto.request.ServicoCatalogoRequest;
import com.teste.conhecimento.dto.response.ServicoCatalogoResponse;
import com.teste.conhecimento.service.ServicoCatalogoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servico-catalogo")
public class ServicoCatalogoController {

    private final ServicoCatalogoService service;

    public ServicoCatalogoController(ServicoCatalogoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ServicoCatalogoResponse>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<ServicoCatalogoResponse>> findAtivos() {
        return ResponseEntity.ok(service.findAtivos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServicoCatalogoResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<ServicoCatalogoResponse> create(@Valid @RequestBody ServicoCatalogoRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServicoCatalogoResponse> update(@PathVariable Long id, @Valid @RequestBody ServicoCatalogoRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}