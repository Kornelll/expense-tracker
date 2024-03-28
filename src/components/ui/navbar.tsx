'use client'

import { FC } from 'react'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { LogOutIcon } from 'lucide-react'
import { Session } from 'next-auth'

interface NavbarProps {
  user: Session['user']
}

export const Navbar: FC<NavbarProps> = ({ user }) => {
  const handleSignOut = () => signOut({ callbackUrl: '/' })

  return (
    <nav className="w-full bg-background shadow-md">
      <div className="xl:container xl:mx-auto">
        <div className=" flex items-center justify-between px-5 md:px-10 py-4">
          <Avatar image={user?.image} />

          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="bg-muted hover:bg-muted-foreground/20"
          >
            <LogOutIcon className="h-4 mr-1" />
            <span className="hidden md:inline-flex">Log Out</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
