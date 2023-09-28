import { CustomNavButtonsProps } from '@/types'
import Link from 'next/link'

const CustomNavButtons: React.FC<CustomNavButtonsProps> = ({ href, icon, label }) => {
  return (
    <Link href={href} className="bg-primary">
      <button className="bg-primary text-accent">
        {icon}
        <span className="btm-nav-label">{label}</span>
      </button>
    </Link>
  )
}

export default CustomNavButtons
