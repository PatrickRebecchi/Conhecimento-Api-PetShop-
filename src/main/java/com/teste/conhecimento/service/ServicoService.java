package com.teste.conhecimento.service;

import com.teste.conhecimento.dto.request.ServicoRequest;
import com.teste.conhecimento.dto.response.ServicoResponse;
import com.teste.conhecimento.entity.Pet;
import com.teste.conhecimento.entity.Servico;
import com.teste.conhecimento.exception.BusinessException;
import com.teste.conhecimento.repository.PetRepository;
import com.teste.conhecimento.repository.ServicoRepository;
import jakarta.validation.Valid;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicoService {
    @Autowired
    private PetRepository petRepository;

    @Autowired
    private ServicoRepository repository;

    public List<ServicoResponse> buscarServico() {
    return converteDadosServico(repository.findAll());
    }

    private List<ServicoResponse> converteDadosServico(List<Servico> servicos){
        return servicos.stream()
                .map(s -> new ServicoResponse(
                        s.getId(),
                        s.getNomeServico(),
                        s.getPreco(),
                        s.getCreateAt(),
                        s.getStatus(),
                        s.getObservacoes(),
                        s.getPet().getId(),
                        s.getPet().getNome(),
                        s.getPet().getEspecie()
                ))
                .toList();
    }

    public ServicoResponse criarServico(ServicoRequest dto) {
        Pet pet = petRepository.findById(dto.petId())
                .orElseThrow(() -> new BusinessException("Pet não encontrado"));

        Servico servico = new Servico(dto, pet);

        servico = repository.save(servico);

        return new ServicoResponse(servico.getId(),
                servico.getNomeServico(),
                servico.getPreco(),
                servico.getCreateAt(),
                servico.getStatus(),
                servico.getObservacoes(),
                servico.getPet().getId(),
                servico.getPet().getNome(),
                servico.getPet().getEspecie());

    }
}

