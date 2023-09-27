import Nav from '@/components/Nav'
import { useState } from 'react'

const SubmitPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: '',
    volume: '',
    pages: '',
    doi: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const submitToDb = () => {
    fetch('http://localhost:3001/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    console.log('Submitted')
  }
  return (
    <div className="bg-base-100 flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="authors"
          placeholder="Author(s)"
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="journal"
          placeholder="Journal Name"
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />

        <input
          type="text"
          name="year"
          placeholder="Year of publication"
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="volume"
          placeholder="Volume (Optional)"
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="pages"
          placeholder="Pages (Optional)"
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="doi"
          placeholder="DOI"
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={submitToDb} className="btn btn-primary">
          Submit
        </button>
      </div>
      <Nav />
    </div>
  )
}

export default SubmitPage
