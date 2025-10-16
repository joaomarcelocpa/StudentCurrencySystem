package com.currencySystem.virtus.controller;

import com.currencySystem.virtus.model.Vantagem;
import com.currencySystem.virtus.repository.VantagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vantagens")
@RequiredArgsConstructor
public class VantagemController {

    private final VantagemRepository vantagemRepository;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Vantagem>> listarTodas() {
        List<Vantagem> vantagens = vantagemRepository.findAll();
        return ResponseEntity.ok(vantagens);
    }

    @GetMapping("/ativas")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Vantagem>> listarAtivas() {
        List<Vantagem> vantagens = vantagemRepository.findByAtivaTrue();
        return ResponseEntity.ok(vantagens);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Vantagem> buscarPorId(@PathVariable Long id) {
        return vantagemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/empresa/{empresaId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Vantagem>> listarPorEmpresa(@PathVariable Long empresaId) {
        List<Vantagem> vantagens = vantagemRepository.findByEmpresaId(empresaId);
        return ResponseEntity.ok(vantagens);
    }
}
