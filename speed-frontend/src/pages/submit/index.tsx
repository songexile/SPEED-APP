import { CustomReusableButton } from '@/components'
import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { Errors, FormData } from '@/types'
import { ChangeEvent, useState } from 'react'

const SubmitPage = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    authors: '',
    journal: '',
    year: '',
    volume: '',
    pages: '',
    doi: '',
  })

  const [errors, setErrors] = useState<Errors>({})
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors: Errors = {}

    if (!formData.title) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters'
    }
    if (!formData.authors) {
      newErrors.authors = 'Authors are required'
    } else if (formData.authors.length < 5) {
      newErrors.authors = 'Authors must be at least 5 characters'
    }
    if (!formData.journal) {
      newErrors.journal = 'Journal is required'
    } else if (formData.journal.length < 5) {
      newErrors.journal = 'Journal must be at least 5 characters'
    }
    if (!formData.year) {
      newErrors.year = 'Year is required'
    } else if (/[^0-9]/.test(formData.year)) {
      newErrors.year = 'Year can only contain numbers'
    } else if (formData.year.length !== 4) {
      newErrors.year = 'Year must be 4 digits'
    } else if (parseInt(formData.year) < 1900 || parseInt(formData.year) > 2023) {
      newErrors.year = 'Year must be between 1900 and 2023'
    }
    if (!formData.doi) {
      newErrors.doi = 'DOI is required'
    } else if (formData.doi.length < 4) {
      newErrors.doi = 'DOI must be at least 4 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitToDb = () => {
    if (!validateForm()) {
      setFailure(true)
      return // If form is not valid, do not submit
    }

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_URI || `http://localhost:3001/`

    fetch(`${apiEndpoint}submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(true)
          setFailure(false)
        } else {
          // Handle the case where the API request fails
          console.error('API request failed')
        }
      })
      .catch((error) => {
        console.error('An error occurred while making the API request', error)
      })
  }

  return (
    <main>
      <section>
        <Meta
          title="SPEED APP"
          description="Submit Your Favorite Claim Article About Software Engineering Methods"
        />
        <div className="bg-base-100 flex flex-col items-center justify-center min-h-screen">
          <div className="grid grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label htmlFor="title">
                Title <small className="text-xs text-gray-500">Required</small>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <div className="text-red-500 h-5">{errors.title || ''}</div>
            </div>

            {/* Authors */}
            <div>
              <label htmlFor="authors">
                Authors <small className="text-xs text-gray-500">Required</small>
              </label>
              <input
                type="text"
                name="authors"
                placeholder="Author(s)"
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <div className="text-red-500 h-5">{errors.authors || ''}</div>
            </div>

            {/* Journal */}
            <div>
              <label htmlFor="journal">
                Journal <small className="text-xs text-gray-500">Required</small>
              </label>
              <input
                type="text"
                name="journal"
                placeholder="Journal Name"
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <div className="text-red-500 h-5">{errors.journal || ''}</div>
            </div>

            {/* Year */}
            <div>
              <label htmlFor="year">
                Year <small className="text-xs text-gray-500">Required</small>
              </label>
              <input
                type="text"
                name="year"
                placeholder="Year of publication"
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <div className="text-red-500 h-5">{errors.year || ''}</div>
            </div>

            {/* Volume */}
            <div>
              <label htmlFor="volume">
                Volume <small className="text-xs text-gray-500">Optional</small>
              </label>
              <input
                type="text"
                name="volume"
                placeholder="Volume"
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <div className="text-red-500 h-5">{errors.volume || ''}</div>
            </div>

            {/* Pages */}
            <div>
              <label htmlFor="pages">
                Pages <small className="text-xs text-gray-500">Optional</small>
              </label>
              <input
                type="text"
                name="pages"
                placeholder="Pages"
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <div className="text-red-500 h-5">{errors.pages || ''}</div>
            </div>

            {/* DOI */}
            <div>
              <label htmlFor="doi">
                DOI <small className="text-xs text-gray-500">Required</small>
              </label>
              <input
                type="text"
                name="doi"
                placeholder="DOI"
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <div className="text-red-500 h-5">{errors.doi || ''}</div>
            </div>
          </div>
          <CustomReusableButton
            text="Submit"
            className="btn btn-primary mt-4 w-64"
            onClick={submitToDb}
          />
          {success && (
            <div>
              Congrats, it has been submitted. We look forward to reviewing your submission 😀.
            </div>
          )}
          {failure && <div>Please fix the errors listed above and then we can submit.😀.</div>}
          <Nav />
        </div>
      </section>
    </main>
  )
}

export default SubmitPage
