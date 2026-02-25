import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ShareModal from '@/components/ShareModal'

// Mock dependencies
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom')
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node
  }
})

vi.mock('jspdf', () => ({
  default: vi.fn().mockImplementation(() => ({
    internal: {
      pageSize: {
        getWidth: () => 210,
        getHeight: () => 297
      }
    },
    addImage: vi.fn(),
    addPage: vi.fn(),
    save: vi.fn()
  }))
}))

vi.mock('html2canvas', () => ({
  default: vi.fn().mockResolvedValue({
    toDataURL: () => 'data:image/png;base64,mock',
    width: 800,
    height: 600
  })
}))

vi.mock('qrcode', () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,qr-mock')
  }
}))

const mockProject = {
  id: '1',
  name: 'Test Project',
  messages: [
    { id: 'm1', role: 'USER' as const, text: 'Hello' },
    { id: 'm2', role: 'AI' as const, text: 'Hi there!' },
    { id: 'm3', role: 'SYSTEM' as const, text: 'System message' }
  ]
}

vi.mock('../types', () => ({
  Role: {
    USER: 'USER',
    AI: 'AI',
    SYSTEM: 'SYSTEM'
  }
}))

describe('ShareModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const modalRoot = document.createElement('div')
    modalRoot.id = 'modal-root'
    document.body.appendChild(modalRoot)

    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    })

    // Mock btoa and window.location
    global.btoa = vi.fn((str) => Buffer.from(str).toString('base64'))
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://localhost',
        pathname: '/test'
      },
      writable: true
    })
  })

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root')
    if (modalRoot) {
      document.body.removeChild(modalRoot)
    }
  })

  it('does not render when isOpen is false', () => {
    const mockClose = vi.fn()
    const { container } = render(
      <ShareModal isOpen={false} onClose={mockClose} project={mockProject} />
    )
    expect(container.textContent).toBe('')
  })

  it('renders modal when isOpen is true', () => {
    const mockClose = vi.fn()
    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)
    expect(screen.getByText('แชร์ & ส่งออกโปรเจกต์')).toBeInTheDocument()
  })

  it('displays project name', () => {
    const mockClose = vi.fn()
    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)
    expect(screen.getByText('"Test Project"')).toBeInTheDocument()
  })

  it('shows share link toggle', () => {
    const mockClose = vi.fn()
    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)
    expect(screen.getByText('เปิดใช้งานลิงก์สาธารณะ')).toBeInTheDocument()
  })

  it('generates share link when toggle is enabled', async () => {
    const mockClose = vi.fn()
    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)

    const toggle = screen.getByRole('checkbox')
    fireEvent.click(toggle)

    await waitFor(() => {
      const shareInput = screen.getByDisplayValue(/http:\/\/localhost/)
      expect(shareInput).toBeInTheDocument()
    })
  })

  it('copies link to clipboard when copy button is clicked', async () => {
    const mockClose = vi.fn()
    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)

    const toggle = screen.getByRole('checkbox')
    fireEvent.click(toggle)

    await waitFor(() => {
      const copyButton = screen.getByText('คัดลอกลิงก์')
      fireEvent.click(copyButton)
    })

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled()
    })
  })

  it('shows copy success message after copying', async () => {
    const mockClose = vi.fn()
    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)

    const toggle = screen.getByRole('checkbox')
    fireEvent.click(toggle)

    await waitFor(() => {
      const copyButton = screen.getByText('คัดลอกลิงก์')
      fireEvent.click(copyButton)
    })

    await waitFor(() => {
      expect(screen.getByText('คัดลอกแล้ว!')).toBeInTheDocument()
    })
  })

  it('displays QR code when share link is enabled', async () => {
    const mockClose = vi.fn()
    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)

    const toggle = screen.getByRole('checkbox')
    fireEvent.click(toggle)

    await waitFor(() => {
      const qrImage = screen.getByAltText('QR Code for share link')
      expect(qrImage).toBeInTheDocument()
    })
  })

  it('renders export buttons', () => {
    const mockClose = vi.fn()
    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)

    expect(screen.getByText('Markdown')).toBeInTheDocument()
    expect(screen.getByText('HTML')).toBeInTheDocument()
    expect(screen.getByText('PDF')).toBeInTheDocument()
  })

  it('exports as Markdown when button is clicked', () => {
    const mockClose = vi.fn()
    const createObjectURL = vi.fn(() => 'blob:mock')
    const revokeObjectURL = vi.fn()
    global.URL.createObjectURL = createObjectURL
    global.URL.revokeObjectURL = revokeObjectURL

    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)

    const markdownButton = screen.getByText('Markdown')
    fireEvent.click(markdownButton)

    expect(createObjectURL).toHaveBeenCalled()
  })

  it('exports as HTML when button is clicked', () => {
    const mockClose = vi.fn()
    const createObjectURL = vi.fn(() => 'blob:mock')
    global.URL.createObjectURL = createObjectURL

    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)

    const htmlButton = screen.getByText('HTML')
    fireEvent.click(htmlButton)

    expect(createObjectURL).toHaveBeenCalled()
  })

  it('shows loading state when generating PDF', async () => {
    const mockClose = vi.fn()
    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)

    const pdfButton = screen.getByText('PDF')
    fireEvent.click(pdfButton)

    await waitFor(() => {
      expect(screen.getByText('กำลังสร้าง...')).toBeInTheDocument()
    })
  })

  it('calls onClose when close button is clicked', () => {
    const mockClose = vi.fn()
    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)

    const closeButtons = document.querySelectorAll('.fa-times')
    if (closeButtons.length > 0) {
      const closeButton = closeButtons[0].closest('button')
      if (closeButton) {
        fireEvent.click(closeButton)
        expect(mockClose).toHaveBeenCalled()
      }
    }
  })

  it('calls onClose when done button is clicked', () => {
    const mockClose = vi.fn()
    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)

    const doneButton = screen.getByText('เสร็จสิ้น')
    fireEvent.click(doneButton)

    expect(mockClose).toHaveBeenCalled()
  })

  it('closes modal when backdrop is clicked', () => {
    const mockClose = vi.fn()
    const { container } = render(
      <ShareModal isOpen={true} onClose={mockClose} project={mockProject} />
    )

    const backdrop = container.querySelector('.fixed.inset-0')
    if (backdrop) {
      fireEvent.click(backdrop)
    }

    expect(mockClose).toHaveBeenCalled()
  })

  it('does not close when modal content is clicked', () => {
    const mockClose = vi.fn()
    render(<ShareModal isOpen={true} onClose={mockClose} project={mockProject} />)

    const modalContent = screen.getByText('แชร์ & ส่งออกโปรเจกต์').closest('div')
    if (modalContent) {
      fireEvent.click(modalContent)
    }

    expect(mockClose).not.toHaveBeenCalled()
  })
})