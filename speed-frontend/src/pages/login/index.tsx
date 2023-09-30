import { signIn, getCsrfToken } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'

const Login = ({ csrfToken }) => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      username: { value: string }
      password: { value: string }
    }

    const username = target.username.value
    const password = target.password.value

    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
        callbackUrl: '/',
      })

      if (result && !result.error) {
        // Authentication succeeded, and the user is redirected to the callbackUrl
        router.push(result.url || '/')
      } else if (result && result.error) {
        setError('Incorrect username or password.')
      } else {
        console.error('Unexpected authentication result:', result)
        setError('An unexpected error occurred.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">SPEED APP (Next Gen)</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
          <div>
            <label className="label">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
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
            <button type="submit" className="btn btn-block" disabled={isLoading}>
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Login

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
