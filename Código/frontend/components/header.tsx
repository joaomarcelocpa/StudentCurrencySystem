"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Coins } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-[#268c90] flex items-center justify-center group-hover:bg-[#3fbec5] transition-colors">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">Student Currency</span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="font-medium">
              Login
            </Button>
          </Link>
          <Link href="/cadastro">
            <Button className="bg-[#268c90] hover:bg-[#155457] text-white font-medium">Cadastre-se</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
