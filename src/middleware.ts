import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  //return NextResponse.rewrite(new URL('/about-2', request.url))

    console.log(request.nextUrl)

    return NextResponse.next();  // deja que el usuario prosiga a lla ruta solicitada
}

// Supports both a single string value or an array of matchers
export const config = {
    //matcher: ['/about/:path*', '/dashboard/:path*'],  // ejemplo documentacion
    //matcher: '/api/entries/:path*'   // para recibir el path con el id
    matcher: '/api/entries/:id*'   // para recibir el path con el id
} 