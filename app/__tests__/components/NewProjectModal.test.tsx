import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import NewProjectModal from '@/components/NewProjectModal'

// Mock createPortal
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom')
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node
  }
})

// Mock types and constants
vi.mock('../types', () => ({
  ProjectTemplate: {}
}))

vi.mock('../constants', () => ({
  PROJECT_TEMPLATES: [
    {
      id: 'template-1',
      name: 'Novel',
      description: 'Write a novel',
      icon: 'fa-solid fa-book',
      color: 'bg-blue-500'
    },
    {
      id: 'template-2',
      name: 'Blog Post',
      description: 'Write a blog post',
      icon: 'fa-solid fa-pencil',
      color: 'bg-green-500'
    }
  ]
}))

describe('NewProjectModal', () => {
  beforeEach(() => {
    // Create modal root element
    const modalRoot = document.createElement('div')
    modalRoot.id = 'modal-root'
    document.body.appendChild(modalRoot)
  })

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root')
    if (modalRoot) {
      document.body.removeChild(modalRoot)
    }
  })

  it('does not render when isOpen is false', () => {
    const mockClose = vi.fn()
    const mockCreate = vi.fn()
    const { container } = render(
      <NewProjectModal isOpen={false} onClose={mockClose} onCreateProject={mockCreate} />
    )
    expect(container.textContent).toBe('')
  })

  it('renders when isOpen is true', () => {
    const mockClose = vi.fn()
    const mockCreate = vi.fn()
    render(
      <NewProjectModal isOpen={true} onClose={mockClose} onCreateProject={mockCreate} />
    )
    expect(screen.getByText('สร้างโครงการใหม่')).toBeInTheDocument()
  })

  it('renders all project templates', () => {
    const mockClose = vi.fn()
    const mockCreate = vi.fn()
    render(
      <NewProjectModal isOpen={true} onClose={mockClose} onCreateProject={mockCreate} />
    )
    expect(screen.getByText('Novel')).toBeInTheDocument()
    expect(screen.getByText('Blog Post')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const mockClose = vi.fn()
    const mockCreate = vi.fn()
    render(
      <NewProjectModal isOpen={true} onClose={mockClose} onCreateProject={mockCreate} />
    )

    const closeButtons = screen.getAllByRole('button')
    const closeButton = closeButtons.find(btn => btn.querySelector('.fa-times'))
    if (closeButton) {
      fireEvent.click(closeButton)
    }

    expect(mockClose).toHaveBeenCalled()
  })

  it('calls onClose when cancel button is clicked', () => {
    const mockClose = vi.fn()
    const mockCreate = vi.fn()
    render(
      <NewProjectModal isOpen={true} onClose={mockClose} onCreateProject={mockCreate} />
    )

    const cancelButton = screen.getByText('ยกเลิก')
    fireEvent.click(cancelButton)

    expect(mockClose).toHaveBeenCalled()
  })

  it('create button is disabled when no template is selected', () => {
    const mockClose = vi.fn()
    const mockCreate = vi.fn()
    render(
      <NewProjectModal isOpen={true} onClose={mockClose} onCreateProject={mockCreate} />
    )

    const createButton = screen.getByText('สร้างโครงการ')
    expect(createButton).toBeDisabled()
  })

  it('enables create button when template is selected', () => {
    const mockClose = vi.fn()
    const mockCreate = vi.fn()
    render(
      <NewProjectModal isOpen={true} onClose={mockClose} onCreateProject={mockCreate} />
    )

    const templateButton = screen.getByText('Novel').closest('button')
    if (templateButton) {
      fireEvent.click(templateButton)
    }

    const createButton = screen.getByText('สร้างโครงการ')
    expect(createButton).not.toBeDisabled()
  })

  it('calls onCreateProject when create button is clicked with selected template', () => {
    const mockClose = vi.fn()
    const mockCreate = vi.fn()
    render(
      <NewProjectModal isOpen={true} onClose={mockClose} onCreateProject={mockCreate} />
    )

    // Select a template
    const templateButton = screen.getByText('Novel').closest('button')
    if (templateButton) {
      fireEvent.click(templateButton)
    }

    // Click create
    const createButton = screen.getByText('สร้างโครงการ')
    fireEvent.click(createButton)

    expect(mockCreate).toHaveBeenCalled()
  })

  it('highlights selected template', () => {
    const mockClose = vi.fn()
    const mockCreate = vi.fn()
    render(
      <NewProjectModal isOpen={true} onClose={mockClose} onCreateProject={mockCreate} />
    )

    const templateButton = screen.getByText('Novel').closest('button')
    if (templateButton) {
      fireEvent.click(templateButton)
      expect(templateButton).toHaveClass('bg-blue-600/20')
    }
  })

  it('closes modal when backdrop is clicked', () => {
    const mockClose = vi.fn()
    const mockCreate = vi.fn()
    const { container } = render(
      <NewProjectModal isOpen={true} onClose={mockClose} onCreateProject={mockCreate} />
    )

    const backdrop = container.querySelector('.fixed.inset-0')
    if (backdrop) {
      fireEvent.click(backdrop)
    }

    expect(mockClose).toHaveBeenCalled()
  })

  it('does not close modal when modal content is clicked', () => {
    const mockClose = vi.fn()
    const mockCreate = vi.fn()
    render(
      <NewProjectModal isOpen={true} onClose={mockClose} onCreateProject={mockCreate} />
    )

    const modalContent = screen.getByText('สร้างโครงการใหม่').closest('div')
    if (modalContent) {
      fireEvent.click(modalContent)
    }

    expect(mockClose).not.toHaveBeenCalled()
  })
})