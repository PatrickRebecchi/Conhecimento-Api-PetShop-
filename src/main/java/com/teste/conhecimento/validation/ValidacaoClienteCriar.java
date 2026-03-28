package com.teste.conhecimento.validation;

import com.teste.conhecimento.dto.request.ClienteRequest;
import com.teste.conhecimento.exception.BusinessException;
import com.teste.conhecimento.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ValidacaoClienteCriar  implements ValidacaoCriarCliente{
    @Autowired
    private ClienteRepository repository;

    @Override
    public void validar(ClienteRequest dto){
        if (repository.existsByEmail(dto.email())){
            throw new BusinessException("Email já cadastrado (Validacao)");
        }
    }
}
