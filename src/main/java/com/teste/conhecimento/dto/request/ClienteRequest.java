package com.teste.conhecimento.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ClienteRequest (
        @NotBlank(message = "Nome obrigatório")
        String nome,
        String telefone,
        @NotBlank(message = "Email obrigatório")
        @Email(message = "Email inválido")
        String email
){


}
