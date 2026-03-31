package com.teste.conhecimento.controller;

import com.teste.conhecimento.dto.request.ClienteRequest;
import com.teste.conhecimento.dto.response.ClienteResponse;
import com.teste.conhecimento.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteService servico;

    @GetMapping
    public ResponseEntity<List<ClienteResponse>> listarTodosClientes(){
        return ResponseEntity.ok(servico.obterTodosClientes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> buscarClientePorId(@PathVariable Long id){
        return ResponseEntity.ok(servico.obterClientePorId(id));
    }

    @PostMapping
    public ResponseEntity<ClienteResponse> CriarCliente(@RequestBody @Valid ClienteRequest dto){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(servico.criarCliente(dto));
    }
}
