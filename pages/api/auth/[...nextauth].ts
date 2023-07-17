import NextAuth, { AuthOptions } from 'next-auth';
import {} from 'next-auth/react'
import GoogleProvider from 'next-auth/providers/google';

const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: '',
            clientSecret: '',
        }),
    ],
};

export default NextAuth(authOptions);
