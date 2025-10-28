"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ProfessorDashboard } from "@/components/professor-dashboard"
import { loginService } from "@/shared/services/login.service"
import type { UserData } from "@/shared/interfaces/login.interface"
import { Loader2 } from "lucide-react"

export default function HomePage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState<UserData | null>(null)

    useEffect(() => {
        // Verificar se o usuário está autenticado
        const user = loginService.getUserData()

        if (!user) {
            // Se não estiver autenticado, redireciona para login
            router.push('/login')
        } else {
            setUserData(user)
            setIsLoading(false)
        }
    }, [router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#268c90]" />
            </div>
        )
    }

    // Se for professor, mostrar dashboard específico de professor
    if (userData?.tipo === 'PROFESSOR') {
        return (
            <div className="min-h-screen">
                <Header />
                <main>
                    <ProfessorDashboard />
                </main>
            </div>
        )
    }

    // Para alunos e empresas, mostrar a home padrão
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <HeroSection isAuthenticated={true} />
                <FeaturesSection />
            </main>
        </div>
    )
}