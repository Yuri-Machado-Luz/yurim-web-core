import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// O next-intl cuida automaticamente de verificar os locales e redirecionar para o padrão
export default createMiddleware(routing);

export const config = {
  // Corresponde a todos os caminhos, exceto os arquivos estáticos listados abaixo
  matcher: [
    "/",
    "/(pt-BR|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
