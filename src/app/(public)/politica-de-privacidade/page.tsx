import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | CBMaq",
  description: "Política de privacidade e proteção de dados da CBMaq.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="flex flex-col py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-8 text-[#0A0A0A]">Política de Privacidade</h1>
      
      <div className="prose prose-blue max-w-none text-[#525252]">
        <p className="mb-4">
          A CBMaq tem o compromisso de proteger a sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais quando você visita nosso site ou utiliza nossos serviços.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0A0A0A]">1. Informações que Coletamos</h2>
        <p className="mb-4">
          Podemos coletar informações pessoais que você nos fornece diretamente, como nome, endereço de e-mail, número de telefone e informações da empresa, ao preencher formulários em nosso site ou ao entrar em contato conosco.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0A0A0A]">2. Como Usamos Suas Informações</h2>
        <p className="mb-4">
          Utilizamos as informações coletadas para:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Fornecer, operar e manter nossos serviços;</li>
          <li>Melhorar, personalizar e expandir nosso site;</li>
          <li>Entender e analisar como você usa nosso site;</li>
          <li>Desenvolver novos produtos, serviços, recursos e funcionalidades;</li>
          <li>Comunicar-nos com você para atendimento ao cliente, atualizações e outras informações relacionadas ao site, e para fins de marketing e promoções.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0A0A0A]">3. Compartilhamento de Informações</h2>
        <p className="mb-4">
          Não vendemos, trocamos ou alugamos suas informações pessoais de identificação para terceiros. Podemos compartilhar informações demográficas agregadas genéricas não vinculadas a nenhuma informação de identificação pessoal com nossos parceiros de negócios, afiliados confiáveis e anunciantes.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0A0A0A]">4. Segurança</h2>
        <p className="mb-4">
          Adotamos práticas adequadas de coleta, armazenamento e processamento de dados e medidas de segurança para proteger contra acesso não autorizado, alteração, divulgação ou destruição de suas informações pessoais.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0A0A0A]">5. Seus Direitos</h2>
        <p className="mb-4">
          Você tem o direito de solicitar acesso, correção, atualização ou exclusão de suas informações pessoais. Para exercer esses direitos, entre em contato conosco através dos canais de atendimento disponíveis no site.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0A0A0A]">6. Alterações a Esta Política de Privacidade</h2>
        <p className="mb-4">
          A CBMaq tem a discrição de atualizar esta política de privacidade a qualquer momento. Ao fazê-lo, revisaremos a data atualizada na parte inferior desta página. Encorajamos os usuários a verificar frequentemente esta página para quaisquer alterações.
        </p>

        <p className="mt-8 text-sm text-[#4d5c7e]">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
