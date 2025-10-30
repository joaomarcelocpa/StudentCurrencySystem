"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Building2, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import type { UserData } from "@/shared/interfaces/login.interface"
import { useRouter } from "next/navigation"

interface EditarFormProps {
    userData: UserData
}

// Dados mockados de exemplo para cada tipo de usuário
const getMockUserData = (userData: UserData) => {
    if (userData.tipo === 'ALUNO') {
        return {
            name: "Ana Silva Santos",
            email: "ana.silva@email.com",
            cpf: "123.456.789-00",
            rg: "12.345.678-9",
            address: "Rua das Flores, 123, Centro, Belo Horizonte - MG",
            institution: "ufmg",
            course: "Ciência da Computação"
        }
    } else if (userData.tipo === 'PROFESSOR') {
        return {
            name: "Prof. Dr. João Carlos Silva",
            email: "joao.silva@ufmg.br",
            cpf: "987.654.321-00",
            department: "Departamento de Ciência da Computação",
            institution: "ufmg"
        }
    } else {
        return {
            name: "Tech Solutions Ltda",
            email: "contato@techsolutions.com.br",
            cnpj: "12.345.678/0001-90",
            address: "Av. Afonso Pena, 1500, Funcionários, Belo Horizonte - MG",
            description: "Empresa de tecnologia especializada em desenvolvimento de software e consultoria em TI."
        }
    }
}

export function EditarForm({ userData }: EditarFormProps) {
    const router = useRouter()
    const mockData = getMockUserData(userData)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    // Estado inicial baseado nos dados mockados
    const [formData, setFormData] = useState(mockData)
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [isChangingPassword, setIsChangingPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)
        setFieldErrors({})
        setIsLoading(true)

        // Simular validação
        try {
            // Validação de senha se estiver alterando
            if (isChangingPassword) {
                if (!passwordData.currentPassword) {
                    setFieldErrors(prev => ({ ...prev, currentPassword: "Senha atual é obrigatória" }))
                    setIsLoading(false)
                    return
                }
                if (!passwordData.newPassword || passwordData.newPassword.length < 6) {
                    setFieldErrors(prev => ({ ...prev, newPassword: "A nova senha deve ter pelo menos 6 caracteres" }))
                    setIsLoading(false)
                    return
                }
                if (passwordData.newPassword !== passwordData.confirmPassword) {
                    setFieldErrors(prev => ({ ...prev, confirmPassword: "As senhas não coincidem" }))
                    setIsLoading(false)
                    return
                }
            }

            // Simular chamada à API
            await new Promise(resolve => setTimeout(resolve, 1500))

            console.log("Dados atualizados:", formData)
            if (isChangingPassword) {
                console.log("Senha alterada")
            }

            setSuccess(true)

            // Resetar campos de senha após sucesso
            if (isChangingPassword) {
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                })
                setIsChangingPassword(false)
            }

            // Voltar para home após 2 segundos
            setTimeout(() => {
                router.push('/home')
            }, 2000)

        } catch (err) {
            setError("Erro ao atualizar perfil. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (fieldErrors[field]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    const updatePasswordField = (field: string, value: string) => {
        setPasswordData((prev) => ({ ...prev, [field]: value }))
        if (fieldErrors[field]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    const getUserTypeIcon = () => {
        if (userData.tipo === 'ALUNO') {
            return <User className="w-8 h-8 text-[#268c90]" />
        } else if (userData.tipo === 'PROFESSOR') {
            return <User className="w-8 h-8 text-[#268c90]" />
        } else {
            return <Building2 className="w-8 h-8 text-[#268c90]" />
        }
    }

    const getUserTypeLabel = () => {
        if (userData.tipo === 'ALUNO') return 'Aluno'
        if (userData.tipo === 'PROFESSOR') return 'Professor'
        return 'Empresa'
    }

    return (
        <Card className="w-full max-w-2xl p-8 border-border">
            <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-[#268c90]/10 flex items-center justify-center mx-auto mb-4">
                    {getUserTypeIcon()}
                </div>
                <h2 className="font-heading font-bold text-3xl mb-2 text-foreground">Editar Perfil</h2>
                <p className="text-muted-foreground">Atualize suas informações pessoais</p>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-[#268c90]/10 rounded-lg">
                    <span className="text-sm font-medium text-[#268c90]">Tipo de conta: {getUserTypeLabel()}</span>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-green-800 text-sm font-medium">Perfil atualizado com sucesso!</p>
                        <p className="text-green-700 text-xs mt-1">Redirecionando...</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Campos comuns para todos os tipos */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                        Nome {userData.tipo === 'EMPRESA' && 'da Empresa'}
                    </Label>
                    <Input
                        id="name"
                        placeholder={userData.tipo === 'ALUNO' || userData.tipo === 'PROFESSOR' ? "Seu nome completo" : "Nome da empresa"}
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className={`h-11 ${fieldErrors.name ? 'border-red-500' : ''}`}
                        disabled={isLoading}
                        required
                    />
                    {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={`h-11 ${fieldErrors.email ? 'border-red-500' : ''}`}
                        disabled={isLoading}
                        required
                    />
                    {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                </div>

                {/* Campos específicos para ALUNO */}
                {userData.tipo === 'ALUNO' && 'cpf' in formData && 'rg' in formData && (
                    <>
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="cpf" className="text-foreground font-medium">
                                    CPF
                                </Label>
                                <Input
                                    id="cpf"
                                    placeholder="000.000.000-00"
                                    value={formData.cpf}
                                    onChange={(e) => updateField("cpf", e.target.value)}
                                    className="h-11 bg-muted"
                                    disabled={true}
                                    maxLength={14}
                                />
                                <p className="text-xs text-muted-foreground">Campo não editável</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="rg" className="text-foreground font-medium">
                                    RG
                                </Label>
                                <Input
                                    id="rg"
                                    placeholder="00.000.000-0"
                                    value={formData.rg}
                                    onChange={(e) => updateField("rg", e.target.value)}
                                    className={`h-11 ${fieldErrors.rg ? 'border-red-500' : ''}`}
                                    disabled={isLoading}
                                    required
                                />
                                {fieldErrors.rg && <p className="text-red-500 text-xs mt-1">{fieldErrors.rg}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-foreground font-medium">
                                Endereço
                            </Label>
                            <Input
                                id="address"
                                placeholder="Rua, número, bairro, cidade"
                                value={formData.address}
                                onChange={(e) => updateField("address", e.target.value)}
                                className={`h-11 ${fieldErrors.address ? 'border-red-500' : ''}`}
                                disabled={isLoading}
                                required
                            />
                            {fieldErrors.address && <p className="text-red-500 text-xs mt-1">{fieldErrors.address}</p>}
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="institution" className="text-foreground font-medium">
                                    Instituição de Ensino
                                </Label>
                                <Select
                                    value={formData.institution}
                                    onValueChange={(value) => updateField("institution", value)}
                                    disabled={isLoading}
                                    required
                                >
                                    <SelectTrigger className="h-11">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ufmg">UFMG</SelectItem>
                                        <SelectItem value="usp">USP</SelectItem>
                                        <SelectItem value="unicamp">UNICAMP</SelectItem>
                                        <SelectItem value="ufrj">UFRJ</SelectItem>
                                        <SelectItem value="puc">PUC</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="course" className="text-foreground font-medium">
                                    Curso
                                </Label>
                                <Input
                                    id="course"
                                    placeholder="Ex: Ciência da Computação"
                                    value={formData.course}
                                    onChange={(e) => updateField("course", e.target.value)}
                                    className="h-11"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* Campos específicos para PROFESSOR */}
                {userData.tipo === 'PROFESSOR' && 'cpf' in formData && 'department' in formData && (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="cpf" className="text-foreground font-medium">
                                CPF
                            </Label>
                            <Input
                                id="cpf"
                                placeholder="000.000.000-00"
                                value={formData.cpf}
                                onChange={(e) => updateField("cpf", e.target.value)}
                                className="h-11 bg-muted"
                                disabled={true}
                                maxLength={14}
                            />
                            <p className="text-xs text-muted-foreground">Campo não editável</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="department" className="text-foreground font-medium">
                                Departamento
                            </Label>
                            <Input
                                id="department"
                                placeholder="Ex: Departamento de Ciência da Computação"
                                value={formData.department}
                                onChange={(e) => updateField("department", e.target.value)}
                                className={`h-11 ${fieldErrors.department ? 'border-red-500' : ''}`}
                                disabled={isLoading}
                                required
                            />
                            {fieldErrors.department && <p className="text-red-500 text-xs mt-1">{fieldErrors.department}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="institution" className="text-foreground font-medium">
                                Instituição de Ensino
                            </Label>
                            <Select
                                value={formData.institution}
                                onValueChange={(value) => updateField("institution", value)}
                                disabled={isLoading}
                                required
                            >
                                <SelectTrigger className="h-11">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ufmg">UFMG</SelectItem>
                                    <SelectItem value="usp">USP</SelectItem>
                                    <SelectItem value="unicamp">UNICAMP</SelectItem>
                                    <SelectItem value="ufrj">UFRJ</SelectItem>
                                    <SelectItem value="puc">PUC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                )}

                {/* Campos específicos para EMPRESA */}
                {userData.tipo === 'EMPRESA' && 'cnpj' in formData && 'description' in formData && (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="cnpj" className="text-foreground font-medium">
                                CNPJ
                            </Label>
                            <Input
                                id="cnpj"
                                placeholder="00.000.000/0000-00"
                                value={formData.cnpj}
                                onChange={(e) => updateField("cnpj", e.target.value)}
                                className="h-11 bg-muted"
                                disabled={true}
                                maxLength={18}
                            />
                            <p className="text-xs text-muted-foreground">Campo não editável</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-foreground font-medium">
                                Endereço
                            </Label>
                            <Input
                                id="address"
                                placeholder="Rua, número, bairro, cidade"
                                value={formData.address}
                                onChange={(e) => updateField("address", e.target.value)}
                                className={`h-11 ${fieldErrors.address ? 'border-red-500' : ''}`}
                                disabled={isLoading}
                                required
                            />
                            {fieldErrors.address && <p className="text-red-500 text-xs mt-1">{fieldErrors.address}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-foreground font-medium">
                                Descrição da Empresa
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Conte um pouco sobre sua empresa..."
                                value={formData.description}
                                onChange={(e) => updateField("description", e.target.value)}
                                className="min-h-24 resize-none"
                                disabled={isLoading}
                            />
                        </div>
                    </>
                )}

                {/* Seção de alteração de senha */}
                <div className="pt-6 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Alterar Senha</h3>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsChangingPassword(!isChangingPassword)}
                            disabled={isLoading}
                        >
                            {isChangingPassword ? "Cancelar" : "Alterar Senha"}
                        </Button>
                    </div>

                    {isChangingPassword && (
                        <div className="space-y-4 mt-4 p-4 bg-muted/50 rounded-lg">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword" className="text-foreground font-medium">
                                    Senha Atual *
                                </Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    placeholder="Digite sua senha atual"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => updatePasswordField("currentPassword", e.target.value)}
                                    className={`h-11 ${fieldErrors.currentPassword ? 'border-red-500' : ''}`}
                                    disabled={isLoading}
                                />
                                {fieldErrors.currentPassword && <p className="text-red-500 text-xs mt-1">{fieldErrors.currentPassword}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-foreground font-medium">
                                    Nova Senha *
                                </Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Mínimo 6 caracteres"
                                    value={passwordData.newPassword}
                                    onChange={(e) => updatePasswordField("newPassword", e.target.value)}
                                    className={`h-11 ${fieldErrors.newPassword ? 'border-red-500' : ''}`}
                                    disabled={isLoading}
                                />
                                {fieldErrors.newPassword && <p className="text-red-500 text-xs mt-1">{fieldErrors.newPassword}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                                    Confirmar Nova Senha *
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Digite a nova senha novamente"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => updatePasswordField("confirmPassword", e.target.value)}
                                    className={`h-11 ${fieldErrors.confirmPassword ? 'border-red-500' : ''}`}
                                    disabled={isLoading}
                                />
                                {fieldErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</p>}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/home')}
                        disabled={isLoading}
                        className="flex-1 h-12"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 h-12 bg-[#268c90] hover:bg-[#155457] text-white font-medium text-base"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            "Salvar Alterações"
                        )}
                    </Button>
                </div>
            </form>
        </Card>
    )
}