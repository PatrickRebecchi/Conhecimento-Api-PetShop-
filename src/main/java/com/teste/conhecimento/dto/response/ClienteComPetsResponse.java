package com.teste.conhecimento.dto.response;

import java.util.List;

public record ClienteComPetsResponse(
        Long id,
        String nome,
        String telefone,
        String email,
        List<PetResumeResponse> pets
) {
}
