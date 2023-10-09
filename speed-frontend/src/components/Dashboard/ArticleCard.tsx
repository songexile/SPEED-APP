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
      setError('Error accepting article. Please try again later.')
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
      setError('Error rejecting article. Please try again later.')
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
          className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
          disabled={isSubmitting}
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-red-500 text-white px-2 py-1 rounded-md"
          disabled={isSubmitting}
        >
          Reject
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  )
}

export default ArticleCard
