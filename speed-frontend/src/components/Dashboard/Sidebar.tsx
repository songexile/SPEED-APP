import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Sidebar = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const Menus = [
    { title: 'Dashboard', route: '/admin' },
    { title: 'Accounts', route: '/accounts' },
    { title: 'Articles', route: '/articles', gap: true },
    { title: 'Log Out', route: session ? null : '/logout' },
  ]

  return (
    <>
      {/* Ref: https://github.com/Sridhar-C-25/sidebar_reactTailwind */}
      <div
        className={` ${
          open ? 'w-72' : 'w-20 '
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        {/* Sidebar */}
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
              onClick={() => {
                // Handle sign-out or navigation
                if (Menu.route === null) {
                  signOut() // Sign out when "Log Out" is clicked
                } else {
                  router.push(Menu.route)
                }
              }}
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
    </>
  )
}

export default Sidebar
