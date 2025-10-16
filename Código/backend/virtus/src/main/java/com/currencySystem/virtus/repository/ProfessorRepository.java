package com.currencySystem.virtus.repository;

import com.currencySystem.virtus.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {

    Optional<Professor> findByLogin(String login);

    Optional<Professor> findByCpf(String cpf);

    boolean existsByCpf(String cpf);

    boolean existsByLogin(String login);
}
