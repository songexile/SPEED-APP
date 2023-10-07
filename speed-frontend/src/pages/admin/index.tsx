import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'

const Admin = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Redirect authenticated (NON logged-in) users to another page
    if (!session) {
      router.push('/')
    } else {
      if (session && session.user && session.user.accessToken) {
        const token = session.user.accessToken
        const decodedToken = jwt_decode(token)
        const userRole = decodedToken.role
        console.log(userRole)
        if (userRole !== 'admin') {
          // Redirect or deny access to unauthorized users
          router.push('/')
        }
      }
    }
  }, [session])

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Admin Dashboard" />
        <div className="relative bg-base-100 items-center justify-center min-h-screen">
          <h1>Admin Dashboard</h1>
          <Nav />
        </div>
      </section>
    </main>
  )
}

export default Admin
