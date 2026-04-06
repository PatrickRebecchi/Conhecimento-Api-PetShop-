package com.teste.conhecimento.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ServicoCatalogoRequest(
    @NotBlank(message = "Nome é obrigatório")
    String nome,
    
    @NotNull(message = "Preço é obrigatório")
    @Positive(message = "Preço deve ser positivo")
    double preco
) {}