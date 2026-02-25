import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DashboardLayout from '@/components/DashboardLayout'

// Mock dependencies
vi.mock('@/_core/hooks/useAuth', () => ({
  useAuth: vi.fn()
}))

vi.mock('wouter', () => ({
  useLocation: vi.fn(() => ['/', vi.fn()])
}))

vi.mock('@/hooks/useMobile', () => ({
  useIsMobile: vi.fn(() => false)
}))

vi.mock('@/const', () => ({
  APP_LOGO: 'https://example.com/logo.png',
  APP_TITLE: 'Test App',
  getLoginUrl: () => 'https://example.com/login'
}))

vi.mock('@/components/DashboardLayoutSkeleton', () => ({
  DashboardLayoutSkeleton: () => <div>Loading...</div>
}))

// Mock Sidebar components
vi.mock('@/components/ui/sidebar', () => ({
  Sidebar: ({ children }: any) => <div data-testid="sidebar">{children}</div>,
  SidebarContent: ({ children }: any) => <div>{children}</div>,
  SidebarFooter: ({ children }: any) => <div>{children}</div>,
  SidebarHeader: ({ children }: any) => <div>{children}</div>,
  SidebarInset: ({ children }: any) => <div data-testid="sidebar-inset">{children}</div>,
  SidebarMenu: ({ children }: any) => <div>{children}</div>,
  SidebarMenuButton: ({ children, onClick, isActive }: any) => (
    <button onClick={onClick} data-active={isActive}>{children}</button>
  ),
  SidebarMenuItem: ({ children }: any) => <div>{children}</div>,
  SidebarProvider: ({ children }: any) => <div>{children}</div>,
  SidebarTrigger: ({ className }: any) => <button className={className}>Toggle</button>,
  useSidebar: () => ({ state: 'expanded', toggleSidebar: vi.fn() })
}))

vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }: any) => <div data-testid="avatar">{children}</div>,
  AvatarFallback: ({ children }: any) => <div>{children}</div>
}))

vi.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: any) => <div>{children}</div>,
  DropdownMenuItem: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
  DropdownMenuTrigger: ({ children }: any) => <div>{children}</div>
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className }: any) => (
    <button onClick={onClick} className={className}>{children}</button>
  )
}))

import { useAuth } from '@/_core/hooks/useAuth'
import { useIsMobile } from '@/hooks/useMobile'

describe('DashboardLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => '280'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn()
      },
      writable: true
    })
  })

  it('shows loading skeleton when auth is loading', () => {
    vi.mocked(useAuth).mockReturnValue({
      loading: true,
      user: null,
      logout: vi.fn()
    } as any)

    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows sign in page when user is not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      loading: false,
      user: null,
      logout: vi.fn()
    } as any)

    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )

    expect(screen.getByText('Test App')).toBeInTheDocument()
    expect(screen.getByText('Please sign in to continue')).toBeInTheDocument()
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  it('renders children when user is authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      loading: false,
      user: { name: 'John Doe', email: 'john@example.com' },
      logout: vi.fn()
    } as any)

    render(
      <DashboardLayout>
        <div>Dashboard Content</div>
      </DashboardLayout>
    )

    expect(screen.getByText('Dashboard Content')).toBeInTheDocument()
  })

  it('displays user name in sidebar footer', () => {
    vi.mocked(useAuth).mockReturnValue({
      loading: false,
      user: { name: 'John Doe', email: 'john@example.com' },
      logout: vi.fn()
    } as any)

    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('calls logout when sign out is clicked', () => {
    const mockLogout = vi.fn()
    vi.mocked(useAuth).mockReturnValue({
      loading: false,
      user: { name: 'John Doe', email: 'john@example.com' },
      logout: mockLogout
    } as any)

    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )

    const signOutButton = screen.getByText('Sign out')
    fireEvent.click(signOutButton)

    expect(mockLogout).toHaveBeenCalled()
  })

  it('shows mobile header when on mobile device', () => {
    vi.mocked(useIsMobile).mockReturnValue(true)
    vi.mocked(useAuth).mockReturnValue({
      loading: false,
      user: { name: 'John Doe', email: 'john@example.com' },
      logout: vi.fn()
    } as any)

    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )

    const toggleButton = screen.getByText('Toggle')
    expect(toggleButton).toBeInTheDocument()
  })

  it('redirects to login when sign in button is clicked', () => {
    vi.mocked(useAuth).mockReturnValue({
      loading: false,
      user: null,
      logout: vi.fn()
    } as any)

    // Mock window.location
    delete (window as any).location
    window.location = { href: '' } as any

    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )

    const signInButton = screen.getByText('Sign in')
    fireEvent.click(signInButton)

    expect(window.location.href).toBe('https://example.com/login')
  })

  it('stores sidebar width in localStorage', () => {
    vi.mocked(useAuth).mockReturnValue({
      loading: false,
      user: { name: 'John Doe', email: 'john@example.com' },
      logout: vi.fn()
    } as any)

    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )

    expect(localStorage.getItem).toHaveBeenCalledWith('sidebar-width')
  })

  it('displays user initials in avatar', () => {
    vi.mocked(useAuth).mockReturnValue({
      loading: false,
      user: { name: 'John Doe', email: 'john@example.com' },
      logout: vi.fn()
    } as any)

    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )

    expect(screen.getByText('J')).toBeInTheDocument()
  })
})