import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return adminEmails().includes(email.toLowerCase())
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async signIn({ user }) {
      return isAdminEmail(user.email)
    },
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email
        token.isAdmin = isAdminEmail(user.email)
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = (token.email as string) ?? session.user.email
        ;(session.user as { isAdmin?: boolean }).isAdmin = Boolean(
          (token as { isAdmin?: boolean }).isAdmin,
        )
      }
      return session
    },
  },
})

export async function requireAdmin() {
  const session = await auth()
  if (!session?.user || !isAdminEmail(session.user.email)) {
    throw new Error("Unauthorized")
  }
  return session
}
