import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Analyst, DecodedToken, User } from '@/types/index'
import Sidebar from '@/components/Dashboard/Sidebar'
import SearchResultsTable from '@/components/SearchResultsTable'
import { useRouter } from 'next/router'

const Articles = () => {
  const { data: session } = useSession()
  const router = useRouter() // Initialize the router here
  const [submissionArticles, setSubmissionArticles] = useState<Analyst[]>([])
  const [analystArticles, setAnalystArticles] = useState<Analyst[]>([])

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_URI || 'http://localhost:3001/'

  // HandleDelete function to delete articles
  const handleDelete = async (articleId: string) => {
    const user: User | any = session?.user

    // Get User Role
    const token = user.accessToken
    const decodedToken: DecodedToken = jwt_decode(token)
    const userRole = decodedToken.role

    try {
      // Send a DELETE request to the appropriate endpoint based on the article type
      const response = await fetch(
        `${API_ENDPOINT}${userRole === 'admin' ? 'submissions' : 'analyst'}/${articleId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Remove the deleted article from the state
      if (userRole === 'admin') {
        setSubmissionArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== articleId)
        )
      } else {
        setAnalystArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== articleId)
        )
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error deleting article:', error)
    }
  }

  useEffect(() => {
    const redirectToHomePage = () => {
      router.push('/')
    }

    // Redirect authenticated (NON logged-in) users to another page
    if (!session) {
      redirectToHomePage()
      return
    }

    const user: User | undefined = session?.user

    // If the session.user object is not available or accessToken is missing
    if (!user || !user.accessToken) {
      redirectToHomePage()
      return
    }

    // Get User Role
    const token = user.accessToken
    const decodedToken: DecodedToken = jwt_decode(token)
    const userRole = decodedToken.role

    if (userRole !== 'admin') {
      // Redirect or deny access to unauthorized users
      redirectToHomePage()
    }

    // Fetch Submission Articles for all users
    const fetchSubmissionArticles = async () => {
      const submissionResponse = await fetch(`${API_ENDPOINT}submissions`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (submissionResponse.ok) {
        const submissionData = await submissionResponse.json()
        setSubmissionArticles(submissionData)
      }
    }

    // Fetch Analyst Articles for all users
    const fetchAnalystArticles = async () => {
      const analystResponse = await fetch(`${API_ENDPOINT}analyst`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (analystResponse.ok) {
        const analystData = await analystResponse.json()
        setAnalystArticles(analystData)
      }
    }

    fetchSubmissionArticles()
    fetchAnalystArticles()
  }, [session, router])

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Admin Dashboard" />
        <div className="relative bg-base-100 items-center justify-center min-h-screen">
          <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            <div className="h-screen flex-1 p-7">
              <h1 className="text-2xl font-semibold">Articles List Below</h1>

              <h2 className="text-lg font-semibold">Analyst Articles</h2>
              <SearchResultsTable data={analystArticles} onDelete={handleDelete} />

              <h2 className="text-lg font-semibold mt-20">Submission Articles</h2>
              <SearchResultsTable data={submissionArticles} onDelete={handleDelete} />
            </div>
          </div>
          <Nav />
        </div>
      </section>
    </main>
  )
}

export default Articles
