import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MessageInput from '@/components/MessageInput'

describe('MessageInput', () => {
  const defaultProps = {
    input: '',
    setInput: vi.fn(),
    onSendMessage: vi.fn(),
    isLoading: false,
    file: null,
    setFile: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders textarea with placeholder', () => {
    render(<MessageInput {...defaultProps} />)
    expect(screen.getByPlaceholderText(/แนบไฟล์ หรือคุยกับ AI/)).toBeInTheDocument()
  })

  it('displays current input value', () => {
    render(<MessageInput {...defaultProps} input="Test message" />)
    const textarea = screen.getByPlaceholderText(/แนบไฟล์ หรือคุยกับ AI/) as HTMLTextAreaElement
    expect(textarea.value).toBe('Test message')
  })

  it('calls setInput when text is typed', () => {
    const mockSetInput = vi.fn()
    render(<MessageInput {...defaultProps} setInput={mockSetInput} />)

    const textarea = screen.getByPlaceholderText(/แนบไฟล์ หรือคุยกับ AI/)
    fireEvent.change(textarea, { target: { value: 'New text' } })

    expect(mockSetInput).toHaveBeenCalledWith('New text')
  })

  it('calls onSendMessage when form is submitted', () => {
    const mockSend = vi.fn((e) => e.preventDefault())
    const { container } = render(<MessageInput {...defaultProps} input="Test" onSendMessage={mockSend} />)

    const form = container.querySelector('form') as HTMLFormElement
    fireEvent.submit(form)

    expect(mockSend).toHaveBeenCalled()
  })

  it('calls onSendMessage when Enter is pressed', () => {
    const mockSend = vi.fn((e) => e.preventDefault())
    render(<MessageInput {...defaultProps} input="Test" onSendMessage={mockSend} />)

    const textarea = screen.getByPlaceholderText(/แนบไฟล์ หรือคุยกับ AI/)
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })

    expect(mockSend).toHaveBeenCalled()
  })

  it('does not submit when Shift+Enter is pressed', () => {
    const mockSend = vi.fn()
    render(<MessageInput {...defaultProps} input="Test" onSendMessage={mockSend} />)

    const textarea = screen.getByPlaceholderText(/แนบไฟล์ หรือคุยกับ AI/)
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true })

    expect(mockSend).not.toHaveBeenCalled()
  })

  it('does not submit when input is empty and no file', () => {
    const mockSend = vi.fn()
    render(<MessageInput {...defaultProps} input="" onSendMessage={mockSend} />)

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    expect(mockSend).not.toHaveBeenCalled()
  })

  it('disables submit button when input is empty and no file', () => {
    render(<MessageInput {...defaultProps} input="" />)
    const submitButton = screen.getByLabelText('Send message')
    expect(submitButton).toBeDisabled()
  })

  it('enables submit button when input has text', () => {
    render(<MessageInput {...defaultProps} input="Test" />)
    const submitButton = screen.getByLabelText('Send message')
    expect(submitButton).not.toBeDisabled()
  })

  it('enables submit button when file is attached', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    render(<MessageInput {...defaultProps} file={file} input="" />)
    const submitButton = screen.getByLabelText('Send message')
    expect(submitButton).not.toBeDisabled()
  })

  it('shows loading spinner when isLoading is true', () => {
    render(<MessageInput {...defaultProps} isLoading={true} input="Test" />)
    const spinner = document.querySelector('.fa-spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('disables textarea when isLoading', () => {
    render(<MessageInput {...defaultProps} isLoading={true} />)
    const textarea = screen.getByPlaceholderText(/แนบไฟล์ หรือคุยกับ AI/)
    expect(textarea).toBeDisabled()
  })

  it('displays file preview when file is attached', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    render(<MessageInput {...defaultProps} file={file} />)
    expect(screen.getByText('test.txt')).toBeInTheDocument()
  })

  it('calls setFile with null when file is removed', () => {
    const mockSetFile = vi.fn()
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    render(<MessageInput {...defaultProps} file={file} setFile={mockSetFile} />)

    const removeButton = screen.getByRole('button', { name: '' })
    fireEvent.click(removeButton)

    expect(mockSetFile).toHaveBeenCalledWith(null)
  })

  it('opens file input when attach button is clicked', () => {
    render(<MessageInput {...defaultProps} />)
    const attachButton = screen.getByLabelText('Attach file')

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    const clickSpy = vi.spyOn(fileInput, 'click')

    fireEvent.click(attachButton)
    expect(clickSpy).toHaveBeenCalled()
  })

  it('calls setFile when file is selected', () => {
    const mockSetFile = vi.fn()
    render(<MessageInput {...defaultProps} setFile={mockSetFile} />)

    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

    Object.defineProperty(fileInput, 'files', {
      value: [file],
      writable: false
    })

    fireEvent.change(fileInput)
    expect(mockSetFile).toHaveBeenCalledWith(file)
  })

  it('does not call setFile when no file is selected', () => {
    const mockSetFile = vi.fn()
    render(<MessageInput {...defaultProps} setFile={mockSetFile} />)

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    fireEvent.change(fileInput)

    expect(mockSetFile).not.toHaveBeenCalled()
  })
})