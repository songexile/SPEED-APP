import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Admin = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Redirect authenticated (NON logged-in) users to another page
    if (!session) {
      router.push('/')
    }
  }, [session])

  return (
    <main>
      <section>
        <Meta title="SPEED APP" description="Admin Dashboard" />
        <div className="relative bg-base-100 items-center justify-center min-h-screen">
          <h1>Admin Dashboard</h1>
          <Nav />
        </div>
      </section>
    </main>
  )
}

export default Admin
