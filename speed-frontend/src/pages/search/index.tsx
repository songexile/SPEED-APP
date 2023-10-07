import React, { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import SearchResultsTable from '@/components/SearchResultsTable'
import { Meta } from '@/layouts/Meta'
import { ArticleProps } from '../../types/index'
import { CustomReusableButton } from '@/components'
import { useRouter } from 'next/router'

const SearchPage: React.FC = () => {
  const [data, setData] = useState<ArticleProps[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_URI || `http://localhost:3001/`
    const startYear = (document.getElementById('startYear') as HTMLInputElement)?.value
    const endYear = (document.getElementById('endYear') as HTMLInputElement)?.value

    const isNumeric = (value: any) => !isNaN(value) && isFinite(value)

    let url = `${apiEndpoint}analyst`

    // This if statement
    // Will run if the user input only one field
    // (Either start year / end year)
    if (startYear && endYear && isNumeric(startYear) && isNumeric(endYear)) {
      if (parseInt(startYear) > parseInt(endYear)) {
        setError('Start year cannot be greater than end year.')
        return
      }
      url = `${apiEndpoint}analyst/by-year-range?startYear=${startYear}&endYear=${endYear}`
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
        console.error('Failed to fetch data from the server.')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 300)
    }
  }

  const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
    fetchData(e)
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
            <>{data.length > 0 && <SearchResultsTable data={data} />}</>
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
