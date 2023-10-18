import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { DecodedToken, User, Analyst } from '@/types/index'
import { toast } from 'react-toastify'
import { GETTING_SESSION_DELAY } from '@/constants'
import { Nav, TopNav } from '@/components'
import ModeratorDashboard from '@/components/Dashboard/ModeratorDashboard'
import Skeleton from 'react-loading-skeleton'

const Moderator = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isModerator, setIsModerator] = useState(false)
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  const [articles, setArticles] = useState<Analyst[]>([])

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_URI

  const redirectToHomePage = () => {
    router.push('/')
  }

  const user: User | undefined = session?.user

  if (!user || !user.accessToken) {
    redirectToHomePage()
    return null
  }

  // Get user role
  const token = user.accessToken

  useEffect(() => {
    const redirectToHomePage = () => {
      router.push('/')
    }

    const user: User | undefined = session?.user

    if (!user || !user.accessToken) {
      redirectToHomePage()
      return
    }

    // Get user role
    const token = user.accessToken
    const decodedToken: DecodedToken = jwt_decode(token)
    const userRole = decodedToken.role

    if (userRole !== 'moderator' && userRole !== 'admin') {
      toast.error('Only Moderators and Admins can access this page!', {
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
          const submissionResponse = await fetch(`${API_ENDPOINT}moderator`, {
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
            setSkeletonLoading(false)
          }, GETTING_SESSION_DELAY)
        }
      }

      fetchSubmissionArticles()
    }
  }, [session, router])

  const handleAcceptArticle = async (articleId: string) => {
    try {
      // Send a POST request to accept the article with the bearer token
      const acceptedArticle = articles.find((article) => article._id === articleId)

      if (!acceptedArticle) {
        // Handle the case where the article with the given articleId was not found
        toast.error('Article not found', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        return
      }

      // Construct the payload for accepting the article using the article's data
      const payload = {
        title: acceptedArticle.title,
        authors: acceptedArticle.authors,
        journal: acceptedArticle.journal,
        year: acceptedArticle.year,
        volume: acceptedArticle.volume,
        pages: acceptedArticle.pages,
        doi: acceptedArticle.doi,
      }

      const response = await fetch(`${API_ENDPOINT}analyst/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Failed to accept article: ${response.statusText}`)
      } else {
        // Delete the article in moderator DB
        // After accepting, send a DELETE request to remove the article from the moderator DB
        const deleteResponse = await fetch(`${API_ENDPOINT}moderator/${articleId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!deleteResponse.ok) {
          throw new Error(
            `Failed to delete article from moderator DB: ${deleteResponse.statusText}`
          )
        }
      }

      // Remove the accepted article from the state
      setArticles((prevArticles: any) =>
        prevArticles.filter((article: any) => article._id !== articleId)
      )
    } catch (error) {
      toast.error('Error accepting article: ' + error, {
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

  const handleRejectArticle = async (articleId: string) => {
    try {
      // Send a DELETE request to reject the article with the bearer token
      const response = await fetch(`${API_ENDPOINT}moderator/${articleId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to reject article: ${response.statusText}`)
      }

      // Remove the rejected article from the state (assuming you have a state to manage articles)
      setArticles((prevArticles: any) =>
        prevArticles.filter((article: any) => article._id !== articleId)
      )
    } catch (error) {
      toast.error('Error rejecting article: ' + error, {
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

  return (
    <main>
      <section className="bg-base-100">
        <Meta title="Next Gen SPEED App" description="Moderator Dashboard" />
        <TopNav />
        <div className="container flex flex-col items-center justify-center min-h-[10vh]">
          {skeletonLoading ? (
            <Skeleton count={6} baseColor="#202020" highlightColor="#444" />
          ) : (
            <>
              {isModerator || isAdmin ? (
                <ModeratorDashboard
                  articles={articles}
                  handleAcceptArticle={handleAcceptArticle}
                  handleRejectArticle={handleRejectArticle}
                />
              ) : null}
            </>
          )}
        </div>
        <Nav />
      </section>
    </main>
  )
}

// Add the requireAuth property to the page component
// To protect the page from unauthenticated users
Moderator.requireAuth = true

export default Moderator
