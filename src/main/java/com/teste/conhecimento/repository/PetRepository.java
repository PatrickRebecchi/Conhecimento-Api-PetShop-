package com.teste.conhecimento.repository;

import com.teste.conhecimento.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Long> {
}
