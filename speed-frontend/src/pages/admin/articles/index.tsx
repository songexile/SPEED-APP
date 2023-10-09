import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Analyst, DecodedToken, DeleteSource, User } from '@/types/index'
import Sidebar from '@/components/Dashboard/Sidebar'
import SearchResultsTable from '@/components/SearchResultsTable'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { GETTING_SESSION_DELAY } from '@/constants'

const Articles = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [submissionArticles, setSubmissionArticles] = useState<Analyst[]>([])
  const [analystArticles, setAnalystArticles] = useState<Analyst[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_URI || 'http://localhost:3001/'

  // HandleDelete function to delete articles
  const handleDelete = async (articleId: string, source: DeleteSource) => {
    const user: User | any = session?.user

    // Get User Token
    const token = user.accessToken

    try {
      // Determine the endpoint based on the source
      const endpoint =
        source === DeleteSource.Submissions
          ? DeleteSource.Submissions
          : source === DeleteSource.Analyst
          ? DeleteSource.Analyst
          : DeleteSource.Moderator

      // Send a DELETE request to the appropriate endpoint
      const response = await fetch(`${API_ENDPOINT}${endpoint}/${articleId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Remove the deleted article from the state
      if (source === DeleteSource.Submissions) {
        setSubmissionArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== articleId)
        )
      } else if (source === DeleteSource.Analyst) {
        setAnalystArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== articleId)
        )
      } // Handle other cases (Moderator) later on
    } catch (error) {
      toast.error('Error deleting article: ' + error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }

  useEffect(() => {
    const redirectToHomePage = () => {
      router.push('/')
    }

    // Check if the session remains undefined or null after a delay
    const sessionCheckTimeout = setTimeout(() => {
      if (!session) {
        // Redirect authenticated (NON logged-in) users to another page
        toast.error('You need to log in to access this page!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        redirectToHomePage()
        return
      } else {
        setLoading(true)
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
          toast.error('Only Admin can access this page!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
          redirectToHomePage()
        } else {
          setIsAdmin(true)
        }

        // Fetch Submission Articles for all users
        const fetchSubmissionArticles = async () => {
          try {
            const submissionResponse = await fetch(`${API_ENDPOINT}submissions`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            })

            if (!submissionResponse.ok) {
              throw new Error(
                `Failed to fetch submission articles: ${submissionResponse.statusText}`
              )
            }

            const submissionData = await submissionResponse.json()
            setSubmissionArticles(submissionData)
          } catch (error: any) {
            toast.error(`Fetch error for submission articles: ${error.message}`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            })
          } finally {
            setTimeout(() => {
              setLoading(false)
            }, GETTING_SESSION_DELAY)
          }
        }

        // Fetch Analyst Articles for all users
        const fetchAnalystArticles = async () => {
          try {
            const analystResponse = await fetch(`${API_ENDPOINT}analyst`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })

            if (!analystResponse.ok) {
              throw new Error(`Failed to fetch analyst articles: ${analystResponse.statusText}`)
            }

            const analystData = await analystResponse.json()
            setAnalystArticles(analystData)
          } catch (error: any) {
            toast.error(`Fetch error for analyst articles: ${error.message}`, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            })
          } finally {
            setTimeout(() => {
              setLoading(false)
            }, GETTING_SESSION_DELAY)
          }
        }

        try {
          fetchSubmissionArticles()
          fetchAnalystArticles()
        } catch (error: any) {
          toast.error(`Fetch error for the articles: ${error.message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
        }
      }
    }, GETTING_SESSION_DELAY)

    return () => clearTimeout(sessionCheckTimeout)
  }, [session, router])

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Admin Dashboard" />

        {loading ? (
          // Show loading skeleton while fetching data
          <div className="bg-base-100 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg"></span>
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          <>
            {isAdmin ? (
              <div className="relative bg-base-100 items-center justify-center min-h-screen">
                <div className="flex">
                  {/* Sidebar */}
                  <Sidebar />
                  <div className="h-screen flex-1 p-7">
                    <h1 className="text-2xl font-semibold mb-12">Articles List Below</h1>

                    <h2 className="text-lg font-semibold">Analyst Articles</h2>
                    <SearchResultsTable
                      data={analystArticles}
                      onDelete={(articleId) => handleDelete(articleId, DeleteSource.Analyst)}
                    />

                    <h2 className="text-lg font-semibold mt-20">Submission Articles</h2>
                    <SearchResultsTable
                      data={submissionArticles}
                      onDelete={(articleId) => handleDelete(articleId, DeleteSource.Submissions)}
                    />
                  </div>
                </div>
                <Nav />
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default Articles
