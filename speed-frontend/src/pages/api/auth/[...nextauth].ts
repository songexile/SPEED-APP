import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'next-gen cise',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Check if credentials is defined and contains email and password
        if (credentials?.email && credentials?.password) {
          const payload = {
            email: credentials.email,
            password: credentials.password,
          };

          const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_URI;

          try {
            const res = await fetch(`${apiUrl}auth/login`, {
              method: 'POST',
              body: JSON.stringify(payload),
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.message || 'Authentication failed');
            }

            const user = await res.json();

            return user;

          } catch (error: any) {
            throw new Error(error.message || 'Authentication failed');
          }
        } else {
          // Handle the case where credentials are missing
          throw new Error('Invalid credentials');
        }
      },
    }),
    // Add more providers here if needed
  ],
  secret: process.env.NEXT_PUBLIC_API_JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
          userRole: user.role
        };
      }

      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.userRole = token.userRole;
      }

      return session;
    },

  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
});
