import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { DecodedToken, User } from '@/types/index'
import Sidebar from '@/components/Dashboard/Sidebar'

const Accounts = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const redirectToHomePage = () => {
      router.push('/')
    }

    // Redirect authenticated (NON logged-in) users to another page
    if (!session) {
      redirectToHomePage()
      return
    }

    const user: User | undefined = session?.user

    // If the session.user object is not available or accessToken is missing
    if (!user || !user.accessToken) {
      redirectToHomePage()
      return
    }

    // Get User Role
    const token = user.accessToken
    const decodedToken: DecodedToken = jwt_decode(token)
    const userRole = decodedToken.role

    // Get Admin Username
    const userName = decodedToken.username
    const capitalized = userName.charAt(0).toUpperCase() + userName.slice(1)
    setUserName(capitalized)

    if (userRole !== 'admin') {
      // Redirect or deny access to unauthorized users
      redirectToHomePage()
    }
  }, [session, router])

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Admin Dashboard" />
        <div className="relative bg-base-100 items-center justify-center min-h-screen">
          <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            <div className="h-screen flex-1 p-7">
              <h1 className="text-2xl font-semibold ">Account List Below</h1>
            </div>
          </div>
          <Nav />
        </div>
      </section>
    </main>
  )
}

export default Accounts
