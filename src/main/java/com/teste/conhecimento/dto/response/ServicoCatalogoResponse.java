package com.teste.conhecimento.dto.response;

import com.teste.conhecimento.entity.ServicoCatalogo;

public record ServicoCatalogoResponse(
    long id,
    String nome,
    double preco,
    boolean ativo
) {
    public static ServicoCatalogoResponse toResponse(ServicoCatalogo servico) {
        return new ServicoCatalogoResponse(
            servico.getId(),
            servico.getNome(),
            servico.getPreco(),
            servico.isAtivo()
        );
    }
}