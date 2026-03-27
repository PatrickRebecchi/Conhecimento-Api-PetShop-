package com.teste.conhecimento.entity.enums;

public enum ServicoOferecido {

    BANHO("Banho"),
    TOSA("Tosa"),
    CORTE_UNHA("Corte de unha"),
    VACINACAO("Vacinação"),
    CONSULTA("Consulta");

    private final String descricao;

    ServicoOferecido(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}