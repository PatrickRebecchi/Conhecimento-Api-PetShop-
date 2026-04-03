package com.teste.conhecimento.validation;

import com.teste.conhecimento.dto.request.ClienteRequest;
import com.teste.conhecimento.dto.request.ClienteUpdateRequest;

public interface ValidacaoAtualizarCliente {
    void validar(ClienteUpdateRequest dto);
}
