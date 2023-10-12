import React, { useEffect, useState } from 'react'
import { Nav, CustomReusableButton, SearchResultsTable } from '@/components'
import { Meta } from '@/layouts/Meta'
import { ArticleProps, DeleteSource } from '@/types/index'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
import { toast } from 'react-toastify'
import { GETTING_SESSION_DELAY } from '@/constants'

const SearchPage: React.FC = () => {
  const [data, setData] = useState<ArticleProps[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [searchText, setSearchText] = useState('')
  const { data: session } = useSession()
  const router = useRouter()
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_URI

  useEffect(() => {
    const { startYear, endYear } = router.query
    const startYearInput = document.getElementById('startYear') as HTMLInputElement
    const endYearInput = document.getElementById('endYear') as HTMLInputElement

    if (startYear && endYear && startYearInput && endYearInput) {
      startYearInput.value = startYear as string
      endYearInput.value = endYear as string
    }
  }, [router.query])

  const fetchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const startYear = (document.querySelector('#startYear') as HTMLInputElement)?.value
    const endYear = (document.querySelector('#endYear') as HTMLInputElement)?.value
    const isNumeric = (value: any) => !isNaN(value) && isFinite(value)

    let url = `${API_ENDPOINT}speed`

    // This if statement
    // Will run if the user input only one field
    // (Either start year / end year)
    if (startYear && endYear && isNumeric(startYear) && isNumeric(endYear)) {
      if (parseInt(startYear) > parseInt(endYear)) {
        setError('Start year cannot be greater than end year.')
        return
      }
      url = `${API_ENDPOINT}speed/by-year-range?startYear=${startYear}&endYear=${endYear}`
      if (selectedMethod) {
        url = `${API_ENDPOINT}speed/by-year-range-and-method?startYear=${startYear}&endYear=${endYear}&method=${selectedMethod}`
      }
    } else if (selectedMethod) {
      url += `/by-method?method=${selectedMethod}`
    } else if (startYear || endYear) {
      setError(
        'Please input both start and end years with valid numbers. Otherwise leave it empty to display all articles.'
      )
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(url)

      if (response.ok) {
        const responseData = await response.json()

        if (responseData.length === 0) {
          setError('No results found.')
          setData(responseData)
        } else {
          if (error?.length) {
            setError('')
          }

          const filteredArticles = responseData.filter((article: ArticleProps) =>
            article.title.toLowerCase().includes(searchText.toLowerCase())
          )

          setData(filteredArticles)
          console.log(filteredArticles)

          const queryParams = { startYear, endYear }
          router.push({ pathname: window.location.pathname, query: queryParams })
        }
      } else {
        toast.error('Failed to fetch data from the server.', {
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
    } catch (error) {
      toast.error('An error occurred: ' + error, {
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
      setTimeout(() => {
        setLoading(false)
      }, GETTING_SESSION_DELAY)
    }
  }

  const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetchData(e)
  }

  const handleDelete = async (articleId: string, source: DeleteSource) => {
    const user: User | any = session?.user

    // Get User Token
    const token = user.accessToken

    try {
      const endpoint = 'speed'
      // Send a DELETE request to the appropriate endpoint
      const response = await fetch(`${API_ENDPOINT}${endpoint}/${articleId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      if (source === DeleteSource.Speed) {
        setData((prevArticles) => prevArticles.filter((article) => article._id !== articleId))
      }
      toast.success('Success Delete Article!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } catch (error) {
      toast.error('Error deleting article: ' + error, {
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

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Search Software Engineering methods to find claims." />
        <div className="bg-base-100 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-center">
            Search Software Engineering methods to find claims.
          </h1>
          <form onSubmit={handleSearchClick}>
            <div className="space-y-4 flex flex-col">
              <label className="label mt-4">
                <span>Choose a Software Engineering Method</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs bg-secondary"
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
              >
                <option value="">Choose a method</option>
                <option value="Waterfall">Waterfall</option>
                <option value="Agile">Agile</option>
              </select>
              <input
                type="text"
                placeholder="Search by Title"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="text"
                placeholder="Start Year"
                className="input input-bordered w-full max-w-xs"
                id="startYear"
              />
              <input
                type="text"
                placeholder="End Year"
                className="input input-bordered w-full max-w-xs"
                id="endYear"
              />
              <CustomReusableButton text="Search" className="btn btn-primary" type="submit" />
            </div>
          </form>
          {error && <div className="text-red-500">{error}</div>}
          {loading ? (
            <div className="container mt-5 w-max">
              <span className="loading loading-spinner loading-lg"></span>
              <p>Loading...</p>
            </div>
          ) : (
            <div>
              {data.length > 0 && (
                <SearchResultsTable
                  data={data}
                  onDelete={(articleId) => handleDelete(articleId, DeleteSource.Speed)}
                />
              )}
            </div>
          )}
        </div>
        <div className="mt-20">
          <Nav />
        </div>
      </section>
    </main>
  )
}

export default SearchPage
