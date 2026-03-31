package com.teste.conhecimento.dto.request;

import com.teste.conhecimento.entity.enums.Especie;
import com.teste.conhecimento.entity.enums.Sexo;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;

public record PetRequest (
        @Size(max = 50)
        @NotBlank (message = "Nome obrigatório")
        String nome,
        String raca,
        @Min(value = 0, message = "Idade não pode ser negativa")
        int idade,
        Especie tipo,
        @Positive(message = "Peso deve ser positivo")
        double peso,
        Sexo sexo,

        @NotNull(message = "Cliente obrigatório")
        Long clienteId
){

}
