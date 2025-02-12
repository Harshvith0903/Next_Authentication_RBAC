'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters'),
});

const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); 

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setError(null); // Clear previous errors

    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password, 
      redirect: false, 
    });

    if (signInData?.error) {
      setError("Invalid email or password"); 
      return;
    }

    // Fetch the user's role after successful sign-in
    const response = await fetch("/api/protected-route", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      setError("Failed to fetch user data");
      return;
    }

    let user = await response.json();
    user = user.user

    

    // Redirect users based on role
    if (user.role === "ADMIN") {
      router.push("/dashboard/admin");
    } else if (user.role === "UPLOAD_TEAM") {
      router.push("/dashboard/upload");
    } else if (user.role === "DRAFTSMAN") {
      router.push("/dashboard/draftsman");
    } else if (user.role === "SITE_INCHARGE") {
      router.push("/dashboard/site-incharge");
    } else {
      setError("Unauthorized access - No assigned role");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Enter your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <Button className='w-full mt-6' type='submit'>
          Sign in
        </Button>
      </form>
      
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      
      <div className='flex justify-center mt-4'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Sign up
        </Link>
      </div>
    </Form>
  );
};

export default SignInForm;
