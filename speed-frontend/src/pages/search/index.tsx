import React, { useState } from 'react'
import Nav from '@/components/Nav'
import SearchResultsTable from '@/components/SearchResultsTable'
import { Meta } from '@/layouts/Meta'

interface Articles {
  _id: string
  title: string
  authors: string
  journal: string
  year: number
  volume: string
  pages: string
  doi: string
}

const SearchPage: React.FC = () => {
  // Using the useState hook to initialize state
  const [data, setData] = useState<Articles[]>([])

  const fetchData = async () => {
    try {
      // Fetching data from the submission API endpoint
      const res = await fetch('https://my-cise-test-vercel.vercel.app/submissions')
      const newData = await res.json()
      setData(newData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSearch = () => {
    //need to add other search queries
    fetchData()
  }

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Search Software Engineering methods to find claims." />
        <div className="bg-base-100 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-center">
            Search Software Engineering methods to find claims.
          </h1>
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
            ></input>
            <input
              type="text"
              placeholder="End Year"
              className="input input-bordered w-full max-w-xs"
            ></input>
            <button className="btn btn-primary" onClick={handleSearch}>
              Submit
            </button>
          </div>
          {data.length > 0 && <SearchResultsTable data={data} />}
        </div>
        <Nav />
      </section>
    </main>
  )
}

export default SearchPage