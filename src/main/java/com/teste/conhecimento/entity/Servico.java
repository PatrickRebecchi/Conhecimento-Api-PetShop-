package com.teste.conhecimento.entity;

import com.teste.conhecimento.dto.request.ServicoRequest;
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

    @ManyToOne
    @JoinColumn(name = "servico_catalogo_id", nullable = false)
    private ServicoCatalogo servicoCatalogo;

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

    protected Servico() {}

    public Servico(ServicoRequest dto, ServicoCatalogo catalogo, Pet pet) {
        this.servicoCatalogo = catalogo;
        this.preco = dto.preco();
        this.observacoes = dto.observacao();
        this.pet = pet;
        this.status = StatusAgendamento.AGENDADO;
    }

    public void atualizarPreco(double novoPreco) {
        this.preco = novoPreco;
    }
}