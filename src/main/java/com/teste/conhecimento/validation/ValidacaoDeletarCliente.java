package com.teste.conhecimento.validation;


import com.teste.conhecimento.exception.BusinessException;
import com.teste.conhecimento.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ValidacaoDeletarCliente implements ValidacaoClienteDeletar {

    @Autowired
    private ClienteRepository repository;

    @Override
    public void validar(Long id) {

        if(!repository.existsById(id)){
            throw new BusinessException("Cliente não encontrado");
        }

    }
}
