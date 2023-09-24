import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './page'

test('renders welcome message and buttons', () => {
  render(<Home />) // Use 'render' directly without destructuring

  // Check if the welcome message is rendered
  const welcomeMessage = screen.getByText('Welcome to SPEED!')
  expect(welcomeMessage).toBeInTheDocument()

  // Check if the "Login" button is rendered
  const loginButton = screen.getByText('Login 🔍')
  expect(loginButton).toBeInTheDocument()

  // Check if the "Create an Account" button is rendered
  const createAccountButton = screen.getByText('Create an Account ⭐')
  expect(createAccountButton).toBeInTheDocument()
})

test('renders software engineering claim span', () => {
  render(<Home />) // Use 'render' directly without destructuring

  // Use a custom text matcher function to search for a substring of the text
  const claimSpan = screen.getByText((content, element) => {
    // Use a regular expression to match a substring of the text
    const regex = /software engineering claims/
    return regex.test(content)
  })

  expect(claimSpan).toBeInTheDocument()
})
