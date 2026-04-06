package com.teste.conhecimento.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ServicoRequest(
        @NotNull(message = "Serviço é obrigatório")
        Long servicoCatalogoId,
        
        @PositiveOrZero(message = "Valor não pode ser negativo")
        double preco,
        
        String observacao,
        
        @NotNull(message = "Pet é obrigatório")
        long petId
) {}