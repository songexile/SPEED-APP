import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './page'

describe('Home Component', () => {
  it('renders the component', () => {
    render(<Home />)
    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeInTheDocument()
  })
})
