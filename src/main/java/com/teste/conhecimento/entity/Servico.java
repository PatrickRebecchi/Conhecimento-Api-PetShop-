package com.teste.conhecimento.entity;

import com.teste.conhecimento.entity.enums.ServicoOferecido;
import com.teste.conhecimento.entity.enums.StatusAgendamento;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "servicos")
public class Servico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Enumerated(EnumType.STRING)
    private ServicoOferecido nomeServico;
    @NotNull
    private double preco;
    @CreationTimestamp
    private LocalDateTime createAt;
    @Enumerated(EnumType.STRING)
    private StatusAgendamento status = StatusAgendamento.AGENDADO;
    private String observacoes;


    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

}
