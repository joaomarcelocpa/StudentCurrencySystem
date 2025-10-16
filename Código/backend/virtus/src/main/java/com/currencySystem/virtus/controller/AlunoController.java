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

    @PostMapping("/cadastro")
    public ResponseEntity<AlunoResponse> cadastrar(@Valid @RequestBody AlunoRequest request) {
        AlunoResponse response = alunoService.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<AlunoResponse> buscarPorId(@PathVariable Long id, Authentication authentication) {
        // Aluno só pode ver seus próprios dados
        Aluno alunoAutenticado = (Aluno) authentication.getPrincipal();
        if (!alunoAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        AlunoResponse response = alunoService.buscarPorIdDTO(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/extrato")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<List<TransacaoResponse>> consultarExtrato(@PathVariable Long id, Authentication authentication) {
        // Aluno só pode ver seu próprio extrato
        Aluno alunoAutenticado = (Aluno) authentication.getPrincipal();
        if (!alunoAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<TransacaoResponse> extrato = alunoService.consultarExtrato(id);
        return ResponseEntity.ok(extrato);
    }

    @PostMapping("/{id}/resgatar-vantagem")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<ResgateVantagemResponse> trocarMoedas(
            @PathVariable Long id,
            @Valid @RequestBody ResgateVantagemRequest request,
            Authentication authentication
    ) {
        // Aluno só pode resgatar vantagens para si mesmo
        Aluno alunoAutenticado = (Aluno) authentication.getPrincipal();
        if (!alunoAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ResgateVantagemResponse response = alunoService.trocarMoedas(id, request.getVantagemId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}/resgates")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<List<ResgateVantagemResponse>> listarResgates(@PathVariable Long id, Authentication authentication) {
        // Aluno só pode ver seus próprios resgates
        Aluno alunoAutenticado = (Aluno) authentication.getPrincipal();
        if (!alunoAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<ResgateVantagemResponse> resgates = alunoService.listarResgates(id);
        return ResponseEntity.ok(resgates);
    }

    @GetMapping("/{id}/saldo")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<Map<String, Integer>> consultarSaldo(@PathVariable Long id, Authentication authentication) {
        // Aluno só pode ver seu próprio saldo
        Aluno alunoAutenticado = (Aluno) authentication.getPrincipal();
        if (!alunoAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Integer saldo = alunoService.consultarSaldo(id);
        return ResponseEntity.ok(Map.of("saldo", saldo));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<AlunoResponse> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody AlunoUpdateRequest request,
            Authentication authentication
    ) {
        // Aluno só pode atualizar seus próprios dados
        Aluno alunoAutenticado = (Aluno) authentication.getPrincipal();
        if (!alunoAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        AlunoResponse response = alunoService.atualizar(id, request);
        return ResponseEntity.ok(response);
    }
}
