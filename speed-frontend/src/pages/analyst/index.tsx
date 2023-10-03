import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { ChangeEvent, useState, useEffect } from 'react'
import { Errors, FormData } from '@/types'

const AnalystPage = () => {
  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_URI || 'http://localhost:3001/'
  const [articles, setArticles] = useState([]) //used for fetching list of articles
  const [formData, setFormData] = useState({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  useEffect(() => {
    fetch(`${apiEndpoint}submissions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArticles(data)
        console.log(data) // Moved inside .then()
      })
      .catch((error) => console.log('Error:', error))
  }, [])

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Search Software Engineering methods to find claims." />
        <div className="bg-base-100 flex flex-col items-center  min-h-screen">
          <h1 className="text-4xl font-bold text-center mt-8">Analyst Page</h1>
          {articles.map((article, index) => (
            <div className="mt-8 flex flex-col w-1/2 p-8 rounded-md border shadow-lg" key={index}>
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
                  name={`radio-${index}`}
                  className="radio radio-success"
                  checked
                />
                <input type="radio" name={`radio-${index}`} className="radio radio-error" />
              </div>
              <div className="flex flex-col  mb-4">
                <div className="w-1/2 ">
                  <span className="font-bold mr-4">Claim:</span>
                  <input
                    type="text"
                    placeholder="Type the claim here"
                    className="input input-bordered w-full max-w-md"
                  />
                </div>
                <div className="w-1/2 mt-4">
                  <span className="font-bold">Software Engineering method:</span>
                  <select className="select select-bordered w-full max-w-xs bg-secondary">
                    <option disabled="" selected="">
                      Rapid Application Development
                    </option>
                    <option>Waterfall</option>
                    <option>Agile</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-primary mt-4 w-full">Submit</button>
            </div>
          ))}
        </div>
        <div className="h-64 bg-base-100"></div>
        <Nav />
      </section>
    </main>
  )
}

export default AnalystPage
