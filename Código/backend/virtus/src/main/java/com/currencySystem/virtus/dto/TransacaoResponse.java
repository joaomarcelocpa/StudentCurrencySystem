package com.currencySystem.virtus.dto;

import com.currencySystem.virtus.model.Transacao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransacaoResponse {

    private Long id;
    private Long professorId;
    private String professorNome;
    private Long alunoId;
    private String alunoNome;
    private Integer valor;
    private String motivo;
    private LocalDateTime dataHora;

    public TransacaoResponse(Transacao transacao) {
        this.id = transacao.getId();
        this.professorId = transacao.getProfessor().getId();
        this.professorNome = transacao.getProfessor().getNome();
        this.alunoId = transacao.getAluno().getId();
        this.alunoNome = transacao.getAluno().getNome();
        this.valor = transacao.getValor();
        this.motivo = transacao.getMotivo();
        this.dataHora = transacao.getDataHora();
    }

    public static TransacaoResponse fromEntity(Transacao transacao) {
        return new TransacaoResponse(transacao);
    }
}
