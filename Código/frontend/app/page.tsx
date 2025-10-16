import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <HeroSection isAuthenticated={false} />
                <FeaturesSection />
            </main>
        </div>
    )
}