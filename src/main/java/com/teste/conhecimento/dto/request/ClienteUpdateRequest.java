package com.teste.conhecimento.dto.request;

import jakarta.validation.constraints.Email;

public record ClienteUpdateRequest(
        String nome,
        String telefone,
        @Email(message = "Email inválido")
        String email

){
}
