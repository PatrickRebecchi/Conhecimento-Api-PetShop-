package com.teste.conhecimento.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "servico_catalogo")
public class ServicoCatalogo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private double preco;

    @Column(nullable = false)
    private boolean ativo = true;

    protected ServicoCatalogo() {}

    public ServicoCatalogo(String nome, double preco) {
        this.nome = nome;
        this.preco = preco;
        this.ativo = true;
    }
}