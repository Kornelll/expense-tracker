'use client'

import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {children}
      <Toaster position="top-center" />
    </SessionProvider>
  )
}

export default Providers
