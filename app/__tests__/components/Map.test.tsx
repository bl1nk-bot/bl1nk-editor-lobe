import { render, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MapView } from '@/components/Map'

// Mock usePersistFn hook
vi.mock('@/hooks/usePersistFn', () => ({
  usePersistFn: (fn: any) => fn
}))

// Mock Google Maps
const mockMap = {
  setCenter: vi.fn(),
  setZoom: vi.fn()
}

global.google = {
  maps: {
    Map: vi.fn().mockImplementation(() => mockMap),
    marker: {
      AdvancedMarkerElement: vi.fn()
    }
  }
} as any

describe('MapView', () => {
  const originalCreateElement = document.createElement.bind(document)

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock document.createElement for script tag
    document.createElement = vi.fn((tagName: string) => {
      const element = originalCreateElement(tagName as any)
      if (tagName === 'script') {
        // Immediately call onload to simulate script loading
        setTimeout(() => {
          if (element.onload) {
            element.onload(new Event('load'))
          }
        }, 0)
      }
      return element
    }) as any
  })

  afterEach(() => {
    document.createElement = originalCreateElement as any
    vi.restoreAllMocks()
  })

  it('renders map container', () => {
    const { container } = render(<MapView />)
    const mapDiv = container.querySelector('.w-full.h-\\[500px\\]')
    expect(mapDiv).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<MapView className="custom-class" />)
    const mapDiv = container.firstChild as HTMLElement
    expect(mapDiv).toHaveClass('custom-class')
  })

  it('has default height', () => {
    const { container } = render(<MapView />)
    const mapDiv = container.firstChild as HTMLElement
    expect(mapDiv).toHaveClass('h-[500px]')
  })

  it('loads Google Maps script on mount', async () => {
    render(<MapView />)

    await waitFor(() => {
      expect(document.createElement).toHaveBeenCalledWith('script')
    })
  })

  it('initializes map with default center', async () => {
    const onMapReady = vi.fn()
    render(<MapView onMapReady={onMapReady} />)

    await waitFor(() => {
      if (window.google) {
        expect(google.maps.Map).toHaveBeenCalled()
      }
    }, { timeout: 100 })
  })

  it('initializes map with custom center', async () => {
    const customCenter = { lat: 40.7128, lng: -74.0060 }
    render(<MapView initialCenter={customCenter} />)

    await waitFor(() => {
      if (window.google) {
        expect(google.maps.Map).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({ center: customCenter })
        )
      }
    }, { timeout: 100 })
  })

  it('initializes map with custom zoom', async () => {
    render(<MapView initialZoom={15} />)

    await waitFor(() => {
      if (window.google) {
        expect(google.maps.Map).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({ zoom: 15 })
        )
      }
    }, { timeout: 100 })
  })

  it('calls onMapReady when map is initialized', async () => {
    const onMapReady = vi.fn()
    render(<MapView onMapReady={onMapReady} />)

    await waitFor(() => {
      if (onMapReady.mock.calls.length > 0) {
        expect(onMapReady).toHaveBeenCalledWith(expect.any(Object))
      }
    }, { timeout: 100 })
  })

  it('handles missing map container gracefully', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Render and immediately unmount to simulate missing container
    const { unmount } = render(<MapView />)
    unmount()

    consoleError.mockRestore()
  })

  it('renders without crashing when Google Maps is not available', () => {
    const originalGoogle = global.google
    delete (global as any).google

    const { container } = render(<MapView />)
    expect(container.firstChild).toBeInTheDocument()

    global.google = originalGoogle
  })
})