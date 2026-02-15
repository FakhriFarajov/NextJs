import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Extend the Session type to include 'id' on user
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user!.email === "fakhri_farajov@mail.ru" && token.id) {
                session.user!.id! = typeof token.id === "string" ? token.id : String(token.id ?? "");
            } else {
                session.user!.id! = "";
            }
            return session;
        },
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };