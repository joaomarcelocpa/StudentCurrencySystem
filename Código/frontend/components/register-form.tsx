"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { User, Building2 } from "lucide-react"

type UserType = "student" | "company"

export function RegisterForm() {
  const [userType, setUserType] = useState<UserType>("student")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
    rg: "",
    address: "",
    institution: "",
    course: "",
    cnpj: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Register:", { userType, ...formData })
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl p-8 border-border">
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-3xl mb-2 text-foreground">Criar conta</h2>
        <p className="text-muted-foreground">Escolha o tipo de conta e preencha seus dados</p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          type="button"
          onClick={() => setUserType("student")}
          className={`flex-1 p-4 rounded-xl border-2 transition-all ${
            userType === "student" ? "border-[#268c90] bg-[#268c90]/5" : "border-border hover:border-[#6ed3d8]"
          }`}
        >
          <User
            className={`w-8 h-8 mx-auto mb-2 ${userType === "student" ? "text-[#268c90]" : "text-muted-foreground"}`}
          />
          <p className={`font-medium ${userType === "student" ? "text-[#268c90]" : "text-foreground"}`}>Aluno</p>
        </button>

        <button
          type="button"
          onClick={() => setUserType("company")}
          className={`flex-1 p-4 rounded-xl border-2 transition-all ${
            userType === "company" ? "border-[#268c90] bg-[#268c90]/5" : "border-border hover:border-[#6ed3d8]"
          }`}
        >
          <Building2
            className={`w-8 h-8 mx-auto mb-2 ${userType === "company" ? "text-[#268c90]" : "text-muted-foreground"}`}
          />
          <p className={`font-medium ${userType === "company" ? "text-[#268c90]" : "text-foreground"}`}>Empresa</p>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">
              Nome {userType === "company" && "da Empresa"}
            </Label>
            <Input
              id="name"
              placeholder={userType === "student" ? "Seu nome completo" : "Nome da empresa"}
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="h-11"
              required
            />
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
              className="h-11"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium">
            Senha
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            className="h-11"
            required
          />
        </div>

        {userType === "student" ? (
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
                  className="h-11"
                  required
                />
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
                  className="h-11"
                  required
                />
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
                className="h-11"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="institution" className="text-foreground font-medium">
                  Instituição de Ensino
                </Label>
                <Select
                  value={formData.institution}
                  onValueChange={(value) => updateField("institution", value)}
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
                  required
                />
              </div>
            </div>
          </>
        ) : (
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
                className="h-11"
                required
              />
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
                required
              />
            </div>
          </>
        )}

        <Button
          type="submit"
          className="w-full h-12 bg-[#268c90] hover:bg-[#155457] text-white font-medium text-base mt-6"
        >
          Criar conta
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-[#268c90] hover:text-[#155457] font-medium">
            Faça login
          </Link>
        </p>
      </form>
    </Card>
  )
}
