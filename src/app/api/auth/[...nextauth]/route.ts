// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';

// const users = [
//   {
//     id: 1,
//     name: 'John Doe',
//     email: 'dummy@groq.com',
//     password: bcrypt.hashSync('groqspeed', 10),
//   },
//   // Add more users as needed
// ];

// const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials: { username: string; password: string } | undefined, req: any) {
//         if (!credentials) {
//           return null;
//         }

//         const user = users.find(
//           (u) => u.email === credentials.username
//         );

//         if (user && bcrypt.compareSync(credentials.password, user.password)) {
//           return { id: user.id.toString(), name: user.name, email: user.email };
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: any) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       session.user.id = token.id;
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/auth/signin',
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


// pages/api/auth/[...nextauth].js
// pages/api/auth/[...nextauth].js
// pages/api/auth/[...nextauth].ts
// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// const handler =  NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID??"",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET??"",
      
//     }),
//   ],
//   // callbacks: {
//   //   async signIn({ account, profile }) {
//   //     return true;
//   //   },
//   //   async jwt({ token, account }) {
//   //     if (account) {
//   //       token.accessToken = account.access_token;
//   //     }
//   //     return token;
//   //   },
//   //   async session({ session, token }) {
//   //     session.accessToken = token.accessToken as string;
//   //     return session;
//   //   },
//   },
// );

//  export { handler as GET, handler as POST };

import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextRequest } from 'next/server';

export const auth_options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/calendar'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      console.log(session.accessToken);
      return session;
    }
  }
};

const handler = NextAuth(auth_options);

export { handler as GET, handler as POST };
