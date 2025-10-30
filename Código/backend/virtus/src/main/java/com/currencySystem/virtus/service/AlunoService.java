package com.currencySystem.virtus.service;

import com.currencySystem.virtus.dto.*;
import com.currencySystem.virtus.model.Aluno;
import com.currencySystem.virtus.model.ResgateVantagem;
import com.currencySystem.virtus.model.Transacao;
import com.currencySystem.virtus.model.Vantagem;
import com.currencySystem.virtus.repository.AlunoRepository;
import com.currencySystem.virtus.repository.ResgateVantagemRepository;
import com.currencySystem.virtus.repository.TransacaoRepository;
import com.currencySystem.virtus.repository.VantagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final TransacaoRepository transacaoRepository;
    private final VantagemRepository vantagemRepository;
    private final ResgateVantagemRepository resgateVantagemRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public AlunoResponse cadastrar(AlunoRequest request) {
        if (alunoRepository.existsByLogin(request.getLogin())) {
            throw new IllegalArgumentException("Login já cadastrado");
        }
        if (alunoRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }
        if (alunoRepository.existsByCpf(request.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }

        Aluno aluno = new Aluno(
                request.getLogin(),
                passwordEncoder.encode(request.getSenha()),
                request.getNome(),
                request.getEmail(),
                request.getCpf(),
                request.getRg(),
                request.getEndereco()
        );

        Aluno savedAluno = alunoRepository.save(aluno);
        return AlunoResponse.fromEntity(savedAluno);
    }

    @Transactional(readOnly = true)
    public Aluno buscarPorId(Long id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));
    }

    @Transactional(readOnly = true)
    public List<Aluno> listarTodos() {
        return alunoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public AlunoResponse buscarPorIdDTO(Long id) {
        Aluno aluno = buscarPorId(id);
        return AlunoResponse.fromEntity(aluno);
    }

    @Transactional(readOnly = true)
    public List<TransacaoResponse> consultarExtrato(Long alunoId) {
        Aluno aluno = buscarPorId(alunoId);
        return transacaoRepository.findByAlunoIdOrderByDataHoraDesc(alunoId)
                .stream()
                .map(TransacaoResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public ResgateVantagemResponse trocarMoedas(Long alunoId, Long vantagemId) {
        Aluno aluno = buscarPorId(alunoId);
        Vantagem vantagem = vantagemRepository.findById(vantagemId)
                .orElseThrow(() -> new IllegalArgumentException("Vantagem não encontrada"));

        if (!vantagem.isDisponivel()) {
            throw new IllegalStateException("Vantagem não está disponível");
        }

        if (aluno.getSaldoMoedas() < vantagem.getCustoMoedas()) {
            throw new IllegalStateException("Saldo insuficiente");
        }

        if (!aluno.trocarMoedas(vantagem)) {
            throw new IllegalStateException("Erro ao realizar a troca de moedas");
        }

        ResgateVantagem resgate = new ResgateVantagem();
        resgate.setAluno(aluno);
        resgate.setVantagem(vantagem);
        resgate.setValorMoedas(vantagem.getCustoMoedas());
        resgate.setDataResgate(LocalDateTime.now());
        resgate.setUtilizado(false);

        alunoRepository.save(aluno);
        resgateVantagemRepository.save(resgate);

        aluno.notificarEmail("Você resgatou a vantagem: " + vantagem.getNome() +
                            ". Código de resgate: " + resgate.getCodigoResgate());

        return ResgateVantagemResponse.fromEntity(resgate);
    }

    @Transactional(readOnly = true)
    public List<ResgateVantagemResponse> listarResgates(Long alunoId) {
        buscarPorId(alunoId); 
        return resgateVantagemRepository.findByAlunoIdOrderByDataResgateDesc(alunoId)
                .stream()
                .map(ResgateVantagemResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Integer consultarSaldo(Long alunoId) {
        Aluno aluno = buscarPorId(alunoId);
        return aluno.getSaldoMoedas();
    }

    @Transactional
    public AlunoResponse atualizar(Long id, AlunoUpdateRequest request) {
        Aluno aluno = buscarPorId(id);

        if (request.getNome() != null) {
            aluno.setNome(request.getNome());
        }
        if (request.getEmail() != null) {
            aluno.setEmail(request.getEmail());
        }
        if (request.getEndereco() != null) {
            aluno.setEndereco(request.getEndereco());
        }
        if (request.getRg() != null) {
            aluno.setRg(request.getRg());
        }

        if (request.getSenha() != null) {
            aluno.setSenha(passwordEncoder.encode(request.getSenha()));
        }

        Aluno updated = alunoRepository.save(aluno);
        return AlunoResponse.fromEntity(updated);
    }
}
