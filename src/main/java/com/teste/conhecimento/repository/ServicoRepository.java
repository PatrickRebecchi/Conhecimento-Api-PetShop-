package com.teste.conhecimento.repository;

import com.teste.conhecimento.entity.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicoRepository extends JpaRepository<Servico, Long> {
}
