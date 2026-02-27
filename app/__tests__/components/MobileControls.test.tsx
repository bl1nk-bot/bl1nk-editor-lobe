import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MobileControls from '@/components/MobileControls'

describe('MobileControls', () => {
  it('renders menu button', () => {
    const mockToggle = vi.fn()
    render(<MobileControls onMenuToggle={mockToggle} />)
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })

  it('calls onMenuToggle when button is clicked', () => {
    const mockToggle = vi.fn()
    render(<MobileControls onMenuToggle={mockToggle} />)

    const button = screen.getByLabelText('Open menu')
    fireEvent.click(button)

    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('calls onMenuToggle multiple times on multiple clicks', () => {
    const mockToggle = vi.fn()
    render(<MobileControls onMenuToggle={mockToggle} />)

    const button = screen.getByLabelText('Open menu')
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockToggle).toHaveBeenCalledTimes(3)
  })

  it('has mobile-only visibility class', () => {
    const mockToggle = vi.fn()
    const { container } = render(<MobileControls onMenuToggle={mockToggle} />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('md:hidden')
  })

  it('displays hamburger menu icon', () => {
    const mockToggle = vi.fn()
    render(<MobileControls onMenuToggle={mockToggle} />)
    expect(screen.getByText('☰')).toBeInTheDocument()
  })

  it('button has correct styling', () => {
    const mockToggle = vi.fn()
    render(<MobileControls onMenuToggle={mockToggle} />)
    const button = screen.getByLabelText('Open menu')
    expect(button).toHaveClass('p-2', 'text-gray-600', 'dark:text-gray-400')
  })
})