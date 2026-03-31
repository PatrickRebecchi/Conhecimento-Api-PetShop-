package com.teste.conhecimento.dto.response;

import com.teste.conhecimento.entity.enums.Especie;
import com.teste.conhecimento.entity.enums.Sexo;

public record PetResponse(
        Long id,
        String nome,
        String raca,
        int idade,
        Especie especie,
        double peso,
        Sexo sexo,
        Long clienteId,
        String nomeCliente
) {}