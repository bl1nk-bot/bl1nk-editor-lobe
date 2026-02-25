import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StatsCard from '@/components/StatsCard'

describe('StatsCard', () => {
  it('renders with title and value', () => {
    render(<StatsCard title="Total Users" value="1,234" />)
    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
  })

  it('renders with numeric value', () => {
    render(<StatsCard title="Active" value={42} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders with optional label', () => {
    render(<StatsCard title="Revenue" value="$10k" label="this month" />)
    expect(screen.getByText('this month')).toBeInTheDocument()
  })

  it('renders without label when not provided', () => {
    const { container } = render(<StatsCard title="Count" value="100" />)
    const labels = container.querySelectorAll('.text-sm.text-gray-500')
    expect(labels.length).toBe(0)
  })

  it('renders progress bar when progress is provided', () => {
    render(<StatsCard title="Storage" value="75%" progress={75} />)
    const progressBar = document.querySelector('.bg-gradient-to-r')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveStyle({ width: '75%' })
  })

  it('does not render progress bar when progress is undefined', () => {
    const { container } = render(<StatsCard title="Users" value="100" />)
    const progressBar = container.querySelector('.bg-gradient-to-r')
    expect(progressBar).toBeNull()
  })

  it('renders with icon when provided', () => {
    const icon = <span data-testid="test-icon">📊</span>
    render(<StatsCard title="Stats" value="999" icon={icon} />)
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('progress bar has correct width for different values', () => {
    const { rerender } = render(<StatsCard title="Test" value="0%" progress={0} />)
    let progressBar = document.querySelector('.bg-gradient-to-r') as HTMLElement
    expect(progressBar.style.width).toBe('0%')

    rerender(<StatsCard title="Test" value="50%" progress={50} />)
    progressBar = document.querySelector('.bg-gradient-to-r') as HTMLElement
    expect(progressBar.style.width).toBe('50%')

    rerender(<StatsCard title="Test" value="100%" progress={100} />)
    progressBar = document.querySelector('.bg-gradient-to-r') as HTMLElement
    expect(progressBar.style.width).toBe('100%')
  })

  it('title is uppercase', () => {
    render(<StatsCard title="my title" value="123" />)
    const title = screen.getByText('MY TITLE')
    expect(title).toHaveClass('uppercase')
  })

  it('has card styling', () => {
    const { container } = render(<StatsCard title="Test" value="123" />)
    const card = container.firstChild
    expect(card).toHaveClass('card')
  })
})