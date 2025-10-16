package com.currencySystem.virtus.controller;

import com.currencySystem.virtus.dto.*;
import com.currencySystem.virtus.model.Aluno;
import com.currencySystem.virtus.service.AlunoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alunos")
@RequiredArgsConstructor
public class AlunoController {

    private final AlunoService alunoService;

    /**
     * POST /api/alunos/cadastro
     * Cadastra um novo aluno no sistema
     * @param request Dados do aluno para cadastro
     * @return Dados do aluno cadastrado
     */
    @PostMapping("/cadastro")
    public ResponseEntity<AlunoResponse> cadastrar(@Valid @RequestBody AlunoRequest request) {
        AlunoResponse response = alunoService.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET /api/alunos/{id}
     * Busca dados de um aluno específico
     * @param id ID do aluno
     * @param authentication Dados de autenticação
     * @return Dados do aluno
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<AlunoResponse> buscarPorId(@PathVariable Long id, Authentication authentication) {
        Aluno alunoAutenticado = (Aluno) authentication.getPrincipal();
        if (!alunoAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        AlunoResponse response = alunoService.buscarPorIdDTO(id);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/alunos/{id}/extrato
     * Consulta extrato de transações do aluno
     * @param id ID do aluno
     * @param authentication Dados de autenticação
     * @return Lista de transações do aluno
     */
    @GetMapping("/{id}/extrato")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<List<TransacaoResponse>> consultarExtrato(@PathVariable Long id, Authentication authentication) {
        Aluno alunoAutenticado = (Aluno) authentication.getPrincipal();
        if (!alunoAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<TransacaoResponse> extrato = alunoService.consultarExtrato(id);
        return ResponseEntity.ok(extrato);
    }

    /**
     * POST /api/alunos/{id}/resgatar-vantagem
     * Resgata uma vantagem usando moedas virtuais
     * @param id ID do aluno
     * @param request Dados do resgate (ID da vantagem)
     * @param authentication Dados de autenticação
     * @return Dados do resgate realizado
     */
    @PostMapping("/{id}/resgatar-vantagem")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<ResgateVantagemResponse> trocarMoedas(
            @PathVariable Long id,
            @Valid @RequestBody ResgateVantagemRequest request,
            Authentication authentication
    ) {
        Aluno alunoAutenticado = (Aluno) authentication.getPrincipal();
        if (!alunoAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ResgateVantagemResponse response = alunoService.trocarMoedas(id, request.getVantagemId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET /api/alunos/{id}/resgates
     * Lista todos os resgates de vantagens do aluno
     * @param id ID do aluno
     * @param authentication Dados de autenticação
     * @return Lista de resgates realizados
     */
    @GetMapping("/{id}/resgates")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<List<ResgateVantagemResponse>> listarResgates(@PathVariable Long id, Authentication authentication) {
        Aluno alunoAutenticado = (Aluno) authentication.getPrincipal();
        if (!alunoAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<ResgateVantagemResponse> resgates = alunoService.listarResgates(id);
        return ResponseEntity.ok(resgates);
    }

    /**
     * GET /api/alunos/{id}/saldo
     * Consulta saldo de moedas virtuais do aluno
     * @param id ID do aluno
     * @param authentication Dados de autenticação
     * @return Saldo atual do aluno
     */
    @GetMapping("/{id}/saldo")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<Map<String, Integer>> consultarSaldo(@PathVariable Long id, Authentication authentication) {
        Aluno alunoAutenticado = (Aluno) authentication.getPrincipal();
        if (!alunoAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Integer saldo = alunoService.consultarSaldo(id);
        return ResponseEntity.ok(Map.of("saldo", saldo));
    }

    /**
     * PUT /api/alunos/{id}
     * Atualiza dados de um aluno
     * @param id ID do aluno
     * @param request Dados atualizados do aluno
     * @param authentication Dados de autenticação
     * @return Dados atualizados do aluno
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<AlunoResponse> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody AlunoUpdateRequest request,
            Authentication authentication
    ) {
        Aluno alunoAutenticado = (Aluno) authentication.getPrincipal();
        if (!alunoAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        AlunoResponse response = alunoService.atualizar(id, request);
        return ResponseEntity.ok(response);
    }
}
