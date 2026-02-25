import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import NoteEditorModal from '@/components/NoteEditorModal'

const mockNote = {
  id: '1',
  title: 'Test Note',
  content: 'Test content'
}

describe('NoteEditorModal', () => {
  it('does not render when isOpen is false', () => {
    const mockClose = vi.fn()
    const mockSave = vi.fn()
    const { container } = render(
      <NoteEditorModal isOpen={false} onClose={mockClose} onSave={mockSave} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders when isOpen is true', () => {
    const mockClose = vi.fn()
    const mockSave = vi.fn()
    render(
      <NoteEditorModal isOpen={true} onClose={mockClose} onSave={mockSave} />
    )
    expect(screen.getByText('New Note')).toBeInTheDocument()
  })

  it('shows "Edit Note" title when note is provided', () => {
    const mockClose = vi.fn()
    const mockSave = vi.fn()
    render(
      <NoteEditorModal
        isOpen={true}
        note={mockNote}
        onClose={mockClose}
        onSave={mockSave}
      />
    )
    expect(screen.getByText('Edit Note')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const mockClose = vi.fn()
    const mockSave = vi.fn()
    render(
      <NoteEditorModal isOpen={true} onClose={mockClose} onSave={mockSave} />
    )

    const closeButton = screen.getByLabelText('Close modal')
    fireEvent.click(closeButton)

    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Cancel button is clicked', () => {
    const mockClose = vi.fn()
    const mockSave = vi.fn()
    render(
      <NoteEditorModal isOpen={true} onClose={mockClose} onSave={mockSave} />
    )

    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)

    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('renders input fields with existing note data', () => {
    const mockClose = vi.fn()
    const mockSave = vi.fn()
    render(
      <NoteEditorModal
        isOpen={true}
        note={mockNote}
        onClose={mockClose}
        onSave={mockSave}
      />
    )

    const titleInput = screen.getByPlaceholderText('Note title') as HTMLInputElement
    const contentTextarea = screen.getByPlaceholderText('Write your note here...') as HTMLTextAreaElement

    expect(titleInput.value).toBe('Test Note')
    expect(contentTextarea.value).toBe('Test content')
  })

  it('renders empty input fields when no note is provided', () => {
    const mockClose = vi.fn()
    const mockSave = vi.fn()
    render(
      <NoteEditorModal isOpen={true} onClose={mockClose} onSave={mockSave} />
    )

    const titleInput = screen.getByPlaceholderText('Note title') as HTMLInputElement
    const contentTextarea = screen.getByPlaceholderText('Write your note here...') as HTMLTextAreaElement

    expect(titleInput.value).toBe('')
    expect(contentTextarea.value).toBe('')
  })

  it('calls onClose when Save button is clicked', () => {
    const mockClose = vi.fn()
    const mockSave = vi.fn()
    render(
      <NoteEditorModal isOpen={true} onClose={mockClose} onSave={mockSave} />
    )

    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)

    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('renders with dark mode classes', () => {
    const mockClose = vi.fn()
    const mockSave = vi.fn()
    render(
      <NoteEditorModal isOpen={true} onClose={mockClose} onSave={mockSave} />
    )

    const modal = screen.getByText('New Note').closest('div')
    expect(modal).toHaveClass('bg-white', 'dark:bg-gray-800')
  })
})