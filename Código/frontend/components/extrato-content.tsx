import { Card } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft, Calendar, FileText } from "lucide-react"

interface Transaction {
    id: number
    tipo: "ENVIADA" | "RECEBIDA"
    valor: number
    descricao: string
    data: string
    nomeContato: string // Nome do aluno (para professor) ou professor (para aluno)
}

interface ExtratoContentProps {
    userType: string
}

// Mock data para professor
const mockTransactionsProfessor: Transaction[] = [
    {
        id: 1,
        tipo: "ENVIADA",
        valor: 50,
        descricao: "Excelente participação nas aulas e projeto final bem elaborado",
        data: "2025-10-28T14:30:00",
        nomeContato: "Ana Silva Santos"
    },
    {
        id: 2,
        tipo: "ENVIADA",
        valor: 30,
        descricao: "Ótimo desempenho na apresentação do seminário",
        data: "2025-10-27T10:15:00",
        nomeContato: "Carlos Eduardo Oliveira"
    },
    {
        id: 3,
        tipo: "ENVIADA",
        valor: 45,
        descricao: "Dedicação excepcional nas atividades práticas",
        data: "2025-10-25T16:20:00",
        nomeContato: "Beatriz Costa Lima"
    },
    {
        id: 4,
        tipo: "ENVIADA",
        valor: 25,
        descricao: "Contribuição significativa no trabalho em grupo",
        data: "2025-10-24T11:45:00",
        nomeContato: "Daniel Ferreira Rocha"
    },
    {
        id: 5,
        tipo: "ENVIADA",
        valor: 60,
        descricao: "Desempenho exemplar na prova e trabalhos extras",
        data: "2025-10-22T09:30:00",
        nomeContato: "Eduarda Mendes Alves"
    },
    {
        id: 6,
        tipo: "ENVIADA",
        valor: 35,
        descricao: "Boa resolução dos exercícios e participação ativa",
        data: "2025-10-20T15:00:00",
        nomeContato: "Felipe Santos Martins"
    },
    {
        id: 7,
        tipo: "ENVIADA",
        valor: 40,
        descricao: "Comprometimento e melhoria contínua ao longo do semestre",
        data: "2025-10-18T13:10:00",
        nomeContato: "Gabriela Rodrigues Souza"
    }
]

// Mock data para aluno
const mockTransactionsAluno: Transaction[] = [
    {
        id: 1,
        tipo: "RECEBIDA",
        valor: 50,
        descricao: "Excelente participação nas aulas e projeto final bem elaborado",
        data: "2025-10-28T14:30:00",
        nomeContato: "Prof. Dr. João Carlos Silva"
    },
    {
        id: 2,
        tipo: "RECEBIDA",
        valor: 35,
        descricao: "Ótimo desempenho na prova trimestral",
        data: "2025-10-25T10:15:00",
        nomeContato: "Profa. Dra. Maria Santos"
    },
    {
        id: 3,
        tipo: "RECEBIDA",
        valor: 40,
        descricao: "Trabalho de pesquisa muito bem fundamentado",
        data: "2025-10-22T16:20:00",
        nomeContato: "Prof. Dr. João Carlos Silva"
    },
    {
        id: 4,
        tipo: "RECEBIDA",
        valor: 25,
        descricao: "Participação ativa nos debates em sala",
        data: "2025-10-20T11:45:00",
        nomeContato: "Prof. Ms. Ricardo Mendes"
    },
    {
        id: 5,
        tipo: "RECEBIDA",
        valor: 45,
        descricao: "Excelente apresentação do seminário de conclusão",
        data: "2025-10-18T09:30:00",
        nomeContato: "Profa. Dra. Maria Santos"
    },
    {
        id: 6,
        tipo: "RECEBIDA",
        valor: 30,
        descricao: "Dedicação nos exercícios práticos de laboratório",
        data: "2025-10-15T15:00:00",
        nomeContato: "Prof. Dr. João Carlos Silva"
    }
]

export function ExtratoContent({ userType }: ExtratoContentProps) {
    const transactions = userType === "PROFESSOR" ? mockTransactionsProfessor : mockTransactionsAluno

    const totalTransferido = transactions.reduce((acc, t) => acc + t.valor, 0)

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header com Total ao lado */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-foreground mb-2">Extrato de Transações</h1>
                    <p className="text-muted-foreground font-normal">
                        {userType === "PROFESSOR"
                            ? "Histórico completo de moedas enviadas aos alunos"
                            : "Histórico completo de moedas recebidas dos professores"
                        }
                    </p>
                </div>
            </div>

            {/* Lista de Transações */}
            <Card className="overflow-hidden rounded">
                <div className="divide-y divide-border">
                    {transactions.length === 0 ? (
                        <div className="p-12 text-center">
                            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Nenhuma transação encontrada</h3>
                            <p className="text-muted-foreground text-sm font-normal">
                                {userType === "PROFESSOR"
                                    ? "Você ainda não enviou moedas para nenhum aluno"
                                    : "Você ainda não recebeu moedas de nenhum professor"
                                }
                            </p>
                        </div>
                    ) : (
                        transactions.map((transaction, index) => (
                            <div
                                key={transaction.id}
                                className={`p-6 hover:bg-muted/30 transition-colors ${
                                    index === 0 ? 'bg-muted/20' : ''
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Ícone */}
                                    <div className={`w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0 ${
                                        transaction.tipo === "ENVIADA"
                                            ? "bg-white dark:bg-white"
                                            : "bg-white dark:bg-white"
                                    }`}>
                                        {transaction.tipo === "ENVIADA" ? (
                                            <ArrowUpRight className="w-6 h-6 text-red-600 dark:text-red-400" />
                                        ) : (
                                            <ArrowDownLeft className="w-6 h-6 text-green-600 dark:text-green-400" />
                                        )}
                                    </div>

                                    {/* Informações da Transação */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-foreground">
                                                        {transaction.tipo === "ENVIADA" ? "Enviado para" : "Recebido de"}:
                                                    </span>
                                                    <span className="text-foreground font-normal">
                                                        {transaction.nomeContato}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                                                    {transaction.descricao}
                                                </p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className={`text-2xl font-semibold ${
                                                    transaction.tipo === "ENVIADA"
                                                        ? "text-red-600 dark:text-red-400"
                                                        : "text-green-600 dark:text-green-400"
                                                }`}>
                                                    {transaction.tipo === "ENVIADA" ? "-" : "+"}{transaction.valor}
                                                </p>
                                                <p className="text-xs text-muted-foreground font-normal">moedas</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-normal">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{formatDate(transaction.data)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </div>
    )
}