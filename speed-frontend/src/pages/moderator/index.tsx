import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { DecodedToken, User } from '../../types/index'
import { toast } from 'react-toastify'

const Moderator = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const redirectToHomePage = () => {
      router.push('/')
    }

    // Redirect authenticated (NON logged-in) users to another page
    if (!session) {
      toast.error('You need to log in to access this page!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      redirectToHomePage()
      return
    }

    const user: User | undefined = session?.user

    // If the session.user object is not available or accessToken is missing
    if (!user || !user.accessToken) {
      redirectToHomePage()
      return
    }

    const token = user.accessToken
    const decodedToken: DecodedToken = jwt_decode(token)
    const userRole = decodedToken.role

    if (userRole !== 'moderator' && userRole !== 'admin') {
      // Redirect or deny access to unauthorized users
      redirectToHomePage()
    }
  }, [session, router])

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Moderator Dashboard" />
        <div className="relative bg-base-100 items-center justify-center min-h-screen">
          <h1>Moderator Dashboard</h1>
          <Nav />
        </div>
      </section>
    </main>
  )
}

export default Moderator
