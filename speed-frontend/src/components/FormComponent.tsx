import { Analyst, AnalystFormData } from '@/types'
import { ChangeEvent } from 'react'
import Skeleton from 'react-loading-skeleton'

const FormComponent = ({
  article,
  index,
  buttonDisabled,
  handleChange,
  handleSubmit,
  isLoading,
}: {
  article: Analyst
  index: number
  formData: AnalystFormData[]
  buttonDisabled: boolean[]
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => void
  handleSubmit: (index: number) => void
  isLoading: boolean
}) => {
  return isLoading ? (
    <Skeleton count={6} baseColor="#202020" highlightColor="#444" />
  ) : (
    <div className="container mt-8 md:w-1/2 p-4 sm:p-8 rounded-md border shadow-lg mb-8 lg:mb-32">
      <h2 className="mb-2 text-lg md:text-xl">
        <span className="font-bold">Author(s):</span> {article.authors}
      </h2>
      <p className="mb-2 text-sm md:text-base">
        <span className="font-bold">Title:</span> {article.title}
      </p>
      <p className="mb-2 text-sm md:text-base">
        <span className="font-bold">DOI:</span> {article.doi}
      </p>
      <p className="mb-2 text-sm md:text-base">
        <span className="font-bold">Year:</span> {article.year}
      </p>
      <div className="flex flex-col mb-4">
        <div className="flex items-center mb-2">
          <span className="font-bold">Agree/Disagree:</span>
          <input
            type="radio"
            name={`agreeDisagree-${index}`}
            value="Agree"
            className="radio radio-success ml-2"
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="radio"
            name={`agreeDisagree-${index}`}
            value="Disagree"
            onChange={(e) => handleChange(e, index)}
            className="radio radio-error ml-2"
          />
        </div>
        <div className="flex flex-col my-2">
          <div className="w-full sm:w-3/5 mb-3">
            <span className="font-bold sm:mr-4">Claim:</span>
            <input
              type="text"
              name="claim"
              placeholder="Type the claim here"
              className="input input-bordered input-primary w-full xs:max-w-xs"
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div className="w-full sm:w-3/5 mt-5">
            <span className="font-bold sm:mr-4">Software Engineering method:</span>
            <select
              name="method"
              className="select select-bordered w-full xs:max-w-xs bg-secondary"
              onChange={(e) => handleChange(e, index)}
            >
              <option value="">Select Method</option>
              <option>Waterfall</option>
              <option>Agile</option>
            </select>
          </div>
        </div>
      </div>
      <button
        disabled={buttonDisabled[index]}
        className="btn btn-primary mt-4 w-full"
        onClick={() => handleSubmit(index)}
      >
        Submit
      </button>
    </div>
  )
}

export default FormComponent
