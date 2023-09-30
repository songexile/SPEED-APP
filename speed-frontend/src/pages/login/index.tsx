import { signIn } from 'next-auth/react'
import { SyntheticEvent, useState } from 'react'

const Login = () => {
  const [error, setError] = useState<string>()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }

    const email = target.email.value
    const password = target.password.value

    try {
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
      })

      if (result && !result.error) {
        // Authentication succeeded, and user is redirected to the callbackUrl
      } else if (result && result.error) {
        setError(result.error)
      } else {
        console.error('Unexpected authentication result:', result)
      }
    } catch (error) {
      // Handle other errors like network issues or api issues
      console.error('Login error:', error)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">SPEED APP (Next Gen)</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              className="w-full input input-bordered -mb-3"
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
            />
          </div>
          <div>
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Login
