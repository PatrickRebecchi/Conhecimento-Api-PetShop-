package com.teste.conhecimento.dto.response;

import com.teste.conhecimento.entity.enums.Especie;
import com.teste.conhecimento.entity.enums.ServicoOferecido;
import com.teste.conhecimento.entity.enums.StatusAgendamento;
import org.hibernate.engine.spi.Status;

import java.time.LocalDateTime;

public record ServicoResponse(
        Long id,
        ServicoOferecido nomeServico,
        Double preco,
        LocalDateTime createAt,
        StatusAgendamento status,
        String observacoes,
        Long petId,
        String nomePet,
        Especie especie

) {}
