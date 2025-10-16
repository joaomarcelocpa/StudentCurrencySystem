package com.currencySystem.virtus.dto;

import com.currencySystem.virtus.model.Professor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfessorResponse {

    private Long id;
    private String login;
    private String nome;
    private String cpf;
    private String departamento;
    private Integer saldoMoedas;
    private Boolean ativo;

    public ProfessorResponse(Professor professor) {
        this.id = professor.getId();
        this.login = professor.getLogin();
        this.nome = professor.getNome();
        this.cpf = professor.getCpf();
        this.departamento = professor.getDepartamento();
        this.saldoMoedas = professor.getSaldoMoedas();
        this.ativo = professor.getAtivo();
    }

    public static ProfessorResponse fromEntity(Professor professor) {
        return new ProfessorResponse(professor);
    }
}
