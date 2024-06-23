// app/page.tsx
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignInButton() {
  const { data: session } = useSession();

  return (
    <div>
      {!session || !session.user? (
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      ) : (
        <>
          <button onClick={() => signOut()}>Sign out</button>
          <div>Welcome, {session.user?.name}</div>
        </>
      )}
    </div>
  );
}
