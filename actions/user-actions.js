"use server";

import bcryptjs from "bcryptjs";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { unstable_noStore as noStore } from 'next/cache';
import { userSignupSchema, userSigninSchema, userUpdateSchema } from "@/schemas/validation-schemas";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


// create user 
export async function createUser( formData, signup=false) {
  const redirectPath = signup ? "/login" : "/admin/users";

  try {
    const _isAdmin = formData.get("isadmin");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const name = formData.get("first_name") + ", " + formData.get("last_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const isadmin = _isAdmin ? true : false;
    const isactive = true;
    const provider = "credentials";
    const type = signup ? "credentials" : "created_by_admin";
    const created_by = signup ? formData.get("email") : formData.get("created_by");
    const updated_by = signup ? formData.get("email") : formData.get("updated_by");

    const validatedFields = userSignupSchema.safeParse({
      first_name,
      last_name,
      email,
      password
    });


    if (!validatedFields.success) {
      return {
        error: "validation",
        zodErrors: validatedFields.error.flatten().fieldErrors,
        strapiErrors: null,
        message: "Missing information on key fields.",
      };
    }
  
    else{

    const userexists = await prisma.User.findUnique({ where: {email: email}});
    if (userexists) {
      return { 
        error: "userexists",
        message: `User with this email account ${email} already exists.`, 
        }
      }
      
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = {
      first_name,
      last_name,
      name,
      email,
      password: hashedPassword,
      isadmin,
      isactive,
      provider,
      type,
      created_by: created_by,
      updated_by: updated_by,
    };

    await prisma.User.create({data:newUser});
  }

  } catch (err) {
    return { error: "Failed to insert new user!" + err};
  }

  revalidatePath(redirectPath);
  redirect(redirectPath);
}

//login using user credentials
export async function doCredentialLogin(formData) {
    try {
      const email = formData.get("email");
      const password = formData.get("password");
  
      const validatedFields = userSigninSchema.safeParse({email, password});
  
      if (!validatedFields.success) {
        return {
          error: "Missing information on key fields.",
          zodErrors: validatedFields.error.flatten().fieldErrors,
          strapiErrors: null,
        };
      }
  
      await signIn("credentials", {email, password, redirect: false,});
      return { success: true };
    } 
    catch (error) {
      if (error instanceof AuthError) {
        return { error: error.cause?.err?.message };
      }
      return { error: "error 500" };
    }
   
  }
