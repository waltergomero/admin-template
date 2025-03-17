import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { privateRoues } from "./routes"
 

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
 const isLoggedIn = !!req.auth;
 const {nextUrl} = req;

 const url = "http://localhost:3000";

 const isPrivateRoute = privateRoues.includes(nextUrl.pathname);
 const isAuthRoute = nextUrl.pathname === "/signin";
 const isApiRoute = nextUrl.pathname.startsWith("/api");

    if(isApiRoute) return;

    if(isLoggedIn && isAuthRoute) {
        return Response.redirect(`${url}/dashboard`);
    }

    if(isAuthRoute && !isLoggedIn) {
        return;
    } 

    if(isPrivateRoute && !isLoggedIn) {
        return Response.redirect(`${url}/signin`);
    }
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/", "/(api|trpc)(.*)"],
};