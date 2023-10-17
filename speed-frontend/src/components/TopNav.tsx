import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { navLinks } from '@/constants/index'

const TopNav = () => {
  const [toggle, setToggle] = useState(false)

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
      </div>
    </div>
  )
}

export default TopNav
