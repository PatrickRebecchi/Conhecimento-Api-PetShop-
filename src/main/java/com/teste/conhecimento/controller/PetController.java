package com.teste.conhecimento.controller;

import com.teste.conhecimento.dto.response.PetResponse;
import com.teste.conhecimento.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pet")
public class PetController {

    @Autowired
    private PetService service;

    @GetMapping
    public ResponseEntity<PetResponse> buscarTodosPets(){
        return ResponseEntity.ok(service.buscarTodosPets());
    }
}
