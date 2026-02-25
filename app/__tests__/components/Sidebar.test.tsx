import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Sidebar from '@/components/Sidebar'

describe('Sidebar', () => {
  it('renders when open', () => {
    const mockClose = vi.fn()
    render(<Sidebar isOpen={true} onClose={mockClose} />)
    expect(screen.getByRole('complementary')).toBeInTheDocument()
  })

  it('has closed class when isOpen is false', () => {
    const mockClose = vi.fn()
    const { container } = render(<Sidebar isOpen={false} onClose={mockClose} />)
    const sidebar = container.querySelector('aside')
    expect(sidebar).toHaveClass('-translate-x-full')
  })

  it('has open class when isOpen is true', () => {
    const mockClose = vi.fn()
    const { container } = render(<Sidebar isOpen={true} onClose={mockClose} />)
    const sidebar = container.querySelector('aside')
    expect(sidebar).toHaveClass('translate-x-0')
  })

  it('calls onClose when close button is clicked', () => {
    const mockClose = vi.fn()
    render(<Sidebar isOpen={true} onClose={mockClose} />)

    const closeButton = screen.getByText('✕')
    fireEvent.click(closeButton)

    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('renders navigation links', () => {
    const mockClose = vi.fn()
    render(<Sidebar isOpen={true} onClose={mockClose} />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Notes')).toBeInTheDocument()
    expect(screen.getByText('AI Writer')).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    const mockClose = vi.fn()
    const { container } = render(<Sidebar isOpen={true} onClose={mockClose} />)
    const sidebar = container.querySelector('aside')
    expect(sidebar).toHaveClass('fixed', 'inset-y-0', 'left-0', 'z-50', 'w-64')
  })

  it('renders with transition classes', () => {
    const mockClose = vi.fn()
    const { container } = render(<Sidebar isOpen={true} onClose={mockClose} />)
    const sidebar = container.querySelector('aside')
    expect(sidebar).toHaveClass('transition-transform', 'duration-200')
  })
})