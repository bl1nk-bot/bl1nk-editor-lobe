import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Navbar from '@/components/Navbar'

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
  signOut: vi.fn()
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
}))

import { useSession, signOut } from 'next-auth/react'

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders logo and brand name', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn()
    } as any)

    render(<Navbar />)
    expect(screen.getByText('BLinkOS')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn()
    } as any)

    render(<Navbar />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Marketplace')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('shows login button when user is not authenticated', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn()
    } as any)

    render(<Navbar />)
    expect(screen.getByText('เข้าสู่ระบบ')).toBeInTheDocument()
  })

  it('shows user info and logout button when authenticated', () => {
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        expires: '2099-01-01'
      },
      status: 'authenticated',
      update: vi.fn()
    } as any)

    render(<Navbar />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('ออกจากระบบ')).toBeInTheDocument()
  })

  it('displays email when name is not available', () => {
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: {
          email: 'user@example.com'
        },
        expires: '2099-01-01'
      },
      status: 'authenticated',
      update: vi.fn()
    } as any)

    render(<Navbar />)
    expect(screen.getByText('user@example.com')).toBeInTheDocument()
  })

  it('calls signOut when logout button is clicked', () => {
    const mockSignOut = vi.fn()
    vi.mocked(signOut).mockImplementation(mockSignOut)
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        expires: '2099-01-01'
      },
      status: 'authenticated',
      update: vi.fn()
    } as any)

    render(<Navbar />)
    const logoutButton = screen.getByText('ออกจากระบบ')
    fireEvent.click(logoutButton)

    expect(mockSignOut).toHaveBeenCalled()
  })

  it('highlights active link', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn()
    } as any)

    render(<Navbar />)
    const homeLink = screen.getByText('Home')
    expect(homeLink).toHaveClass('text-primary')
  })

  it('renders mobile menu button', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn()
    } as any)

    render(<Navbar />)
    const mobileButton = document.querySelector('.md\\:hidden svg')
    expect(mobileButton).toBeInTheDocument()
  })

  it('has fixed positioning', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn()
    } as any)

    const { container } = render(<Navbar />)
    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('fixed', 'top-0', 'left-0', 'right-0')
  })
})