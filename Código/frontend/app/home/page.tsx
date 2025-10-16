"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { loginService } from "@/shared/services/login.service"
import { Loader2 } from "lucide-react"

export default function HomePage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Verificar se o usuário está autenticado
        const userData = loginService.getUserData()

        if (!userData) {
            // Se não estiver autenticado, redireciona para login
            router.push('/login')
        } else {
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