
'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { getSession } from 'next-auth/react';

export default function DashNav() {
    const router = useRouter();
    const session = getSession();
  session.then((session) => {
    if(!session || !session.user){
        router.push("/auth/signin");

      
    }
  })
  
  const handlesignout = async () => {
    
    try {
        // Add your sign out logic here
        // Example: await signOut();

        await signOut();
        router.push('/auth/signin');
        
      } catch (error) {
        console.error('Error signing out:', error);
      }


    }

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">
        <Link href="/dashboard" className="text-white hover:text-gray-300">
          Schedulio
        </Link>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handlesignout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};