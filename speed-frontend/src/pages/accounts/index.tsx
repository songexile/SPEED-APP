import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { DecodedToken, User } from '@/types/index'

const Accounts = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [userName, setUserName] = useState('')
  const [open, setOpen] = useState(true)
  const Menus = [
    { title: 'Dashboard', route: '/admin' },
    { title: 'Accounts', route: '/accounts' },
    { title: 'Articles', route: '/articles', gap: true },
    { title: 'Log Out', route: '/logout' },
  ]

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
          {/* Ref: https://github.com/Sridhar-C-25/sidebar_reactTailwind */}
          <div className="flex">
            <div
              className={` ${
                open ? 'w-72' : 'w-20 '
              } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
            >
              <div className="flex gap-x-4 items-center">
                <h1
                  className={`text-white origin-left font-medium text-xl duration-200 ${
                    !open && 'scale-0'
                  }`}
                >
                  Next Gen App
                </h1>
              </div>
              <ul className="pt-6">
                {Menus.map((Menu, index) => (
                  <li
                    key={index}
                    className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
                    ${Menu.gap ? 'mt-9' : 'mt-2'} ${
                      router.asPath === Menu.route ? 'bg-light-white text-red-500' : ''
                    } `}
                    onClick={() => router.push(Menu.route)}
                  >
                    <span
                      className={`${router.asPath === Menu.route ? 'text-red-500' : ''} ${
                        !open && 'hidden'
                      } origin-left duration-200`}
                    >
                      {Menu.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
