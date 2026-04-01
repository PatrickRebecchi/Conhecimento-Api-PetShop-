package com.teste.conhecimento.controller;

import com.teste.conhecimento.dto.request.ServicoRequest;
import com.teste.conhecimento.dto.response.ServicoResponse;
import com.teste.conhecimento.service.ServicoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servico")
public class ServicoController {

    @Autowired
    private ServicoService service;

    @GetMapping
    public ResponseEntity<List<ServicoResponse>> buscarServico(){
        return ResponseEntity.ok(service.buscarServico());
    }

    @PostMapping
    public ResponseEntity<ServicoResponse> criarServico(@RequestBody @Valid ServicoRequest dto){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.criarServico(dto));
    }
}
