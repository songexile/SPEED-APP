import { CardProps } from '@/types/index'

const CardComponent: React.FC<CardProps> = ({ title, count, icon }) => {
  return (
    <div className="rounded-sm border border-stroke py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {icon}
      </div>

      <div className="mt-4 ml-5 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold">{count}</h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  )
}

export default CardComponent
