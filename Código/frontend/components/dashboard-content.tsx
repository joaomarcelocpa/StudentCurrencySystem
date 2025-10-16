"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, Gift, FileText, Building2, BarChart3, Users } from "lucide-react"
import type { UserData } from "@/shared/interfaces/login.interface"

interface DashboardContentProps {
    user: UserData
}

export function DashboardContent({ user }: DashboardContentProps) {
    // Dashboard para ALUNO
    if (user.tipo === 'ALUNO') {
        return (
            <div className="container mx-auto px-4 py-8">
                {/* Saldo Card */}
                <Card className="p-6 mb-8 bg-gradient-to-br from-[#268c90] to-[#6ed3d8] text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/80 text-sm font-medium mb-1">Seu Saldo</p>
                            <p className="text-4xl font-bold">{user.saldoMoedas || 0}</p>
                            <p className="text-white/80 text-sm mt-1">moedas virtuais</p>
                        </div>
                        <Coins className="w-16 h-16 text-white/20" />
                    </div>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <Gift className="w-12 h-12 text-[#268c90] mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Resgatar Vantagens</h3>
                        <p className="text-muted-foreground text-sm">
                            Troque suas moedas por vantagens exclusivas
                        </p>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <FileText className="w-12 h-12 text-[#268c90] mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Extrato</h3>
                        <p className="text-muted-foreground text-sm">
                            Veja o histórico de suas transações
                        </p>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <Coins className="w-12 h-12 text-[#268c90] mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Meus Resgates</h3>
                        <p className="text-muted-foreground text-sm">
                            Acompanhe suas vantagens resgatadas
                        </p>
                    </Card>
                </div>

                {/* User Info */}
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Informações da Conta</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Nome:</span>
                            <span className="font-medium">{user.nome}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium">{user.email}</span>
                        </div>
                        {user.cpf && (
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">CPF:</span>
                                <span className="font-medium">{user.cpf}</span>
                            </div>
                        )}
                        {user.endereco && (
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">Endereço:</span>
                                <span className="font-medium">{user.endereco}</span>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        )
    }

    // Dashboard para EMPRESA
    if (user.tipo === 'EMPRESA') {
        return (
            <div className="container mx-auto px-4 py-8">
                {/* Header Card */}
                <Card className="p-6 mb-8 bg-gradient-to-br from-[#268c90] to-[#6ed3d8] text-white">
                    <div className="flex items-center gap-4">
                        <Building2 className="w-16 h-16 text-white/20" />
                        <div>
                            <h2 className="text-2xl font-bold mb-1">{user.nome}</h2>
                            <p className="text-white/80">Empresa Parceira</p>
                        </div>
                    </div>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <Gift className="w-12 h-12 text-[#268c90] mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Gerenciar Vantagens</h3>
                        <p className="text-muted-foreground text-sm">
                            Cadastre e edite suas vantagens
                        </p>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <BarChart3 className="w-12 h-12 text-[#268c90] mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Resgates</h3>
                        <p className="text-muted-foreground text-sm">
                            Acompanhe os resgates realizados
                        </p>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <FileText className="w-12 h-12 text-[#268c90] mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Validar Cupom</h3>
                        <p className="text-muted-foreground text-sm">
                            Valide cupons de vantagens
                        </p>
                    </Card>
                </div>

                {/* Company Info */}
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Informações da Empresa</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Nome:</span>
                            <span className="font-medium">{user.nome}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium">{user.email}</span>
                        </div>
                        {user.cnpj && (
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-muted-foreground">CNPJ:</span>
                                <span className="font-medium">{user.cnpj}</span>
                            </div>
                        )}
                        {user.endereco && (
                            <div className="flex justify-between py-2">
                                <span className="text-muted-foreground">Endereço:</span>
                                <span className="font-medium">{user.endereco}</span>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        )
    }

    // Dashboard para PROFESSOR
    if (user.tipo === 'PROFESSOR') {
        return (
            <div className="container mx-auto px-4 py-8">
                {/* Header Card */}
                <Card className="p-6 mb-8 bg-gradient-to-br from-[#268c90] to-[#6ed3d8] text-white">
                    <div className="flex items-center gap-4">
                        <Users className="w-16 h-16 text-white/20" />
                        <div>
                            <h2 className="text-2xl font-bold mb-1">{user.nome}</h2>
                            <p className="text-white/80">Professor</p>
                        </div>
                    </div>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <Coins className="w-12 h-12 text-[#268c90] mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Enviar Moedas</h3>
                        <p className="text-muted-foreground text-sm">
                            Distribua moedas para seus alunos
                        </p>
                    </Card>

                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <FileText className="w-12 h-12 text-[#268c90] mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Histórico</h3>
                        <p className="text-muted-foreground text-sm">
                            Veja suas transações realizadas
                        </p>
                    </Card>
                </div>

                {/* Professor Info */}
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Informações do Professor</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">Nome:</span>
                            <span className="font-medium">{user.nome}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium">{user.email}</span>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    return null
}