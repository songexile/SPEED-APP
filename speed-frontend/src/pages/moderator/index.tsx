import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { DecodedToken, User } from '../../types/index'
import { toast } from 'react-toastify'
import { GETTING_SESSION_DELAY } from '@/constants'

const Moderator = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isModerator, setIsModerator] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const redirectToHomePage = () => {
      router.push('/')
    }

    // Check if the session remains undefined or null after a delay
    const sessionCheckTimeout = setTimeout(() => {
      if (!session) {
        // Redirect authenticated (NON logged-in) users to another page
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
      } else {
        setLoading(true)
        const user: User | undefined = session?.user

        // If the session.user object is not available or accessToken is missing
        if (!user || !user.accessToken) {
          redirectToHomePage()
          return
        }

        // Get user role
        const token = user.accessToken
        const decodedToken: DecodedToken = jwt_decode(token)
        const userRole = decodedToken.role

        if (userRole !== 'moderator' && userRole !== 'admin') {
          // Redirect or deny access to unauthorized users
          toast.error('Only Moderator and Admin can access this page!', {
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
        } else if (userRole === 'moderator' || userRole === 'admin') {
          setTimeout(() => {
            setIsModerator(userRole === 'moderator')
            setIsAdmin(userRole === 'admin')
            setLoading(false)
          }, GETTING_SESSION_DELAY)
        }
      }
    }, GETTING_SESSION_DELAY)

    return () => clearTimeout(sessionCheckTimeout)
  }, [session, router])

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Moderator Dashboard" />

        {loading ? (
          // Show loading skeleton while fetching data
          <div className="bg-base-100 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg"></span>
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          <>
            {isModerator || isAdmin ? (
              <div className="relative bg-base-100 items-center justify-center min-h-screen">
                <h1>Moderator Dashboard</h1>
                <Nav />
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default Moderator
