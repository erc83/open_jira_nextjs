import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  //return NextResponse.rewrite(new URL('/about-2', request.url))

    if (request.nextUrl.pathname.startsWith('/api/entries/') ) {
      const id = request.nextUrl.pathname.replace('/api/entries/','');
      const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
      // console.log(id)
      // console.log({ id })
      if( !checkMongoIDRegExp.test(id) ) {
        const url = request.nextUrl.clone()

        url.pathname = '/api/entries/bad-request'

        url.search = `?message=${ id } is not valid a mongoID`   // enviando el mensaje para que lo reciba el bad-request

        return NextResponse.rewrite(url);
      }

    }

    return NextResponse.next();  // deja que el usuario prosiga a lla ruta solicitada
}

// Supports both a single string value or an array of matchers
export const config = {
    //matcher: ['/about/:path*', '/dashboard/:path*'],  // ejemplo documentacion
    matcher: '/api/entries/:id*'   
} 