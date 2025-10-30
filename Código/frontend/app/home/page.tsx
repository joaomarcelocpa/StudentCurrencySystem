"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { loginService } from "@/shared/services/login.service"
import type { UserData } from "@/shared/interfaces/login.interface"
import { Loader2 } from "lucide-react"
import { ProfessorDashboard } from "@/components/professor-dashboard"
import {AlunoDashboard} from "@/components/aluno-dashboard";
import {EmpresaDashboard} from "@/components/empresa-dashboard";

export default function HomePage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState<UserData | null>(null)

    useEffect(() => {
        const user = loginService.getUserData()

        if (!user) {
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

    if (userData?.tipo === 'ALUNO'){
        return (
            <div className='min-h-screen'>
                <Header />
                <main>
                    <AlunoDashboard />
                </main>
            </div>
        )
    }

    if (userData?.tipo === 'EMPRESA'){
        return (
            <div className='min-h-screen'>
                <Header />
                <main>
                    <EmpresaDashboard />
                </main>
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