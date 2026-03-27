package com.teste.conhecimento.dto.response;

import jakarta.validation.constraints.Email;

public record ClienteResponse(
        Long id,
        String nome,
        String telefone,
        String email,
        int quantidadePets
) {}