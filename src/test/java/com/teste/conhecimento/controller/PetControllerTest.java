package com.teste.conhecimento.controller;

import org.hibernate.cfg.Environment;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PetControllerTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    void listarTodosClientesPet_deveRetornar200() throws Exception {
        mockMvc.perform(get("/pet"))
                .andExpect(status().isOk());
    }

    @Test
    void buscarPetPorId_deveRetornar400_quandoIdForInvalido() throws Exception{
        mockMvc.perform(get("/pet/1234"))
                .andExpect(status().isBadRequest());
    }


    @Test
    void criarPet() throws Exception {
        String nome = "Pet_" + UUID.randomUUID().toString().substring(0, 8);

        String json = """
                {
                  "nome": "%s",
                  "raca": "SRD",
                  "idade": 3,
                  "tipo": "CACHORRO",
                  "peso": 25.5,
                  "sexo": "MACHO",
                  "clienteId": 1
                }
                """.formatted(nome);

        mockMvc.perform(post("/pet")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated());
    }

}