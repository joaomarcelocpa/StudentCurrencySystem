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
@Table(name = "alunos")
@PrimaryKeyJoinColumn(name = "usuario_id")
public class Aluno extends Usuario {

    @Column(nullable = false, length = 200)
    private String nome;

    @Column(nullable = false, unique = true, length = 200)
    private String email;

    @Column(nullable = false, unique = true, length = 11)
    private String cpf;

    @Column(nullable = false, length = 20)
    private String rg;

    @Column(nullable = false, length = 500)
    private String endereco;

    @Column(nullable = false)
    private Integer saldoMoedas = 0;

    @JsonIgnore
    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transacao> transacoesRecebidas = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ResgateVantagem> resgates = new ArrayList<>();

    public Aluno(String login, String senha, String nome, String email, String cpf, String rg, String endereco) {
        this.setLogin(login);
        this.setSenha(senha);
        this.setTipo(TipoUsuario.ALUNO);
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.rg = rg;
        this.endereco = endereco;
        this.saldoMoedas = 0;
        this.setAtivo(true);
    }

    @Override
    public void autenticar() {
        // Lógica de autenticação específica do aluno
        // Pode incluir validações adicionais, logs, etc.
    }

    /**
     * Notifica o aluno por email
     * @param mensagem Mensagem a ser enviada
     */
    public void notificarEmail(String mensagem) {
        // Implementação do envio de email seria feita aqui
        // Por enquanto, apenas um placeholder
        System.out.println("Email enviado para " + this.email + ": " + mensagem);
    }

    /**
     * Consulta o extrato de transações do aluno
     * @return Lista de transações recebidas
     */
    public List<Transacao> consultarExtrato() {
        return new ArrayList<>(this.transacoesRecebidas);
    }

    /**
     * Troca moedas por uma vantagem
     * @param vantagem Vantagem a ser resgatada
     * @return true se a troca foi bem-sucedida, false caso contrário
     */
    public boolean trocarMoedas(Vantagem vantagem) {
        if (this.saldoMoedas >= vantagem.getCustoMoedas()) {
            this.saldoMoedas -= vantagem.getCustoMoedas();
            return true;
        }
        return false;
    }

    /**
     * Adiciona moedas ao saldo do aluno
     * @param valor Quantidade de moedas a adicionar
     */
    public void adicionarMoedas(Integer valor) {
        if (valor > 0) {
            this.saldoMoedas += valor;
        }
    }

    /**
     * Remove moedas do saldo do aluno
     * @param valor Quantidade de moedas a remover
     * @return true se a remoção foi bem-sucedida, false caso contrário
     */
    public boolean removerMoedas(Integer valor) {
        if (valor > 0 && this.saldoMoedas >= valor) {
            this.saldoMoedas -= valor;
            return true;
        }
        return false;
    }
}
