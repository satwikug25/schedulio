"use client"

import { getSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Navbar from '@/app/components/Navbar';

export default function SignIn() {
  const router = useRouter();
  
  const session = getSession();
 

  const [show,setShow] = useState(true);

  session.then((session) => {
    if(session && session.user){
      setShow(false)
      router.push('/form/');
    }
  })



  return (
    
    <div>
      <Navbar/>
    </div>
  )
}