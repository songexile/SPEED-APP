import { useRouter } from 'next/router'
import Link from 'next/link'

import { CustomNavButtonsProps } from '@/types'

const CustomNavButtons: React.FC<CustomNavButtonsProps> = ({ href, icon, label }) => {
  const router = useRouter()

  // Check if the current route matches the 'href' prop to determine if the button is active
  const isActive = router.pathname === href
  const buttonClassName = isActive ? 'active bg-primary text-accent border-blue-600' : 'bg-primary'

  return (
    <Link href={href} className={buttonClassName}>
      <button className="bg-primary text-accent">
        {icon}
        <span className="btm-nav-label">{label}</span>
      </button>
    </Link>
  )
}

export default CustomNavButtons
