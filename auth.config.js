import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import { userSigninSchema } from "@/schemas/validation-schemas";
import fetchUserByEmail from "@/actions/user-actions";
import NextAuth from "next-auth"
import { prisma } from "@/prisma/prisma"

export default {
    providers: [
      Credentials({
        credentials: {
            email: {},
            password: {},
        },
        async authorize(credentials) {
  
            const validateFields = userSigninSchema.safeParse(credentials);

            if (validateFields.error) {
                throw new Error(validateFields.error.message);
            }

            const { email, password } = credentials;
            
            try {         
               const user = await prisma.User.findUnique({where: {email: email}});
               if(!user.password) {
                throw new Error("Another account already exists with the same e-mail address. This email was registered with Google app.");
               }

               if (user) {
                    const isMatch =  await bcryptjs.compare(password, user.password); 

                    if (isMatch) {
                        return user;
                    } else {
                        throw new Error("Password is not correct");
                    }
                } else {
                    throw new Error("User not found");
                }
            } catch (error) {
                throw new Error(error);
            }
        },
    }),
    GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
        // authorization: {
        //     params: {
        //         prompt: "consent",
        //         access_type: "offline",
        //         response_type: "code",
        //     },
        // },
    }),
    Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        // authorization: {
        //     params: {
        //         prompt: "consent",
        //         access_type: "offline",
        //         response_type: "code",
        //     },
        // },
        
    }),
    ],
    
     };