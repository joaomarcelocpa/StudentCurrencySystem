package com.currencySystem.virtus.controller;

import com.currencySystem.virtus.dto.*;
import com.currencySystem.virtus.model.Professor;
import com.currencySystem.virtus.service.ProfessorService;
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
@RequestMapping("/api/professores")
@RequiredArgsConstructor
public class ProfessorController {

    private final ProfessorService professorService;

    @PostMapping("/cadastro")
    public ResponseEntity<ProfessorResponse> cadastrar(@Valid @RequestBody ProfessorRequest request) {
        ProfessorResponse response = professorService.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<ProfessorResponse> buscarPorId(@PathVariable Long id, Authentication authentication) {
        // Professor só pode ver seus próprios dados
        Professor professorAutenticado = (Professor) authentication.getPrincipal();
        if (!professorAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ProfessorResponse response = professorService.buscarPorIdDTO(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/extrato")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<List<TransacaoResponse>> consultarExtrato(@PathVariable Long id, Authentication authentication) {
        // Professor só pode ver seu próprio extrato
        Professor professorAutenticado = (Professor) authentication.getPrincipal();
        if (!professorAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<TransacaoResponse> extrato = professorService.consultarExtrato(id);
        return ResponseEntity.ok(extrato);
    }

    @PostMapping("/{id}/enviar-moedas")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<TransacaoResponse> enviarMoedas(
            @PathVariable Long id,
            @Valid @RequestBody TransferenciaRequest request,
            Authentication authentication
    ) {
        // Professor só pode enviar moedas de sua própria conta
        Professor professorAutenticado = (Professor) authentication.getPrincipal();
        if (!professorAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        TransacaoResponse response = professorService.enviarMoedas(
                id,
                request.getAlunoId(),
                request.getValor(),
                request.getMotivo()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}/saldo")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<Map<String, Integer>> consultarSaldo(@PathVariable Long id, Authentication authentication) {
        // Professor só pode ver seu próprio saldo
        Professor professorAutenticado = (Professor) authentication.getPrincipal();
        if (!professorAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Integer saldo = professorService.consultarSaldo(id);
        return ResponseEntity.ok(Map.of("saldo", saldo));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<ProfessorResponse> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody ProfessorUpdateRequest request,
            Authentication authentication
    ) {
        // Professor só pode atualizar seus próprios dados
        Professor professorAutenticado = (Professor) authentication.getPrincipal();
        if (!professorAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ProfessorResponse response = professorService.atualizar(id, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/creditar-semestral")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<Void> creditarMoedasSemestral(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> request,
            Authentication authentication
    ) {
        // Professor só pode creditar moedas na própria conta
        Professor professorAutenticado = (Professor) authentication.getPrincipal();
        if (!professorAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Integer valor = request.get("valor");
        professorService.creditarMoedasSemestral(id, valor);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/resetar-saldo")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<Void> resetarSaldoSemestral(@PathVariable Long id, Authentication authentication) {
        // Professor só pode resetar seu próprio saldo
        Professor professorAutenticado = (Professor) authentication.getPrincipal();
        if (!professorAutenticado.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        professorService.resetarSaldoSemestral(id);
        return ResponseEntity.ok().build();
    }
}
