package com.teste.conhecimento.entity.enums;

public enum Especie {

    CACHORRO("Cachorro"),
    GATO("Gato"),
    PASSARO("Pássaro");

    private final String descricao;

    Especie(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}