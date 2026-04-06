package com.teste.conhecimento.service;

import com.teste.conhecimento.dto.request.ServicoCatalogoRequest;
import com.teste.conhecimento.dto.response.ServicoCatalogoResponse;
import com.teste.conhecimento.entity.ServicoCatalogo;
import com.teste.conhecimento.repository.ServicoCatalogoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ServicoCatalogoService {

    private final ServicoCatalogoRepository repository;

    public ServicoCatalogoService(ServicoCatalogoRepository repository) {
        this.repository = repository;
    }

    public List<ServicoCatalogoResponse> findAll() {
        return repository.findAll().stream()
                .map(ServicoCatalogoResponse::toResponse)
                .toList();
    }

    public List<ServicoCatalogoResponse> findAtivos() {
        return repository.findByAtivoTrue().stream()
                .map(ServicoCatalogoResponse::toResponse)
                .toList();
    }

    public ServicoCatalogoResponse findById(Long id) {
        ServicoCatalogo servico = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        return ServicoCatalogoResponse.toResponse(servico);
    }

    @Transactional
    public ServicoCatalogoResponse create(ServicoCatalogoRequest request) {
        ServicoCatalogo servico = new ServicoCatalogo(request.nome(), request.preco());
        servico = repository.save(servico);
        return ServicoCatalogoResponse.toResponse(servico);
    }

    @Transactional
    public ServicoCatalogoResponse update(Long id, ServicoCatalogoRequest request) {
        ServicoCatalogo servico = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        servico.setNome(request.nome());
        servico.setPreco(request.preco());
        servico = repository.save(servico);
        return ServicoCatalogoResponse.toResponse(servico);
    }

    @Transactional
    public void delete(Long id) {
        ServicoCatalogo servico = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        servico.setAtivo(false);
        repository.save(servico);
    }
}