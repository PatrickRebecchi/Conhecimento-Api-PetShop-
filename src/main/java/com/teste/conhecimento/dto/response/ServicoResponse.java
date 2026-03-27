package com.teste.conhecimento.dto.response;

import java.time.LocalDateTime;

public record ServicoResponse(
        Long id,
        String nomeServico,
        Double preco,
        LocalDateTime createAt,
        String status,
        String observacoes,
        Long petId,
        String nomePet,
        String especie

) {}
