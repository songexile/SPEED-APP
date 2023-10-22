import { Nav, CustomReusableButton, TopNav } from '@/components'
import { Meta } from '@/layouts/Meta'
import { Errors, FormData } from '@/types'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

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

  const [bibtexData, setBibtexData] = useState<string>('')

  const stripMatchingBraces = (str: string) => {
    // Remove matching curly braces, excluding escaped braces
    while (str.match(/(^|[^\\])\{.*?([^\\])\}/s)) {
      str = str.replace(/(^|[^\\])\{(.*?)([^\\])\}/s, '$1$2$3')
    }
    return str
  }

  const parseBibtexData = () => {
    try {
      if (bibtexData) {
        const matches = bibtexData.match(/@[^{]*{[^,]*,((?:.|[\r\n])*)}/gs)

        if (matches) {
          const newData = { ...formData }

          for (const match of matches) {
            const strippedMatch = stripMatchingBraces(match)

            const lines = strippedMatch.split('\n')

            for (const line of lines) {
              const [key, value] = line.split('=').map((item) => item.trim())

              if (key && value) {
                // Remove the trailing comma if it exists
                const trimmedValue = value.replace(/,$/, '')

                switch (key.trim()) {
                  case 'title':
                    newData.title = trimmedValue
                    break
                  case 'author':
                    newData.authors = trimmedValue
                    break
                  case 'journal':
                    newData.journal = trimmedValue
                    break
                  case 'year':
                    newData.year = trimmedValue
                    break
                  case 'volume':
                    newData.volume = trimmedValue
                    break
                  case 'pages':
                    newData.pages = trimmedValue
                    break
                  case 'doi':
                    newData.doi = trimmedValue
                    break
                  // Add more cases for other BibTeX fields as needed
                }
              }
            }
          }

          setFormData(newData)
          setErrors({ ...errors })
        } else {
          setErrors({ ...errors })
        }
      }
    } catch (error) {
      console.error('Error parsing BibTeX data:', error)
      setErrors({ ...errors })
    }
  }

  const handleBibtexChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    const readBibtexFile = (file: any) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (event) => {
          if (!event.target) {
            reject(new Error('Failed to read the file.'))
            return
          }

          resolve(event.target.result as string)
        }

        reader.onerror = () => {
          reject(new Error('Failed to read the file.'))
        }

        reader.readAsText(file)
      })
    }

    try {
      const content = await readBibtexFile(file)
      setBibtexData(content)
    } catch (error) {
      console.error('Error reading the file:', error)
    }
  }

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

  const submitToDb = async () => {
    // Validate the form
    if (!validateForm()) {
      setFailure(true)
      return // If form is not valid, do not submit
    }

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_URI

    try {
      const response = await fetch(`${apiEndpoint}moderator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFailure(false)
        toast.success('Success Adding Article', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      } else if (response.status === 409) {
        toast.error('Duplicate Entry Detected!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      } else {
        throw new Error('API request failed')
      }
    } catch (error) {
      toast.error('An error occurred while making the API request: ' + error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }

  useEffect(() => {
    if (bibtexData) {
      parseBibtexData()
    }
  }, [bibtexData])

  return (
    <main>
      <section className="bg-base-100">
        <Meta
          title="SPEED APP"
          description="Submit Your Favorite Claim Article About Software Engineering Methods"
        />
        <TopNav />
        <div className="container flex flex-col items-center justify-center min-h-[80vh]">
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
                value={formData.title}
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
                value={formData.authors}
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
                value={formData.journal}
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
                value={formData.year}
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
                value={formData.volume}
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
                value={formData.pages}
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
                value={formData.doi}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <div className="text-red-500 h-5">{errors.doi || ''}</div>
            </div>
          </div>

          {/* Add BibTeX input */}
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="bibtex">
              <span className="label-text">BibTeX File (Optional for auto complete)</span>
            </label>
            <input
              type="file"
              name="bibtex"
              accept=".bib" // Specify accepted file type
              onChange={handleBibtexChange}
              className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            />
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
        </div>
        <Nav />
      </section>
    </main>
  )
}

export default SubmitPage
