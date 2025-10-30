package com.currencySystem.virtus.repository;

import com.currencySystem.virtus.model.Aluno;
import com.currencySystem.virtus.model.Instituicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    Optional<Aluno> findByLogin(String login);

    Optional<Aluno> findByEmail(String email);

    Optional<Aluno> findByCpf(String cpf);

    boolean existsByEmail(String email);

    boolean existsByCpf(String cpf);

    boolean existsByLogin(String login);

    // Buscar alunos por uma lista de instituições
    List<Aluno> findByInstituicaoIn(List<Instituicao> instituicoes);

    // Buscar alunos de uma instituição específica
    List<Aluno> findByInstituicao(Instituicao instituicao);
}
