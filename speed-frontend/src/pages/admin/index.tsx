import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { DecodedToken, User } from '@/types/index'
import Sidebar from '@/components/Dashboard/Sidebar'
import { toast } from 'react-toastify'
import CardComponent from '@/components/Dashboard/CardComponent'

const Admin = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [userName, setUserName] = useState('')

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
            <div className="h-fit flex-1 p-7 mb-52">
              <h1 className="text-2xl font-semibold mb-12">{`Welcome Back, ${userName}`}</h1>

              {/* Content */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardComponent
                  title="Total Submission Articles"
                  count={1000}
                  icon={
                    // https://iconsvg.xyz/
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7be63e"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  }
                />

                <CardComponent
                  title="Total Moderator Articles"
                  count={1000}
                  icon={
                    // https://iconsvg.xyz/
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7be63e"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  }
                />

                <CardComponent
                  title="Total Analyst Articles"
                  count={1000}
                  icon={
                    // https://iconsvg.xyz/
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7be63e"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  }
                />

                <CardComponent
                  title="Total Accounts"
                  count={5}
                  icon={
                    // https://iconsvg.xyz/
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7be63e"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
          <Nav />
        </div>
      </section>
    </main>
  )
}

export default Admin
