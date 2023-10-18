import { TopNav, Nav } from '@/components'
import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { DecodedToken, User } from '@/types/index'
import Sidebar from '@/components/Dashboard/Sidebar'
import { toast } from 'react-toastify'
import CardComponent from '@/components/Dashboard/CardComponent'
import { GETTING_SESSION_DELAY } from '@/constants'

const Admin = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [userName, setUserName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_URI

  const [count, setCount] = useState({
    totalModeratorArticles: 0,
    totalAnalystArticles: 0,
    totalSpeedArticles: 0,
    totalAccounts: 0,
  })

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

        const fetchData = async () => {
          try {
            // Create an array of promises for parallel requests
            const requests = [
              fetch(`${API_ENDPOINT}moderator`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }),
              fetch(`${API_ENDPOINT}analyst`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }),
              fetch(`${API_ENDPOINT}speed`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }),
              fetch(`${API_ENDPOINT}auth`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }),
            ]

            // Execute all requests in parallel
            const responses = await Promise.all(requests)

            // Check responses and update the state
            const data = await Promise.all(
              responses.map(async (response) => {
                if (response.ok) {
                  return response.json()
                } else {
                  throw new Error('Error Fetching Data')
                }
              })
            )

            setCount({
              totalModeratorArticles: data[0].length,
              totalAnalystArticles: data[1].length,
              totalSpeedArticles: data[2].length,
              totalAccounts: data[3].length,
            })
          } catch (error) {
            toast.error('Error Fetching Data!', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            })
          }
        }

        if (userRole !== 'admin') {
          // Redirect or deny access to unauthorized users
          toast.error('Only Admin can access this page!', {
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
        } else {
          fetchData()
          setIsAdmin(true)
          setTimeout(() => {}, GETTING_SESSION_DELAY)
        }
      }
    }, GETTING_SESSION_DELAY)

    return () => clearTimeout(sessionCheckTimeout)
  }, [session, router])

  return (
    <main>
      <section className="bg-base-100">
        <Meta title="Next Gen SPEED App" description="Admin Dashboard" />
        <TopNav />
        {isAdmin ? (
          <div className="relative items-center justify-center min-h-screen">
            <div className="flex">
              {/* Sidebar */}
              <Sidebar />
              <div className="h-fit flex-1 p-7 mb-52">
                <h1 className="text-2xl font-semibold mb-12">{`Welcome Back, ${userName}`}</h1>

                {/* Content */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                  <CardComponent
                    title="Total Moderator Articles"
                    count={count.totalModeratorArticles}
                    icon={
                      // https://iconsvg.xyz/
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7be63e"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                        <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                      </svg>
                    }
                    isLoading={!count.totalModeratorArticles}
                  />
                  <CardComponent
                    title="Total Analyst Articles"
                    count={count.totalAnalystArticles}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7be63e"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                        <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                      </svg>
                    }
                    isLoading={!count.totalAnalystArticles}
                  />
                  <CardComponent
                    title="Total SPEED Articles"
                    count={count.totalSpeedArticles}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7be63e"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                        <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                      </svg>
                    }
                    isLoading={!count.totalSpeedArticles}
                  />
                  <CardComponent
                    title="Total Accounts"
                    count={count.totalAccounts}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7be63e"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                        <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                      </svg>
                    }
                    isLoading={!count.totalAccounts}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative bg-base-100 items-center justify-center min-h-screen">
            <div className="flex">
              {/* Sidebar */}
              <Sidebar />
              <div className="h-fit flex-1 p-7 mb-52">
                <h1 className="text-2xl font-semibold mb-12">{`Welcome Back, ${userName}`}</h1>
              </div>
            </div>
          </div>
        )}
        <Nav />
      </section>
    </main>
  )
}

// Add the requireAuth property to the page component
// To protect the page from unauthenticated users
Admin.requireAuth = true

export default Admin
