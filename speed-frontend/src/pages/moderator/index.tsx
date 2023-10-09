import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { DecodedToken, User, Analyst } from '@/types/index'
import { toast } from 'react-toastify'
import { GETTING_SESSION_DELAY } from '@/constants'
import { Loading } from '@/components'
import ModeratorDashboard from '@/components/Dashboard/ModeratorDashboard'

const Moderator = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isModerator, setIsModerator] = useState(false)
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState<Analyst[]>([])

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_URI || 'http://localhost:3001/'

  useEffect(() => {
    const redirectToHomePage = () => {
      router.push('/')
    }

    setLoading(true)
    const user: User | undefined = session?.user

    if (!user || !user.accessToken) {
      redirectToHomePage()
      return
    }

    const token = user.accessToken
    const decodedToken: DecodedToken = jwt_decode(token)
    const userRole = decodedToken.role

    if (userRole !== 'moderator' && userRole !== 'admin') {
      toast.error('Only Moderator and Admin can access this page!', {
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
    } else if (userRole === 'moderator' || userRole === 'admin') {
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
            throw new Error(`Failed to fetch submission articles: ${submissionResponse.statusText}`)
          }

          const submissionData = await submissionResponse.json()
          setArticles(submissionData)
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
            setIsModerator(userRole === 'moderator')
            setIsAdmin(userRole === 'admin')
            setLoading(false)
          }, GETTING_SESSION_DELAY)
        }
      }

      fetchSubmissionArticles()
    }
  }, [session, router])

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Moderator Dashboard" />
        {loading ? (
          <Loading />
        ) : (
          <>
            {isModerator || isAdmin ? (
              <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
                {/* Pass the articles data as a prop */}
                <ModeratorDashboard articles={articles} />
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

// Add the requireAuth property to the page component
// To protect the page from unauthenticated users
Moderator.requireAuth = true

export default Moderator
