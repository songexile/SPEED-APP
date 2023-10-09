import React, { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import SearchResultsTable from '@/components/SearchResultsTable'
import { Meta } from '@/layouts/Meta'
import { ArticleProps, DeleteSource } from '@/types/index'
import { CustomReusableButton } from '@/components'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
import { toast } from 'react-toastify'
import { GETTING_SESSION_DELAY } from '@/constants'

const SearchPage: React.FC = () => {
  const [data, setData] = useState<ArticleProps[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { data: session } = useSession()
  const router = useRouter()

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_URI || `http://localhost:3001/`

  useEffect(() => {
    const { startYear, endYear } = router.query

    if (startYear && endYear) {
      const startYearInput = document.getElementById('startYear') as HTMLInputElement
      const endYearInput = document.getElementById('endYear') as HTMLInputElement

      if (startYearInput && endYearInput) {
        startYearInput.value = startYear as string
        endYearInput.value = endYear as string
      }
    }
  }, [router.query])

  const fetchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const startYear = (document.getElementById('startYear') as HTMLInputElement)?.value
    const endYear = (document.getElementById('endYear') as HTMLInputElement)?.value

    const isNumeric = (value: any) => !isNaN(value) && isFinite(value)

    let url = `${API_ENDPOINT}analyst`

    // This if statement
    // Will run if the user input only one field
    // (Either start year / end year)
    if (startYear && endYear && isNumeric(startYear) && isNumeric(endYear)) {
      if (parseInt(startYear) > parseInt(endYear)) {
        setError('Start year cannot be greater than end year.')
        return
      }
      url = `${API_ENDPOINT}analyst/by-year-range?startYear=${startYear}&endYear=${endYear}`
    } else if (startYear || endYear) {
      // Display an error message if either startYear or endYear is not numeric
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
        const data = await response.json()

        if (data.length === 0) {
          setError('No results found.')
          setData(data)
        } else {
          if (error?.length) {
            setError('')
          }
          setData(data)

          // Update the URL with the selected filters
          const queryParams = new URLSearchParams()
          queryParams.set('startYear', startYear)
          queryParams.set('endYear', endYear)

          // Add more parameters as needed later on
          // queryParams.set('method', selectedMethod);

          const newUrl = `${window.location.pathname}?${queryParams.toString()}`
          window.history.pushState({}, '', newUrl)
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
    fetchData(e)
  }

  // HandleDelete function to delete articles
  const handleDelete = async (articleId: string, source: DeleteSource) => {
    const user: User | any = session?.user

    // Get User Token
    const token = user.accessToken

    try {
      // Determine the endpoint based on the source
      const endpoint =
        source === DeleteSource.Submissions
          ? DeleteSource.Submissions
          : source === DeleteSource.Analyst
          ? DeleteSource.Analyst
          : DeleteSource.Moderator

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

      // Remove the deleted article from the state
      if (source === DeleteSource.Analyst) {
        setData((prevArticles) => prevArticles.filter((article) => article._id !== articleId))
      }
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
                <span className="">Choose a Software Engineering Method</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs bg-secondary"
                defaultValue="Choose a method"
              >
                <option>Choose a method</option>
                <option>Waterfall</option>
                <option>Agile</option>
              </select>

              <input
                type="text"
                placeholder="Start Year"
                className="input input-bordered w-full max-w-xs"
                id="startYear"
              ></input>
              <input
                type="text"
                placeholder="End Year"
                className="input input-bordered w-full max-w-xs"
                id="endYear"
              ></input>
              <CustomReusableButton text="Search" className="btn btn-primary" type="submit" />
            </div>
          </form>
          {error && <div className="text-red-500">{error}</div>}
          {loading ? (
            // Show loading skeleton while fetching data
            <div className="container mt-5 w-max">
              <span className="loading loading-spinner loading-lg"></span>
              <p>Loading...</p>
            </div>
          ) : (
            <>
              {data.length > 0 && (
                <SearchResultsTable
                  data={data}
                  onDelete={(articleId) => handleDelete(articleId, DeleteSource.Analyst)}
                />
              )}
            </>
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
