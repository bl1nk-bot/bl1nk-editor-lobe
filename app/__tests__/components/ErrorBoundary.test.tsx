import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ErrorBoundary from '@/components/ErrorBoundary'

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  const originalError = console.error

  beforeEach(() => {
    // Suppress error output in tests
    console.error = vi.fn()
  })

  afterEach(() => {
    console.error = originalError
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText('An unexpected error occurred.')).toBeInTheDocument()
  })

  it('displays error stack trace', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    const errorStack = screen.getByText(/Test error message/i)
    expect(errorStack).toBeInTheDocument()
  })

  it('shows reload button when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText('Reload Page')).toBeInTheDocument()
  })

  it('displays alert icon when error occurs', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    const alertIcon = container.querySelector('.text-destructive')
    expect(alertIcon).toBeInTheDocument()
  })

  it('reloads page when reload button is clicked', () => {
    const reloadMock = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true
    })

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const reloadButton = screen.getByText('Reload Page')
    fireEvent.click(reloadButton)

    expect(reloadMock).toHaveBeenCalled()
  })

  it('catches errors from nested components', () => {
    const NestedComponent = () => {
      throw new Error('Nested error')
    }

    render(
      <ErrorBoundary>
        <div>
          <div>
            <NestedComponent />
          </div>
        </div>
      </ErrorBoundary>
    )

    expect(screen.getByText('An unexpected error occurred.')).toBeInTheDocument()
  })

  it('does not catch errors when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )
    expect(screen.getByText('No error')).toBeInTheDocument()
    expect(screen.queryByText('An unexpected error occurred.')).not.toBeInTheDocument()
  })

  it('has correct error UI styling', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    const errorContainer = container.querySelector('.min-h-screen')
    expect(errorContainer).toHaveClass('flex', 'items-center', 'justify-center')
  })
})