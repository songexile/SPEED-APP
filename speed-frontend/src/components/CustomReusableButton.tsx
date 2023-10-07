import { CustomReusableButtonProps } from '../types/index'

const CustomReusableButton: React.FC<CustomReusableButtonProps> = ({
  text,
  className, // Optional
  onClick, // Optional
  type = 'button', // Optional
  disabled = false, // Optional
  title, // Optional
}) => {
  return (
    <button
      className={`${className || ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      title={title}
    >
      {text}
    </button>
  )
}

export default CustomReusableButton
