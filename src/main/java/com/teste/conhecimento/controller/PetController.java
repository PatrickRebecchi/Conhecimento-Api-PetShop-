package com.teste.conhecimento.controller;

import com.teste.conhecimento.dto.request.PetRequest;
import com.teste.conhecimento.dto.response.PetResponse;
import com.teste.conhecimento.service.PetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pet")
public class PetController {

    @Autowired
    private PetService service;

    @GetMapping
    public ResponseEntity<List<PetResponse>>buscarPets(){
        return ResponseEntity.ok(service.buscarTodosPets());
    }

    @PostMapping
    public ResponseEntity<PetResponse> criarPet(@RequestBody @Valid PetRequest dto){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.criarPet(dto));
    }
}
