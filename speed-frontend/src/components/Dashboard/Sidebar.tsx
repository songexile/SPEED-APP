import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Sidebar = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const toggleSidebar = () => {
    setOpen(!open)
  }

  const Menus = [
    { title: 'Dashboard', route: '/admin' },
    { title: 'Accounts', route: '/admin/accounts' },
    { title: 'Articles', route: '/admin/articles', gap: true },
    { title: 'Log Out', route: session ? null : '/logout' },
  ]

  return (
    <>
      {/* Ref: https://github.com/Sridhar-C-25/sidebar_reactTailwind */}
      <div
        className={` ${
          open ? 'w-30' : 'w-0'
        } bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
      >
        {/* Sidebar */}
        <div className="flex sm:hidden gap-x-4 items-center">
          <button className="btn btn-square btn-ghost ml-[-25px]" onClick={toggleSidebar}>
            {!open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7be63e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h13M12 5l7 7-7 7" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7be63e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H6M12 5l-7 7 7 7" />
              </svg>
            )}
          </button>
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
                  router.push('/')
                  signOut()
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
