'use client';

import React, { Fragment } from 'react';
import { useState, useEffect } from "react";
import Button from "@/components/ui/button/button";
import Input from "@/components/form/input/inputField";
import Label from "@/components/form/label";
import SocialButtons from './social-buttons';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { ArrowRightIcon, AtSymbolIcon,  KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { ZodErrors } from "@/components/common/zod-errors";
import { doCredentialLogin } from '@/actions/user-actions';
import { useSearchParams } from 'next/navigation';



const SigninForm = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const router = useRouter();
  const [state, setState] = useState(null);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(error === 'OAuthAccountNotLinked'){
          toast.error("This email was registered with email and passowrd. Please sign in using your credentials.")
      }
    }, [])
  
  
 
  async function onSubmit(event) {
    event.preventDefault();
    try {
        const formData = new FormData(event.currentTarget);
        const response = await doCredentialLogin(formData);
        if (response.error) {
            setState(response);
            toast.error(response.error);
        } else {
            router.push("/admin");
        }
    } catch (e) {
      toast.error("Check your Credentials: " + e);
    }
 }

  return (
    <Fragment>
   <div className="w-full max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <SocialButtons/>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4"  >
      <div className="relative">
      <Label> Email: <span className="text-error-500">*</span>{" "}</Label>
        <Input
         name="email"
          placeholder="Email"
          className="pl-8"
          type="email"
          autoComplete="email"
        /><AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <ZodErrors error={state?.zodErrors?.email} />
        <div className="relative">
        <Label> Password: <span className="text-error-500">*</span>{" "}</Label>
        <Input
          name="password"
          placeholder="Password"
          className="pl-8"
          value={password}
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
        />
          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <span onClick={() => setVisible(!visible)} className="cursor-pointer absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
             {!visible ? <EyeSlashIcon /> : <EyeIcon />} 
            </span>
        </div>
        <ZodErrors error={state?.zodErrors?.password} />
        <Button className="w-full" variant="submit" type="submit">
          Sign In <ArrowRightIcon className="h-5 w-5 text-gray-50" />
        </Button>
      </form>

      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/register">Don&apos;t have an account? Sign up</Link>
        </Button>
      </div>
    </div>
    </Fragment>
  )
}

export default SigninForm