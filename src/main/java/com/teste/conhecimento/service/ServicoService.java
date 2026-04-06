package com.teste.conhecimento.service;

import com.teste.conhecimento.dto.request.ServicoRequest;
import com.teste.conhecimento.dto.response.ServicoResponse;
import com.teste.conhecimento.entity.Pet;
import com.teste.conhecimento.entity.Servico;
import com.teste.conhecimento.entity.ServicoCatalogo;
import com.teste.conhecimento.exception.BusinessException;
import com.teste.conhecimento.repository.PetRepository;
import com.teste.conhecimento.repository.ServicoCatalogoRepository;
import com.teste.conhecimento.repository.ServicoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {
    @Autowired
    private PetRepository petRepository;

    @Autowired
    private ServicoRepository repository;

    @Autowired
    private ServicoCatalogoRepository servicoCatalogoRepository;

    @Transactional
    public List<ServicoResponse> buscarServico() {
        return converteDadosServico(repository.findAll());
    }

    private List<ServicoResponse> converteDadosServico(List<Servico> servicos) {
        return servicos.stream()
                .map(s -> new ServicoResponse(
                        s.getId(),
                        s.getServicoCatalogo().getNome(),
                        s.getPreco(),
                        s.getCreateAt(),
                        s.getStatus(),
                        s.getObservacoes(),
                        s.getPet().getId(),
                        s.getPet().getNome(),
                        s.getPet().getEspecie() != null ? s.getPet().getEspecie().name() : null
                ))
                .toList();
    }

    @Transactional
    public ServicoResponse criarServico(ServicoRequest dto) {
        Pet pet = petRepository.findById(dto.petId())
                .orElseThrow(() -> new BusinessException("Pet não encontrado"));

        ServicoCatalogo catalogo = servicoCatalogoRepository.findById(dto.servicoCatalogoId())
                .orElseThrow(() -> new BusinessException("Serviço do catálogo não encontrado"));

        Servico servico = new Servico(dto, catalogo, pet);
        servico = repository.save(servico);

        return new ServicoResponse(servico.getId(),
                servico.getServicoCatalogo().getNome(),
                servico.getPreco(),
                servico.getCreateAt(),
                servico.getStatus(),
                servico.getObservacoes(),
                servico.getPet().getId(),
                servico.getPet().getNome(),
                servico.getPet().getEspecie() != null ? servico.getPet().getEspecie().name() : null);
    }
}