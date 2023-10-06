import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Home from '../../src/pages/index'
import { SessionProvider } from 'next-auth/react'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: jest.fn(),
  }),
  useSession: () => ({ data: null }), // Can change this to simulate a logged-in session if needed
  // useSession: () => ({
  //   data: {
  //     // Simulate user data here (e.g., user ID, email, etc.)
  //     user: {
  //       id: '123',
  //       email: 'example@example.com',
  //     },
  //   },
  // }),
}))

test('renders welcome message and buttons', () => {
  render(
    <SessionProvider session={null}>
      <Home />
    </SessionProvider>
  )

  // Check if the welcome message is rendered
  const welcomeMessage = screen.getByText('Welcome to SPEED!')
  expect(welcomeMessage).toBeInTheDocument()

  // Check if the "Login" button is rendered
  const loginButton = screen.getByText('Login 🔍')
  expect(loginButton).toBeInTheDocument()

  // // Check if the "Login" button is rendered
  // const LogoutButton = screen.getByText('Sign Out ↪')
  // expect(LogoutButton).toBeInTheDocument()

  // Check if the "Create an Account" button is rendered
  const createAccountButton = screen.getByText('Create an Account ⭐')
  expect(createAccountButton).toBeInTheDocument()
})

test('renders software engineering claim span', () => {
  render(
    <SessionProvider session={null}>
      <Home />
    </SessionProvider>
  )

  // Use a custom text matcher function to search for a substring of the text
  const claimSpan = screen.getByText((content, element) => {
    // Use a regular expression to match a substring of the text
    const regex = /software engineering claims/
    return regex.test(content)
  })

  expect(claimSpan).toBeInTheDocument()
})
