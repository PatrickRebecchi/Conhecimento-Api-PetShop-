package com.teste.conhecimento.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ClienteControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void listarTodosClientes_deveRetornar200() throws Exception {
        mockMvc.perform(get("/cliente"))
                .andExpect(status().isOk());
    }

    @Test
    void buscarClientePorId_deveRetornar400_quandoIdForInvalido() throws Exception {
        mockMvc.perform(get("/cliente/abc"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void criarCliente() throws Exception{
        String email = "test" + UUID.randomUUID() + "@email.com";
        String json = """
                {
                  "nome": "Patrick",
                  "telefone": "11999999999",
                  "email": "%s"
                }
                """.formatted(email);

        mockMvc.perform(post("/cliente")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated());
        // isOk()  devolve 200 ( generico )
        // isCreated() devolve uma resposta mais certa, 201 (criado com sucesso)
    }

    @Test
    void naoDeveCadastrarClienteComEmailDuplicado() throws Exception{

        String json = """
                {
                  "nome": "Patrick",
                  "telefone": "11999999999",
                  "email": "patrickteste01@email.com"
                }
                """;
        mockMvc.perform(post("/cliente")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest());
    }
}