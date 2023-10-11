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
    <div className="mt-8 flex flex-col w-1/2 p-8 rounded-md border shadow-lg">
      <h2 className="mb-2">
        <span className="font-bold">Author(s):</span> {article.authors}
      </h2>
      <p className="mb-2">
        <span className="font-bold">Title:</span> {article.title}
      </p>
      <p className="mb-2">
        <span className="font-bold">DOI:</span> {article.doi}
      </p>
      <p className="mb-2">
        <span className="font-bold">Year:</span> {article.year}
      </p>
      <div className="flex space-x-4 mb-4">
        <span className="font-bold">Agree/Disagree:</span>
        <input
          type="radio"
          name={`agreeDisagree-${index}`}
          value="Agree"
          className="radio radio-success"
          onChange={(e) => handleChange(e, index)}
        />
        <input
          type="radio"
          name={`agreeDisagree-${index}`}
          value="Disagree"
          onChange={(e) => handleChange(e, index)}
          className="radio radio-error"
        />
      </div>
      <div className="flex flex-col mb-4">
        <div className="w-1/2">
          <span className="font-bold mr-4">Claim:</span>
          <input
            type="text"
            name="claim"
            placeholder="Type the claim here"
            className="input input-bordered w-full max-w-md"
            onChange={(e) => handleChange(e, index)}
          />
        </div>
        <div className="w-1/2 mt-4">
          <span className="font-bold">Software Engineering method:</span>
          <select
            name="method"
            className="select select-bordered w-full max-w-xs bg-secondary"
            onChange={(e) => handleChange(e, index)}
          >
            <option value="">Select Method</option>
            <option>Waterfall</option>
            <option>Agile</option>
          </select>
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
