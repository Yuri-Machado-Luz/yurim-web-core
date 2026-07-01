import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col h-[65vh] items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-3xl font-semibold">Página Não Encontrada</h2>
      <p className="tracking-widest">A rota acessada não está disponível.</p>
      <Link href="/" className="text-primary hover:underline mt-4">
        Voltar para a Página Inicial
      </Link>
    </section>
  );
}
