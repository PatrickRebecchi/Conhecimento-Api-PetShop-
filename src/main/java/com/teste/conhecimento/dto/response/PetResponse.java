package com.teste.conhecimento.dto.response;

public record PetResponse(
        Long id,
        String nome,
        String raca,
        int idade,
        String especie,
        double peso,
        String sexo,
        Long clienteId,
        String nomeCliente
) {}