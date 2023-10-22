import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { navLinks } from '@/constants/index'
import { signOut, useSession } from 'next-auth/react'
import { User } from 'next-auth'
import { DecodedToken } from '@/types'
import jwt_decode from 'jwt-decode'

const TopNav = () => {
  const [username, setUserName] = useState('')
  const [role, setRole] = useState('')
  const [toggle, setToggle] = useState(false)
  const { data: session } = useSession()
  const user: User | any = session?.user

  useEffect(() => {
    if (user) {
      // Get User Role
      const token = user.accessToken
      const decodedToken: DecodedToken = jwt_decode(token)
      const userRole = decodedToken.role

      // Get Admin Username
      const userName = decodedToken.username
      const userNameCapitalized = userName.charAt(0).toUpperCase() + userName.slice(1)

      setRole(userRole)
      setUserName(userNameCapitalized)
    }
  }, [user])

  const toggleMenu = () => {
    setToggle(!toggle)
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar bg-base-100">
        <div className="flex-none sm:hidden dropdown dropdown-bottom">
          <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          {toggle && (
            <ul className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <div>{link.text}</div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex-1">
          <div className="btn btn-ghost normal-case text-xl">
            <Image src="/favicon.ico" width={25} height={25} alt="icon" />
            <Link href="/">Next Gen</Link>
          </div>
        </div>
        {user ? (
          <div className="dropdown dropdown-end">
            <div className="flex flex-col md:flex-row items-center">
              <span className="mr3">{`Welcome Back, ${username}`}</span>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://t4.ftcdn.net/jpg/01/18/03/35/240_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg" />
                </div>
              </label>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>{`Role: ${role}`}</a>
              </li>
              <li>
                <Link href="/submit">Submit</Link>
              </li>
              {role === 'admin' && (
                <>
                  <li>
                    <Link href="/moderator">Moderator Dashboard</Link>
                  </li>
                  <li>
                    <Link href="/analyst">Analyst Dashboard</Link>
                  </li>
                  <li>
                    <Link href="/admin">Admin Dashboard</Link>
                  </li>
                </>
              )}
              {role === 'analyst' && (
                <li>
                  <Link href="/analyst">Analyst Dashboard</Link>
                </li>
              )}
              {role === 'moderator' && (
                <li>
                  <Link href="/moderator">Moderator Dashboard</Link>
                </li>
              )}
              <li>
                <a onClick={() => signOut({ callbackUrl: '/' })}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default TopNav
