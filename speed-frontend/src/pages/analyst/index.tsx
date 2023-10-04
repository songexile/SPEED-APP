import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { ChangeEvent, useState, useEffect } from 'react'
import { Analyst } from '@/types'

const AnalystPage = () => {
  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_URI || 'http://localhost:3001/'
  const [articles, setArticles] = useState<Analyst[]>([])
  const [formData, setFormData] = useState<Analyst[]>([])
  const [buttonDisabled, setButtonDisabled] = useState<boolean[]>([])

  useEffect(() => {
    const newButtonDisabled = formData.map((form, index) => {
      const agreeDisagreeField = form[`agreeDisagree-${index}`] || form.agreeDisagree
      return !form.claim || !form.method || !agreeDisagreeField
    })
    setButtonDisabled(newButtonDisabled)
  }, [formData])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value } = e.target
    const newFormData = [...formData]
    newFormData[index] = { ...newFormData[index], [name]: value }
    setFormData(newFormData)
  }

  const handleSubmit = (index: number) => {
    const combinedData = { ...articles[index], ...formData[index] }
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
        const initialFormData = data.map(() => ({} as Analyst))
        setFormData(initialFormData)
        const newButtonDisabled = initialFormData.map(() => true)
        setButtonDisabled(newButtonDisabled)
      })
  }, [])

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Search Software Engineering methods to find claims." />
        <div className="bg-base-100 flex flex-col items-center min-h-screen">
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
                  name={`agreeDisagree-${index}`}
                  value="Agree"
                  className="radio radio-success"
                  onChange={(e) => handleChange(e, index)}
                />
                <input
                  type="radio"
                  name={`agreeDisagree-${index}`}
                  value="Disagree"
                  onChange={(e) => handleChange(e, index)}
                  className="radio radio-error"
                />
              </div>
              <div className="flex flex-col mb-4">
                <div className="w-1/2">
                  <span className="font-bold mr-4">Claim:</span>
                  <input
                    type="text"
                    name="claim"
                    placeholder="Type the claim here"
                    className="input input-bordered w-full max-w-md"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="w-1/2 mt-4">
                  <span className="font-bold">Software Engineering method:</span>
                  <select
                    name="method"
                    className="select select-bordered w-full max-w-xs bg-secondary"
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option disabled="" value="">
                      Select Method
                    </option>
                    <option>Waterfall</option>
                    <option>Agile</option>
                  </select>
                </div>
              </div>
              <button
                disabled={buttonDisabled[index]}
                className="btn btn-primary mt-4 w-full"
                onClick={() => handleSubmit(index)}
              >
                Submit
              </button>
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
