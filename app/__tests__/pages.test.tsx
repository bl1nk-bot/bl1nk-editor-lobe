import { render, screen } from '@testing-library/react'
import LandingPage from '@/page'
import IDEPage from '@/ide/page'
import DashboardPage from '@/dashboard/page'
import LoginPage from '@/login/page'
import { vi, describe, it, expect } from 'vitest'

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, status: 'unauthenticated' }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('Pages Rendering', () => {
  it('renders LandingPage', () => {
    render(<LandingPage />)
    expect(screen.getByText(/AI-Powered/i)).toBeInTheDocument()
    expect(screen.getByText(/Development Studio/i)).toBeInTheDocument()
  })

  it('renders IDEPage', () => {
    render(<IDEPage />)
    expect(screen.getByText(/AI-Powered IDE/i)).toBeInTheDocument()
  })

  it('renders DashboardPage', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
  })

  it('renders LoginPage', () => {
    render(<LoginPage />)
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument()
  })
})
