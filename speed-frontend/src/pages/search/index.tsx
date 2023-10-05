import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { useState } from 'react'
import { ArticleProps } from '@/types'

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<ArticleProps[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSearchClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_URI || `http://localhost:3001/`

    const startYear = (document.getElementById('startYear') as HTMLInputElement)?.value
    const endYear = (document.getElementById('endYear') as HTMLInputElement)?.value

    const isNumeric = (value: any) => !isNaN(value) && isFinite(value)

    let url = `${apiEndpoint}submissions`

    // This if statement
    // Wil run if the user input only one field
    // (Either start year / end year)
    if (startYear && endYear && isNumeric(startYear) && isNumeric(endYear)) {
      if (parseInt(startYear) > parseInt(endYear)) {
        setError('Start year cannot be greater than end year.')
        return
      }
      url = `${apiEndpoint}submissions/by-year-range?startYear=${startYear}&endYear=${endYear}`
    } else if (startYear || endYear) {
      // Display an error message if either startYear or endYear is not numeric
      setError(
        'Please input both start and end years with valid numbers. Otherwise leave it empty to display all articles.'
      )
      return
    }

    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()

        if (data.length === 0) {
          setError('No results found.')
        } else {
          if (error?.length) {
            setError('')
          }
          setSearchResults(data)
        }
      } else {
        console.error('Failed to fetch data from the server.')
      }
    } catch (error) {
      console.error('An error occurred:', error)
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
                defaultValue="Rapid Application Development"
              >
                <option disabled>Rapid Application Development</option>
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
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
          {error && <div className="text-red-500">{error}</div>}
          {/* Display the search results in a table */}
          {searchResults.length > 0 && (
            <div className="overflow-x-auto container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Authors</th>
                    <th>Journal</th>
                    <th>Year</th>
                    <th>Volume</th>
                    <th>Number of Pages</th>
                    <th>Doi</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result) => (
                    <tr key={result._id}>
                      <td>{result.title}</td>
                      <td>{result.authors}</td>
                      <td>{result.journal}</td>
                      <td>{result.year}</td>
                      <td>{result.volume}</td>
                      <td>{result.pages}</td>
                      <td>{result.doi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <Nav />
      </section>
    </main>
  )
}

export default SearchPage
