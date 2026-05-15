import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | CBMaq",
  description: "Termos e condições de uso do site e serviços da CBMaq.",
};

export default function TermosUsoPage() {
  return (
    <div className="flex flex-col py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-8 text-[#0A0A0A]">Termos de Uso</h1>
      
      <div className="prose prose-blue max-w-none text-[#525252]">
        <p className="mb-4">
          Bem-vindo ao site da CBMaq. Ao acessar ou usar nosso site, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não use nosso site.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0A0A0A]">1. Uso do Site</h2>
        <p className="mb-4">
          O conteúdo das páginas deste site é apenas para sua informação geral e uso. Ele está sujeito a alterações sem aviso prévio. O uso de qualquer informação ou material neste site é inteiramente por sua conta e risco, pelo qual não seremos responsáveis.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0A0A0A]">2. Propriedade Intelectual</h2>
        <p className="mb-4">
          Este site contém material que é de nossa propriedade ou licenciado para nós. Este material inclui, mas não está limitado a, design, layout, aparência e gráficos. A reprodução é proibida, exceto de acordo com o aviso de direitos autorais, que faz parte destes termos e condições.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0A0A0A]">3. Marcas Registradas</h2>
        <p className="mb-4">
          Todas as marcas registradas reproduzidas neste site que não são de propriedade ou licenciadas para o operador são reconhecidas no site. O uso não autorizado deste site pode dar origem a uma reclamação por danos e/ou ser uma ofensa criminal.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0A0A0A]">4. Links para Outros Sites</h2>
        <p className="mb-4">
          De tempos em tempos, este site também pode incluir links para outros sites. Esses links são fornecidos para sua conveniência para fornecer mais informações. Eles não significam que endossamos o(s) site(s). Não temos responsabilidade pelo conteúdo do(s) site(s) vinculado(s).
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0A0A0A]">5. Limitação de Responsabilidade</h2>
        <p className="mb-4">
          Em nenhuma circunstância seremos responsáveis por qualquer perda ou dano, incluindo, sem limitação, perda ou dano indireto ou consequencial, ou qualquer perda ou dano decorrente da perda de dados ou lucros decorrentes de, ou em conexão com, o uso deste site.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0A0A0A]">6. Lei Aplicável</h2>
        <p className="mb-4">
          O uso deste site e qualquer disputa decorrente de tal uso estão sujeitos às leis do Brasil.
        </p>

        <p className="mt-8 text-sm text-[#4d5c7e]">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
