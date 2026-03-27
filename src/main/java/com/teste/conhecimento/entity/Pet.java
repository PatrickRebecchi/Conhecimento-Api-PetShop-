package com.teste.conhecimento.entity;

import com.teste.conhecimento.entity.enums.Especie;
import com.teste.conhecimento.entity.enums.Sexo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@Entity
@Table(name = "pets")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank(message = "Nome obrigatorio")
    private String nome;
    private String raca;
    private int idade;
    @Enumerated(EnumType.STRING)
    private Especie especie;
    private double peso;
    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL)
    private List<Servico> servicos;
}
