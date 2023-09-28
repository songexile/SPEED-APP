import { IconProps } from '@/types'

const CustomButtonIcon: React.FC<IconProps> = ({ path, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
    </svg>
  )
}

export default CustomButtonIcon
