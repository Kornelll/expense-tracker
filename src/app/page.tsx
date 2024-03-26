import Image from 'next/image'
import { AuthForm } from '@/components/ui/auth-form'
import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/auth'

const TITLE = 'Welcome Dear!'
const DESCRIPTION =
  'Welcome to our Expense Tracker app! Take control of your finances effortlessly with our intuitive and user-friendly platform.'

export default async function Home() {
  const session = await getAuthSession()
  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section */}
      <section className="grid place-items-center m-10">
        <div className="grid gap-4 w-[360px]">
          <h1 className="text-3xl text-center font-extrabold">{TITLE}</h1>
          <p className="text-sm text-center text-muted-foreground">
            {DESCRIPTION}
          </p>
          <AuthForm />
        </div>
      </section>

      {/* Right Section */}
      <section className="p-4 hidden lg:block">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src="/signup.jpg"
            alt="Sign Up"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </main>
  )
}
