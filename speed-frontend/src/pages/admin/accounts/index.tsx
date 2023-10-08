import Nav from '@/components/Nav'
import { Meta } from '@/layouts/Meta'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { DecodedToken, User, Account } from '@/types/index'
import Sidebar from '@/components/Dashboard/Sidebar'
import UserTable from '@/components/Dashboard/UserTable'
import { toast } from 'react-toastify'

const Accounts = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [userAccounts, setUserAccounts] = useState<Account[]>([])

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT_URI || 'http://localhost:3001/'

  const user: User | any = session?.user

  // Get User Role
  let userRole = ''
  if (user?.accessToken) {
    const token = user.accessToken
    const decodedToken: DecodedToken = jwt_decode(token)
    userRole = decodedToken.role
  }

  // HandleDelete function to delete account
  const handleDelete = async (userId: string) => {
    const currentUser: User | any = session?.user

    // Check if the user is an admin
    if (currentUser && userRole === 'admin') {
      try {
        const token = currentUser.accessToken

        // Send a DELETE request to the user deletion endpoint
        const response = await fetch(`${API_ENDPOINT}auth/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          // If the user was deleted successfully, update the userAccounts state
          setUserAccounts((prevAccounts) =>
            prevAccounts.filter((account) => account._id !== userId)
          )
        } else {
          toast.error('Error deleting user: ' + response.statusText, {
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
      } catch (error) {
        toast.error('Error deleting user: ' + error, {
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
    } else {
      toast.error('Unauthorized access to delete user', {
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
    }

    const currentUser: User | undefined = session?.user

    if (!currentUser || !currentUser.accessToken) {
      // If the session.user object is not available or accessToken is missing
      redirectToHomePage()
      return
    }

    // Get User Role
    const token = currentUser.accessToken
    const decodedToken: DecodedToken = jwt_decode(token)
    const userRole = decodedToken.role

    if (userRole !== 'admin') {
      // Redirect or deny access to unauthorized users
      redirectToHomePage()
    }

    // Fetch All users
    const fetchUsersAccounts = async () => {
      try {
        const accountResponse = await fetch(`${API_ENDPOINT}auth`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (accountResponse.ok) {
          const userAccountsData = await accountResponse.json()
          setUserAccounts(userAccountsData) // Update the state with fetched accounts
        }
      } catch (error) {
        toast.error('Error fetching user accounts: ' + error, {
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

    fetchUsersAccounts()
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
              <h1 className="text-2xl font-semibold mb-12">Account List Below</h1>

              <h2 className="text-lg font-semibold">User Accounts</h2>
              {session && (
                <UserTable
                  users={userAccounts}
                  onDelete={(id) => handleDelete(id)}
                  userRole={userRole}
                />
              )}
            </div>
          </div>
          <Nav />
        </div>
      </section>
    </main>
  )
}

export default Accounts
