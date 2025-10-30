import {useEffect, useState} from "react";
import {UserData} from "@/shared/interfaces/login.interface";
import {loginService} from "@/shared/services/login.service";
import Link from "next/link";
import {Card} from "@/components/ui/card";
import {ArrowRight, DollarSign, Send} from "lucide-react";
import {Button} from "@/components/ui/button";

export function AlunoDashboard(){
    const [aluno, setAluno] = useState<UserData | null>(null);

    useEffect(() => {
        const userData = loginService.getUserData()
        if (userData && userData.tipo === 'ALUNO') {
            setAluno(userData);
        }
    }, []);

    return (
        <section className='container mx-auto px-4 py-20'>
            <div className='max-w-6xl mx-auto'>
                <div className='text-center mb-12'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#268c90] to-[#6ed3d8] bg-clip-text text-transparent'>
                        Bem-vindo, {aluno?.nome}
                    </h1>
                    <p className='text-xl text-muted-foreground'>
                        Acompanhe seu saldo de moedas acadêmicas e resgate vantagens exclusivas
                    </p>
                </div>
            </div>

            <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                <Link href="/resgatar-vantagens" className='block group'>
                    <Card className='p-8 hover:shadow-2xl transition-all duration-300 border-2 border-[#268c90] bg-gradient-to-br from-[#268c90]/5 to-[#6ed3d8]/5 h-full'>
                        <div className='flex flex-col items-center text-center'>
                            <div
                                className='w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-[#268c90]'
                                >
                                <Send className='w-10 h-10 text-white' />
                            </div>
                            <h3 className="font-heading font-semibold text-3xl mb-4 text-foreground">
                                Trocar Vantagens
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Utilize suas moedas acadêmicas para desbloquear benefícios exclusivos e recompensas
                            </p>
                            <Button
                                size="lg"
                                className="bg-[#268c90] hover:bg-[#155457] text-white group-hover:gap-3 transition-all"
                            >
                                Acessar
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </Card>
                </Link>


                <Link href="/extrato" className='block group'>
                    <Card className='p-8 hover:shadow-2xl transition-all duration-300 border-2 border-[#268c90] bg-gradient-to-br from-[#268c90]/5 to-[#6ed3d8]/5 h-full'>
                        <div className='flex flex-col items-center text-center'>
                            <div
                                className='w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-[#268c90]'
                            >
                                <Send className='w-10 h-10 text-white' />
                            </div>
                            <h3 className="font-heading font-semibold text-3xl mb-4 text-foreground">
                                Visualizar Extrato
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Acompanhe todas as suas transações de moedas acadêmicas em um só lugar
                            </p>
                            <Button
                                size="lg"
                                className="bg-[#268c90] hover:bg-[#155457] text-white group-hover:gap-3 transition-all"
                            >
                                Acessar
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </Card>
                </Link>


                <Link href="/editar-perfil" className='block group'>
                    <Card className='p-8 hover:shadow-2xl transition-all duration-300 border-2 border-[#268c90] bg-gradient-to-br from-[#268c90]/5 to-[#6ed3d8]/5 h-full'>
                        <div className='flex flex-col items-center text-center'>
                            <div
                                className='w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-[#268c90]'
                            >
                                <Send className='w-10 h-10 text-white' />
                            </div>
                            <h3 className="font-heading font-semibold text-3xl mb-4 text-foreground">
                                Editar Perfil
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Atualize suas informações pessoais e gerencie os dados do seu perfil acadêmico
                            </p>
                            <Button
                                size="lg"
                                className="bg-[#268c90] hover:bg-[#155457] text-white group-hover:gap-3 transition-all"
                            >
                                Acessar
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </Card>
                </Link>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
                <Card className="p-6 bg-gradient-to-r from-[#268c90]/10 to-[#6ed3d8]/10 border-[#268c90]/20">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#268c90] flex items-center justify-center">
                            <DollarSign className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-1">Como funciona?</h4>
                            <p className="text-muted-foreground">
                                As moedas acadêmicas são uma forma inovadora de reconhecer e recompensar o esforço dos alunos.
                                Ao acumular moedas por meio de bom desempenho, participação em atividades e cumprimento de metas acadêmicas,
                                os alunos podem trocá-las por vantagens exclusivas, como descontos em materiais didáticos, acesso a eventos especiais
                                e outros benefícios que incentivam o engajamento e a excelência acadêmica.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}