package com.teste.conhecimento.dto.request;

import com.teste.conhecimento.entity.enums.Especie;
import com.teste.conhecimento.entity.enums.Sexo;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PetRequest (
        @NotBlank (message = "Nome obrigatório")
        String nome,
        String raca,
        @Enumerated(EnumType.STRING)
        Especie tipo,
        double peso,
        @Enumerated(EnumType.STRING)
        Sexo sexo,

        @NotNull(message = "Cliente obrigatório")
        Long clienteId
){



}
