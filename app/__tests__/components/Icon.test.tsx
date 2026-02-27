import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Icon from '@/components/Icon'

describe('Icon', () => {
  it('renders with default size', () => {
    render(<Icon name="dashboard" />)
    const icon = screen.getByLabelText('dashboard icon')
    expect(icon).toBeInTheDocument()
  })

  it('renders correct icon for known name', () => {
    render(<Icon name="notes" />)
    expect(screen.getByText('📝')).toBeInTheDocument()
  })

  it('renders all known icons correctly', () => {
    const icons = [
      { name: 'dashboard', emoji: '📊' },
      { name: 'notes', emoji: '📝' },
      { name: 'ai', emoji: '🤖' },
      { name: 'graph', emoji: '🔗' },
      { name: 'tasks', emoji: '✅' },
      { name: 'dictionary', emoji: '📚' },
      { name: 'lore', emoji: '🗂️' },
      { name: 'timer', emoji: '⏱️' },
      { name: 'structure', emoji: '🏗️' },
      { name: 'settings', emoji: '⚙️' }
    ]

    icons.forEach(({ name, emoji }) => {
      const { unmount } = render(<Icon name={name} />)
      expect(screen.getByText(emoji)).toBeInTheDocument()
      unmount()
    })
  })

  it('renders fallback icon for unknown name', () => {
    render(<Icon name="unknown" />)
    expect(screen.getByText('❓')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Icon name="dashboard" className="custom-class" />)
    const icon = screen.getByLabelText('dashboard icon')
    expect(icon).toHaveClass('custom-class')
  })

  it('renders with custom size', () => {
    render(<Icon name="dashboard" size={16} />)
    const icon = screen.getByLabelText('dashboard icon')
    expect(icon).toHaveClass('text-sm')
  })

  it('handles size prop correctly', () => {
    const { rerender } = render(<Icon name="dashboard" size={20} />)
    let icon = screen.getByLabelText('dashboard icon')
    expect(icon).toHaveClass('text-base')

    rerender(<Icon name="dashboard" size={16} />)
    icon = screen.getByLabelText('dashboard icon')
    expect(icon).toHaveClass('text-sm')

    rerender(<Icon name="dashboard" size={24} />)
    icon = screen.getByLabelText('dashboard icon')
    expect(icon).toHaveClass('text-lg')
  })

  it('has correct aria-label', () => {
    render(<Icon name="tasks" />)
    expect(screen.getByLabelText('tasks icon')).toBeInTheDocument()
  })
})