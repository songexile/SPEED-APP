import { useEffect, useState } from 'react'
import { CustomNavButtons, CustomButtonIcon } from '.'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
import { DecodedToken } from '@/types'
import jwt_decode from 'jwt-decode'

const Nav = () => {
  const [role, setRole] = useState('')
  const { data: session } = useSession()
  const user: User | any = session?.user

  useEffect(() => {
    if (user) {
      // Get User Role
      const token = user.accessToken
      const decodedToken: DecodedToken = jwt_decode(token)
      const userRole = decodedToken.role

      setRole(userRole)
    }
  }, [user])

  const homeIconPath =
    'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'

  const searchIconPath =
    'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'

  const submitIconPath = 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'

  const analystIconPath =
    'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'

  const moderatorIconPath =
    'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'

  const adminIconPath =
    'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'

  const navItems = [
    { role: 'user', href: '/', iconPath: homeIconPath, label: 'Home', className: 'ml-2' },
    { role: 'user', href: '/search', iconPath: searchIconPath, label: 'Search', className: 'ml-3' },
    { role: 'user', href: '/submit', iconPath: submitIconPath, label: 'Submit', className: 'ml-3' },
    { role: 'analyst', href: '/analyst', iconPath: analystIconPath, label: 'Analyst', className: 'ml-4' },
    { role: 'moderator', href: '/moderator', iconPath: moderatorIconPath, label: 'Moderator', className: 'ml-7' },
    { role: 'admin', href: '/analyst', iconPath: analystIconPath, label: 'Analyst', className: 'ml-4' },
    { role: 'admin', href: '/moderator', iconPath: moderatorIconPath, label: 'Moderator', className: 'ml-7' },
    { role: 'admin', href: '/admin', iconPath: adminIconPath, label: 'Admin', className: 'ml-3' },
  ];

  return (
    <div className="btm-nav hidden sm:flex">
      {navItems.map(
        (item, index) =>
          (role === item.role || item.role === 'user') && (
            <CustomNavButtons
              key={index}
              href={item.href}
              icon={<CustomButtonIcon path={item.iconPath} className={item.className} />}
              label={item.label}
            />
          )
      )}
    </div>
  )
}

export default Nav
