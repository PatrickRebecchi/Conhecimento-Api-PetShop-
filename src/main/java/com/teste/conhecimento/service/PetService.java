package com.teste.conhecimento.service;

import com.teste.conhecimento.dto.request.PetRequest;
import com.teste.conhecimento.dto.response.PetResponse;
import com.teste.conhecimento.entity.Cliente;
import com.teste.conhecimento.entity.Pet;
import com.teste.conhecimento.exception.BusinessException;
import com.teste.conhecimento.repository.ClienteRepository;
import com.teste.conhecimento.repository.PetRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PetRepository repository;

    @Transactional
    public List<PetResponse> buscarTodosPets() {
        return converteDadosPet(repository.findAll());
    }

    private List<PetResponse> converteDadosPet(List<Pet> pets){
        return pets.stream()
                .map(p -> new PetResponse(
                        p.getId(),
                        p.getNome(),
                        p.getRaca(),
                        p.getIdade(),
                        p.getEspecie(),
                        p.getPeso(),
                        p.getSexo(),
                        p.getCliente().getId(),
                        p.getCliente().getNome()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public  PetResponse criarPet(PetRequest dto) {
        Cliente cliente = clienteRepository.findById(dto.clienteId())
                .orElseThrow(() -> new BusinessException("Cliente não encontrado"));

        Pet pet = new Pet(dto);
       pet.setCliente(cliente);

        pet = repository.save(pet);

       return new PetResponse(pet.getId(),
               pet.getNome(),
               pet.getRaca(),
               pet.getIdade(),
               pet.getEspecie(),
               pet.getPeso(),
               pet.getSexo(),
               cliente.getId(),
               cliente.getNome());
    }

    public PetResponse buscarPorId(Long id) {
        Pet pet = repository.findById(id)
                .orElseThrow(() -> new BusinessException("Pet não encontrado"));

        return new PetResponse(
                pet.getId(),
                pet.getNome(),
                pet.getRaca(),
                pet.getIdade(),
                pet.getEspecie(),
                pet.getPeso(),
                pet.getSexo(),
                pet.getCliente().getId(),
                pet.getCliente().getNome()
        );
    }
}
