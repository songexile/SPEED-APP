import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { ChangeEvent, useState, useEffect } from 'react'
import { Analyst, AnalystFormData, DecodedToken, User } from '@/types'
import { CustomReusableButton, FormComponent } from '@/components'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_URI || 'http://localhost:3001/'

const AnalystPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

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

    const token = user.accessToken
    const decodedToken: DecodedToken = jwt_decode(token)
    const userRole = decodedToken.role

    if (userRole !== 'analyst' && userRole !== 'admin') {
      // Redirect or deny access to unauthorized users
      redirectToHomePage()
    }
  }, [session, router])

  const [articles, setArticles] = useState<Analyst[]>([])
  const [formData, setFormData] = useState<AnalystFormData[]>([])
  const [buttonDisabled, setButtonDisabled] = useState<boolean[]>([])
  const [showArticles, setShowArticles] = useState(false)

  const fetchArticles = async () => {
    // Check if session and accessToken are available
    if (session && (session.user as any) && (session.user as any).accessToken) {
      const url = `${API_ENDPOINT}submissions`
      const token = (session.user as any).accessToken

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setArticles(data)
        const initialFormData = data.map(() => ({} as AnalystFormData))
        setFormData(initialFormData)
        setButtonDisabled(initialFormData.map(() => true))
        setShowArticles(true)
      } catch (error) {
        console.error('An error occurred while fetching the data: ', error)
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value } = e.target
    const fieldName = name.startsWith('agreeDisagree') ? 'agreeDisagree' : name

    const newFormData = [...formData]
    newFormData[index] = { ...newFormData[index], [fieldName]: value }
    setFormData(newFormData)

    const newButtonDisabled = newFormData.map(
      (form) => !form.claim || !form.method || !form.agreeDisagree
    )
    setButtonDisabled(newButtonDisabled)
  }

  const handleSubmit = async (index: number) => {
    const combinedData = { ...articles[index], ...formData[index] }

    // Check if session and accessToken are available
    if (session && (session.user as any) && (session.user as any).accessToken) {
      const token = (session.user as any).accessToken

      try {
        const response = await fetch(`${API_ENDPOINT}analyst`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(combinedData),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        const articleToDelete = articles[index]
        if (articleToDelete && articleToDelete._id) {
          const deleteResponse = await fetch(`${API_ENDPOINT}submissions/${articleToDelete._id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })

          if (deleteResponse.ok) {
            const updatedArticles = articles.filter(
              (article) => article._id !== articleToDelete._id
            )
            setArticles(updatedArticles)
          } else {
            toast.error('Error deleting the submission.', {
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
        toast.success('Success Adding Article', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      } catch (error) {
        toast.error('Error: ' + error, {
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
  }

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Search Software Engineering methods to find claims." />
        <div className="bg-base-100 flex flex-col items-center min-h-screen text-white">
          <h1 className="text-4xl font-bold text-center mt-8">Analyst Page</h1>

          {!showArticles ? (
            <CustomReusableButton
              text="View all articles"
              className="btn btn-primary mt-4"
              onClick={fetchArticles}
            />
          ) : (
            articles.map((article, index) => (
              <FormComponent
                key={index}
                article={article}
                index={index}
                formData={formData}
                buttonDisabled={buttonDisabled}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            ))
          )}
        </div>
        <div className="h-64 bg-base-100"></div>
        <Nav />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </section>
    </main>
  )
}

export default AnalystPage
