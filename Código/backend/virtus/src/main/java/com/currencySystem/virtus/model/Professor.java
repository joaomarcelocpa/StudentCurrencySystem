package com.currencySystem.virtus.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "professores")
@PrimaryKeyJoinColumn(name = "usuario_id")
public class Professor extends Usuario {

    @Column(nullable = false, length = 200)
    private String nome;

    @Column(nullable = false, unique = true, length = 11)
    private String cpf;

    @Column(nullable = false, length = 200)
    private String departamento;

    @Column(nullable = false)
    private Integer saldoMoedas = 1000; 

    @JsonIgnore
    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transacao> transacoesEnviadas = new ArrayList<>();

    public Professor(String login, String senha, String nome, String cpf, String departamento) {
        this.setLogin(login);
        this.setSenha(senha);
        this.setTipo(TipoUsuario.PROFESSOR);
        this.nome = nome;
        this.cpf = cpf;
        this.departamento = departamento;
        this.saldoMoedas = 1000;
        this.setAtivo(true);
    }

    @Override
    public void autenticar() {
        // Lógica de autenticação específica do professor
        // Pode incluir validações adicionais, logs, etc.
    }

    public List<Transacao> consultarExtrato() {
        return new ArrayList<>(this.transacoesEnviadas);
    }


    public Transacao enviarMoedas(Aluno aluno, Integer valor, String motivo) {
        if (valor <= 0) {
            throw new IllegalArgumentException("O valor deve ser maior que zero");
        }

        if (this.saldoMoedas < valor) {
            throw new IllegalStateException("Saldo insuficiente para realizar a transação");
        }

        this.saldoMoedas -= valor;

        aluno.adicionarMoedas(valor);

        Transacao transacao = new Transacao();
        transacao.setProfessor(this);
        transacao.setAluno(aluno);
        transacao.setValor(valor);
        transacao.setMotivo(motivo);

        this.transacoesEnviadas.add(transacao);
        aluno.getTransacoesRecebidas().add(transacao);

        aluno.notificarEmail("Você recebeu " + valor + " moedas do professor " +
                            this.nome + ". Motivo: " + motivo);

        return transacao;
    }

    public void creditarMoedasSemestral(Integer valor) {
        if (valor > 0) {
            this.saldoMoedas += valor;
        }
    }

    public void resetarSaldoSemestral() {
        this.saldoMoedas = 1000;
    }

    public boolean temSaldoSuficiente(Integer valor) {
        return this.saldoMoedas >= valor;
    }
}
