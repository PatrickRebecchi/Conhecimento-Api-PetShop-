package com.teste.conhecimento.service;

import com.teste.conhecimento.dto.request.ClienteRequest;
import com.teste.conhecimento.dto.response.ClienteResponse;
import com.teste.conhecimento.entity.Cliente;
import com.teste.conhecimento.exception.BusinessException;
import com.teste.conhecimento.repository.ClienteRepository;
import com.teste.conhecimento.validation.ValidacaoClienteCriar;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository repository;

    @Autowired
    private List<ValidacaoClienteCriar> validacao;

    public List<ClienteResponse> obterTodosClientes() {
        return converteDados(repository.findAll());
    }

    public ClienteResponse obterClientePorId(Long id) {
        Cliente c = repository.findById(id)
                .orElseThrow(() -> new BusinessException("Cliente não encontrado"));

        return new ClienteResponse(
                c.getId(),
                c.getNome(),
                c.getTelefone(),
                c.getEmail(),
                c.getPetList() != null ? c.getPetList().size() : 0
        );
    }

    private List<ClienteResponse> converteDados(List<Cliente> clientes){
        return clientes.stream()
                .map(c -> new ClienteResponse(
                        c.getId(),
                        c.getNome(),
                        c.getTelefone(),
                        c.getEmail(),
                        c.getPetList().size()))
                .collect(Collectors.toList());
    }

    @Transactional
    public ClienteResponse criarCliente(ClienteRequest dto) {

        validacao.forEach(c -> c.validar(dto));
        Cliente cliente = new Cliente(dto);

        cliente = repository.save(cliente);

        return new ClienteResponse(
                cliente.getId(),
                cliente.getNome(),
                cliente.getTelefone(),
                cliente.getEmail(),
                0
        );
    }
}
