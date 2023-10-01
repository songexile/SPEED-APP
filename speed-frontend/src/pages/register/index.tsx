import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const Register = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (session) {
      router.push('/') // Redirect to the home page
    }
  }, [session])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate the form fields
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields must be filled in.')
      setIsLoading(false)
      return
    }

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }

      // Log the payload
      // console.log('Payload:', payload)

      const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_URI || `http://localhost:3001/`

      const response = await fetch(`${apiEndpoint}auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const responseData = await response.json() // Parse the JSON response

      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed')
      }

      // Registration was successful
      router.push('/')
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please check your input.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">SPEED APP (Next Gen)</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full input input-bordered -mb-3"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full input input-bordered -mb-3"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full input input-bordered mb-5"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-block" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Register
