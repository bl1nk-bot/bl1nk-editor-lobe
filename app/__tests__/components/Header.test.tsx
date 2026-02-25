import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from '@/components/Header'

describe('Header', () => {
  it('renders with default title', () => {
    render(<Header />)
    expect(screen.getByText("Ashval Writer's Suite")).toBeInTheDocument()
  })

  it('renders with custom title', () => {
    render(<Header title="Custom Title" />)
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    render(<Header title="Test" />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-white', 'dark:bg-gray-800', 'shadow-sm')
  })

  it('displays title in h1 element', () => {
    render(<Header title="My App" />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('My App')
  })

  it('applies text color classes correctly', () => {
    render(<Header title="Test Title" />)
    const heading = screen.getByRole('heading')
    expect(heading).toHaveClass('text-gray-900', 'dark:text-white')
  })

  it('renders with empty string title', () => {
    render(<Header title="" />)
    const heading = screen.getByRole('heading')
    expect(heading).toHaveTextContent('')
  })
})