import Image from "next/image";
import Link from "next/link";

import { AnimatedEye, ErrorIcon } from "@/assets";
import { Button } from "@/components";

export default function NotFound() {
  return (
    <section className="flex flex-col h-[65vh] items-center justify-center">
      <Image
        src={ErrorIcon}
        alt="Erro 404"
        className="w-80 h-80 absolute -translate-y-25 -z-10 opacity-40"
      />
      <h2 className="text-3xl font-semibold bg-linear-to-r from-primary to-rose-500 bg-clip-text text-transparent">
        Página Não Encontrada
      </h2>
      <p className="tracking-widest">A rota acessada não está disponível.</p>
      <div className="group relative">
        <Image
          src={AnimatedEye}
          alt="Olho Animado"
          className="absolute w-40 h-40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity left-1/2 top-1/2 -translate-x-1/2 -translate-y-5/11 z-2"
        />
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-2 mt-4 pointer-events-auto relative"
        >
          <Link href="/">Voltar para a Página Inicial</Link>
        </Button>
      </div>
    </section>
  );
}
