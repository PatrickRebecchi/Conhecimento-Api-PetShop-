package com.teste.conhecimento.dto.request;

import com.teste.conhecimento.entity.enums.ServicoOferecido;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ServicoRequest(
        @NotNull
        @Enumerated(EnumType.STRING)
        ServicoOferecido servico,
        @PositiveOrZero(message = "Valor não pode ser negativo")
        double preco,
        String observacao,
        @NotNull(message = "Pet é obrigatório")
        long petId
) {





}
