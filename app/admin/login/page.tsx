import { redirect } from "next/navigation"
import { auth, isAdminEmail, signIn } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Code2 } from "lucide-react"

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const session = await auth()
  const params = await searchParams

  if (session?.user && isAdminEmail(session.user.email)) {
    redirect(params.callbackUrl ?? "/admin")
  }

  const callbackUrl = params.callbackUrl ?? "/admin"

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Code2 className="h-6 w-6" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-foreground text-center">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground text-center">
          Use the Google account associated with the admin allowlist.
        </p>

        {params.error && (
          <div className="mt-6 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {params.error === "AccessDenied"
              ? "This Google account is not authorized."
              : "Sign-in failed. Please try again."}
          </div>
        )}

        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: callbackUrl })
          }}
          className="mt-8"
        >
          <Button type="submit" className="w-full">
            <GoogleMark />
            Continue with Google
          </Button>
        </form>

        <p className="mt-6 text-xs text-muted-foreground text-center">
          Only allow-listed emails can access the admin area.
        </p>
      </div>
    </div>
  )
}

function GoogleMark() {
  return (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.6 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.6-8.1 19.6-19.6 0-1.3-.1-2.6-.3-3.9z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.6 6.5 29.6 4 24 4 16.4 4 9.8 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.7-5.3l-6.3-5.2C29.6 35 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.2c-.4.4 6.4-4.7 6.4-14.7 0-1.3-.1-2.6-.4-3.5z"/>
    </svg>
  )
}
