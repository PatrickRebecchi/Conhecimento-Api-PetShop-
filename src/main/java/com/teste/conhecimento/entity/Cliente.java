package com.teste.conhecimento.entity;

import com.teste.conhecimento.dto.request.ClienteRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "clientes")
public class Cliente {
    protected Cliente() {
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank(message = "Nome obrigatorio")
    private String nome;
    private String telefone;
    @Email
    @NotBlank(message = "Email obrigatorio")
    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private List<Pet> petList;


    public Cliente(ClienteRequest dto){
        this.nome = dto.nome();
        this.telefone = dto.telefone();
        this.email = dto.email();
        this.petList = new ArrayList<>();
    }
}
