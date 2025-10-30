"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CoinSenderHeader } from "@/components/coin-sender-header"
import { StudentList } from "@/components/student-list"
import { TransferModal } from "@/components/transfer-modal"
import type { Student } from "@/shared/interfaces/coin-sender.interface"

// Mock data - será substituído pela API
const mockStudents: Student[] = [
    {
        id: 1,
        nome: "Ana Silva Santos",
        email: "ana.silva@email.com",
        cpf: "123.456.789-00",
        curso: "Ciência da Computação",
        instituicao: "UFMG",
        saldoMoedas: 150
    },
    {
        id: 2,
        nome: "Carlos Eduardo Oliveira",
        email: "carlos.oliveira@email.com",
        cpf: "234.567.890-11",
        curso: "Engenharia de Software",
        instituicao: "UFMG",
        saldoMoedas: 320
    },
    {
        id: 3,
        nome: "Beatriz Costa Lima",
        email: "beatriz.lima@email.com",
        cpf: "345.678.901-22",
        curso: "Sistemas de Informação",
        instituicao: "UFMG",
        saldoMoedas: 95
    },
    {
        id: 4,
        nome: "Daniel Ferreira Rocha",
        email: "daniel.rocha@email.com",
        cpf: "456.789.012-33",
        curso: "Ciência da Computação",
        instituicao: "UFMG",
        saldoMoedas: 280
    },
    {
        id: 5,
        nome: "Eduarda Mendes Alves",
        email: "eduarda.alves@email.com",
        cpf: "567.890.123-44",
        curso: "Engenharia de Software",
        instituicao: "UFMG",
        saldoMoedas: 175
    },
    {
        id: 6,
        nome: "Felipe Santos Martins",
        email: "felipe.martins@email.com",
        cpf: "678.901.234-55",
        curso: "Ciência da Computação",
        instituicao: "UFMG",
        saldoMoedas: 420
    },
    {
        id: 7,
        nome: "Gabriela Rodrigues Souza",
        email: "gabriela.souza@email.com",
        cpf: "789.012.345-66",
        curso: "Sistemas de Informação",
        instituicao: "UFMG",
        saldoMoedas: 210
    },
    {
        id: 8,
        nome: "Henrique Barbosa Lima",
        email: "henrique.lima@email.com",
        cpf: "890.123.456-77",
        curso: "Ciência da Computação",
        instituicao: "UFMG",
        saldoMoedas: 340
    }
]

const mockProfessorBalance = 1000

export default function CoinSenderPage() {
    const [students] = useState<Student[]>(mockStudents)
    const [professorBalance, setProfessorBalance] = useState(mockProfessorBalance)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student)
        setIsModalOpen(true)
    }

    const handleTransfer = (amount: number, description: string) => {
        if (selectedStudent && amount <= professorBalance) {
            console.log("Transferindo:", {
                studentId: selectedStudent.id,
                amount,
                description
            })

            setProfessorBalance(prev => prev - amount)
            setIsModalOpen(false)
            setSelectedStudent(null)
        }
    }

    const filteredStudents = students.filter(student =>
        student.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.curso.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <CoinSenderHeader
                    professorBalance={professorBalance}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <StudentList
                    students={filteredStudents}
                    onSelectStudent={handleSelectStudent}
                />

                <TransferModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setSelectedStudent(null)
                    }}
                    student={selectedStudent}
                    professorBalance={professorBalance}
                    onTransfer={handleTransfer}
                />
            </main>
        </div>
    )
}