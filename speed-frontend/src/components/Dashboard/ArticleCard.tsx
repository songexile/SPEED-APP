import { useState } from 'react'
import { toast } from 'react-toastify'

const ArticleCard = ({ article, onAccept, onReject }: any) => {
  const { _id, title, authors, journal, year, volume, pages, doi } = article
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAccept = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const success = await onAccept(_id)

      toast.success('Article accepted successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })

      if (success) {
      } else {
        setError('Error accepting article. Please try again later.')
      }
    } catch (error) {
      toast.error('Error accepting article: ' + error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const success = await onReject(_id)

      toast.success('Article rejected successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })

      if (success) {
      } else {
        setError('Error rejecting article. Please try again later.')
      }
    } catch (error) {
      toast.error('Error rejecting article: ' + error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-red-100 dark:bg-gray-800 p-4 rounded-lg shadow-md my-10">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Authors: {authors}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Journal: {journal}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Year: {year}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Volume: {volume}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Pages: {pages}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">DOI: {doi}</p>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAccept}
          className="btn btn-success bg-green-500 text-white px-2 py-1 rounded-md mr-2"
          disabled={isSubmitting}
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="btn btn-success bg-red-500 text-white px-2 py-1 rounded-md"
          disabled={isSubmitting}
        >
          Reject
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="text-gray-800 form-control">
        <p>Quality Checklist</p>
        <form>
          <label className="cursor-pointer flex items-center my-2">
            <input
              type="checkbox"
              id="quality1"
              name="quality1"
              className="checkbox checkbox-primary"
            />
            <span className="label-text pl-3">This Article Is ...</span>
          </label>

          <label className="cursor-pointer flex items-center my-2">
            <input
              type="checkbox"
              id="quality1"
              name="quality1"
              className="checkbox checkbox-primary"
            />
            <span className="label-text pl-3">This Article Is ...</span>
          </label>

          <label className="cursor-pointer flex items-center my-2">
            <input
              type="checkbox"
              id="quality1"
              name="quality1"
              className="checkbox checkbox-primary"
            />
            <span className="label-text pl-3">This Article Is ...</span>
          </label>
        </form>
      </div>
    </div>
  )
}

export default ArticleCard
