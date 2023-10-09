import { Meta } from '@/layouts/Meta'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import { Nav, CustomReusableButton } from '@/components'

export default function Home() {
  const { data: session } = useSession()

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="This is Next Gen Group SPEED APP For CISE (2023)" />
        <div className="relative bg-base-100 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-6xl font-bold text-center">Welcome to SPEED!</h1>
          <p className="text-center">
            The best place to find true{' '}
            <span className="bg-secondary font-bold"> software engineering claims! </span>
          </p>
          {/* Buttons */}
          <div className="flex flex-col mt-16 w-1/3 sm:w-1/6 space-y-4">
            {session ? (
              <CustomReusableButton
                text="Sign Out ↪"
                className="btn btn-warning"
                onClick={() => signOut()}
              />
            ) : (
              <>
                <CustomReusableButton
                  text="Login 🔍"
                  className="btn btn-primary"
                  onClick={() => signIn()}
                />
                <Link href="/register" className="btn btn-secondary md:text-[17px]">
                  <CustomReusableButton className="uppercase" text="Create an Account ⭐" />
                </Link>
              </>
            )}
          </div>
          <Nav />
        </div>
      </section>
    </main>
  )
}
