package com.teste.conhecimento.dto.response;

import com.teste.conhecimento.entity.enums.StatusAgendamento;

import java.time.LocalDateTime;

public record ServicoResponse(
        Long id,
        String nomeServico,
        Double preco,
        LocalDateTime createAt,
        StatusAgendamento status,
        String observacoes,
        Long petId,
        String nomePet,
        String especie
) {}