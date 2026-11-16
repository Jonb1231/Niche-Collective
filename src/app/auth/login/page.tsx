import { signIn } from "@/features/auth/actions";

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const configured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return <main className="mx-auto max-w-md p-8"><h1 className="text-3xl mb-8">Sign in</h1>
    {!configured ? <p>Connect your hosted Supabase project to enable sign in.</p> :
      <form action={signIn} className="grid gap-4">
        {error && <p role="alert">Sign in failed. Check your details and try again.</p>}
        <label>Email<input className="block w-full border p-3" name="email" type="email" required autoComplete="email" /></label>
        <label>Password<input className="block w-full border p-3" name="password" type="password" required autoComplete="current-password" /></label>
        <button className="bg-black text-white p-3">Sign in</button>
      </form>}
  </main>;
}
