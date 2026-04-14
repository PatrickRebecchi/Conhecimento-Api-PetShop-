package com.teste.conhecimento.controller;

import com.teste.conhecimento.dto.request.ClienteRequest;
import com.teste.conhecimento.dto.request.ClienteUpdateRequest;
import com.teste.conhecimento.dto.response.ClienteResponse;
import com.teste.conhecimento.dto.response.ClienteUpdateResponse;
import com.teste.conhecimento.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteService service;

    @GetMapping
    public ResponseEntity<Page<ClienteResponse>> listarTodosClientes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir){
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
        
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(service.obterTodosClientes(pageRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> buscarClientePorId(@PathVariable Long id){
        return ResponseEntity.ok(service.obterClientePorId(id));
    }

    @PostMapping
    public ResponseEntity<ClienteResponse> CriarCliente(@RequestBody @Valid ClienteRequest dto){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.criarCliente(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ClienteUpdateResponse> atualizarCliente(@PathVariable Long id, @RequestBody @Valid ClienteUpdateRequest dto){
        return ResponseEntity.ok(service.atualizarCliente(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> eccluirCliente(@PathVariable long id){
        service.excluirCliente(id);
        return ResponseEntity.ok(Map.of("Mensagem", "Cliente deletado com sucesso"));
    }
}
