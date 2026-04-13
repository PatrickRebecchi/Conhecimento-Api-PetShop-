package com.teste.conhecimento.service;

import com.teste.conhecimento.dto.request.ClienteRequest;
import com.teste.conhecimento.dto.request.ClienteUpdateRequest;
import com.teste.conhecimento.dto.response.ClienteResponse;
import com.teste.conhecimento.dto.response.ClienteUpdateResponse;
import com.teste.conhecimento.entity.Cliente;
import com.teste.conhecimento.exception.BusinessException;
import com.teste.conhecimento.repository.ClienteRepository;
import com.teste.conhecimento.validation.ValidacaoClienteAtualizar;
import com.teste.conhecimento.validation.ValidacaoClienteCriar;
import com.teste.conhecimento.validation.ValidacaoClienteDeletar;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository repository;

    @Autowired
    private List<ValidacaoClienteCriar> validacao;
    @Autowired
    private List<ValidacaoClienteAtualizar> validacaoClienteAtualizar;
    @Autowired
    private List<ValidacaoClienteDeletar> validacaoClienteDeletar;


    public Page<ClienteResponse> obterTodosClientes(PageRequest pageRequest) {
        Page<Cliente> clientes = repository.findAll(pageRequest);
        return clientes.map(c -> new ClienteResponse(
                c.getId(),
                c.getNome(),
                c.getTelefone(),
                c.getEmail(),
                c.getPetList() != null ? c.getPetList().size() : 0
        ));
    }

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

    @Transactional
    public ClienteUpdateResponse atualizarCliente(Long id, ClienteUpdateRequest dto) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new BusinessException("Cliente não encontrado."));

        validacaoClienteAtualizar.forEach(c -> c.validar(dto));
        boolean atualizado = false;

        if (dto.nome() != null && !dto.nome().equals(cliente.getNome())) {
            cliente.setNome(dto.nome());
            atualizado = true;
        }
        if (dto.telefone() != null && !dto.telefone().equals(cliente.getTelefone())) {
            cliente.setTelefone(dto.telefone());
            atualizado = true;
        }
        if (dto.email() != null && !dto.email().equals(cliente.getEmail())) {
            cliente.setEmail(dto.email());
            atualizado = true;
        }

        return new ClienteUpdateResponse(
                cliente.getId(),
                cliente.getNome(),
                cliente.getTelefone(),
                cliente.getEmail(),
                "Cliente atualizado com sucesso!"
        );
    }

    public void excluirCliente(long id) {
        validacaoClienteDeletar.forEach(c -> c.validar(id));
        repository.deleteById(id);
    }
}
