package com.teste.conhecimento.repository;

import com.teste.conhecimento.entity.ServicoCatalogo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicoCatalogoRepository extends JpaRepository<ServicoCatalogo, Long> {
    List<ServicoCatalogo> findByAtivoTrue();
}