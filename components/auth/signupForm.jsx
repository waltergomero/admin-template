'use client';

import React, { Fragment } from 'react';
import { useState, useEffect } from "react";
import Button from "@/components/ui/button/button";
import Input from "@/components/form/input/inputField";
import Label from "@/components/form/label";
import SocialButtons from '../auth/social-buttons';
import Link from 'next/link';
import { ArrowRightIcon, AtSymbolIcon, UserIcon,  KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { ZodErrors } from "@/components/common/zod-errors";
import { createUser } from '@/actions/user-actions';


const SignUpForm = () => {
  const [state, setState] = useState(null);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");

  async function onSubmit(event) {
      event.preventDefault();
      setState(null);
      
      const formData = new FormData(event.currentTarget);
      const response = await createUser(formData, true);
  
      if (response.error === "validation") {
              setState(response);
              toast.error(response.message);
          } 
      else if (response.error==="userexists") {
            toast.error(response.message);
          } 
      else {
            toast.error(response.error);
          }   
}

  return (
    <Fragment>
   <div className="w-full max-w-md mx-auto space-y-6 bg-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-2">Sign In</h1>
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
      <form onSubmit={onSubmit} className="space-y-2"  >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="relative">
      <Label> First Name: <span className="text-error-500">*</span>{" "}</Label>
        <Input
         name="first_name"
          placeholder="First name"
          className="pl-5"
          type="text"
        /><UserIcon className="pointer-events-none absolute  top-2/3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        <ZodErrors error={state?.zodErrors?.first_name} />
        </div>
        
      
      <div className="relative">
      <Label> Last Name: <span className="text-error-500">*</span>{" "}</Label>
        <Input
         name="last_name"
          placeholder="Last name"
          className="pl-5"
          type="text"
        /><UserIcon className="pointer-events-none absolute top-2/3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        <ZodErrors error={state?.zodErrors?.last_name} />
        </div>
        
      <div className="relative col-span-full">
      <Label> Email: <span className="text-error-500">*</span>{" "}</Label>
        <Input
         name="email"
          placeholder="Email"
          className="pl-6"
          type="email"
          autoComplete="email"
        /><AtSymbolIcon className="pointer-events-none absolute left-1 top-2/3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        <ZodErrors error={state?.zodErrors?.email} />
        </div>
        
        <div className="relative col-span-full">
        <Label> Password: <span className="text-error-500">*</span>{" "}</Label>
        <Input
          name="password"
          placeholder="Password"
          className="pl-6"
          value={password}
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
        />
          <KeyIcon className="pointer-events-none absolute left-1 top-2/3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <span onClick={() => setVisible(!visible)} className="cursor-pointer absolute right-3 top-2/3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
             {!visible ? <EyeSlashIcon /> : <EyeIcon />} 
            </span>
            <ZodErrors error={state?.zodErrors?.password} />
        </div>
        
        <Button className="w-full mt-4" size="sm" type="submit">
          Sign Up <ArrowRightIcon className="h-5 w-5 text-gray-50" />
        </Button>
        </div>
      </form>

        <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                You already have an account? {""}
                <Link  href="/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400" >
                  Sign In
                </Link>
              </p>
        </div>
    </div>
    </Fragment>
  )
}

export default SignUpForm