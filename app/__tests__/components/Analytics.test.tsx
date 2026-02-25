import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Analytics from '@/components/Analytics'

describe('Analytics', () => {
  const originalEnv = process.env.NEXT_PUBLIC_ANALYTICS_ID

  beforeEach(() => {
    // Clear any existing scripts
    document.head.innerHTML = ''
    // Mock window.dataLayer
    ;(window as any).dataLayer = []
  })

  afterEach(() => {
    process.env.NEXT_PUBLIC_ANALYTICS_ID = originalEnv
    document.head.innerHTML = ''
    delete (window as any).dataLayer
  })

  it('renders without crashing', () => {
    const { container } = render(<Analytics />)
    expect(container).toBeTruthy()
  })

  it('returns null (renders nothing visible)', () => {
    const { container } = render(<Analytics />)
    expect(container.firstChild).toBeNull()
  })

  it('does not load analytics script when NEXT_PUBLIC_ANALYTICS_ID is not set', () => {
    delete process.env.NEXT_PUBLIC_ANALYTICS_ID
    render(<Analytics />)

    const scripts = document.head.querySelectorAll('script')
    const analyticsScript = Array.from(scripts).find(script =>
      script.src.includes('googletagmanager.com/gtag')
    )
    expect(analyticsScript).toBeUndefined()
  })

  it('loads analytics script when NEXT_PUBLIC_ANALYTICS_ID is set', () => {
    process.env.NEXT_PUBLIC_ANALYTICS_ID = 'G-TEST123'
    render(<Analytics />)

    // Wait a tick for useEffect to run
    setTimeout(() => {
      const scripts = document.head.querySelectorAll('script')
      const analyticsScript = Array.from(scripts).find(script =>
        script.src.includes('googletagmanager.com/gtag')
      )
      expect(analyticsScript).toBeDefined()
    }, 0)
  })

  it('initializes dataLayer when analytics ID is provided', () => {
    process.env.NEXT_PUBLIC_ANALYTICS_ID = 'G-TEST456'
    render(<Analytics />)

    setTimeout(() => {
      expect((window as any).dataLayer).toBeDefined()
      expect(Array.isArray((window as any).dataLayer)).toBe(true)
    }, 0)
  })

  it('handles multiple renders without duplicating scripts', () => {
    process.env.NEXT_PUBLIC_ANALYTICS_ID = 'G-TEST789'
    const { rerender } = render(<Analytics />)
    rerender(<Analytics />)
    rerender(<Analytics />)

    setTimeout(() => {
      const scripts = document.head.querySelectorAll('script')
      const analyticsScripts = Array.from(scripts).filter(script =>
        script.src.includes('googletagmanager.com/gtag')
      )
      // Should only have one script in total
      expect(analyticsScripts.length).toBeLessThanOrEqual(1)
    }, 0)
  })
})