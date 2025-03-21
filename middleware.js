import authConfig from "./auth.config"
import { NextResponse } from 'next/server';
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)
 
export default auth((req) => {

    const { pathname } = req.nextUrl;
   // Check if the request is for an admin page

    if (pathname.startsWith('/dashboard')) {
        // Check if the user is authenticated
        const isAuthenticated = req.cookies.get('auth-token');
         if (!isAuthenticated) {
            // Redirect to login page if not authenticated
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
    // Allow the request to proceed if not an admin page or if authenticated
    return NextResponse.next();
})

 

export const config = {
    // matcher: ['/dashboard/:path*'],
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }

 

// import authConfig from "./auth.config"
// import NextAuth from "next-auth"
// import { privateRoues } from "./lib/routes"
 

// const { auth } = NextAuth(authConfig)

// export default auth(async (req) => {
//  const isLoggedIn = !!req.auth;
//  const {nextUrl} = req;

//  const url = "http://localhost:3000";

//  const isPrivateRoute = privateRoues.includes(nextUrl.pathname);
//  const isAuthRoute = nextUrl.pathname === "/signin";
//  const isApiRoute = nextUrl.pathname.startsWith("/api");

//     if(isApiRoute) return;

//     if(isLoggedIn && isAuthRoute) {
//         return Response.redirect(`${url}/dashboard`);
//     }

//     if(isAuthRoute && !isLoggedIn) {
//         return;
//     } 

//     if(isPrivateRoute && !isLoggedIn) {
//         return Response.redirect(`${url}/signin`);
//     }
// })

// export const config = {
//     matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/", "/(api|trpc)(.*)"],
// };