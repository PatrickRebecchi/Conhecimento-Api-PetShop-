package com.teste.conhecimento.dto.response;

public record ClienteUpdateResponse(
        Long id,
        String nome,
        String telefone,
        String email,
        String mensagem
) {}