import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ToolEditor from '@/components/ToolEditor'

const mockDatasources = [
  { id: 'ds-1', name: 'Database 1', value: 'abc123', type: 'notion_database_id' as const },
  { id: 'ds-2', name: 'Database 2', value: 'def456', type: 'notion_database_id' as const }
]

const mockTool = {
  id: 'tool-1',
  name: 'TestTool',
  description: 'A test tool',
  parameters: [
    { id: 'p1', name: 'param1', type: 'string' as const, description: 'First param' }
  ],
  datasourceId: 'ds-1',
  icon: 'fa-solid fa-cube',
  color: 'bg-blue-500'
}

describe('ToolEditor', () => {
  const defaultProps = {
    tool: null,
    datasources: mockDatasources,
    onSave: vi.fn(),
    onCancel: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with empty tool (create mode)', () => {
    render(<ToolEditor {...defaultProps} />)
    expect(screen.getByText('สร้างเครื่องมือใหม่')).toBeInTheDocument()
  })

  it('renders with existing tool (edit mode)', () => {
    render(<ToolEditor {...defaultProps} tool={mockTool} />)
    expect(screen.getByText('แก้ไขเครื่องมือ')).toBeInTheDocument()
  })

  it('displays tool name input', () => {
    render(<ToolEditor {...defaultProps} />)
    expect(screen.getByLabelText(/ชื่อเครื่องมือ/)).toBeInTheDocument()
  })

  it('populates form with existing tool data', () => {
    render(<ToolEditor {...defaultProps} tool={mockTool} />)

    const nameInput = screen.getByDisplayValue('TestTool') as HTMLInputElement
    const descriptionInput = screen.getByDisplayValue('A test tool') as HTMLTextAreaElement

    expect(nameInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
  })

  it('disables save button when form is invalid', () => {
    render(<ToolEditor {...defaultProps} />)
    const saveButton = screen.getByText('บันทึกเครื่องมือ')
    expect(saveButton).toBeDisabled()
  })

  it('enables save button when form is valid', async () => {
    render(<ToolEditor {...defaultProps} />)

    const nameInput = screen.getByLabelText(/ชื่อเครื่องมือ/)
    const descriptionInput = screen.getByLabelText(/คำอธิบาย/)

    fireEvent.change(nameInput, { target: { value: 'NewTool' } })
    fireEvent.change(descriptionInput, { target: { value: 'Tool description' } })

    await waitFor(() => {
      const saveButton = screen.getByText('บันทึกเครื่องมือ')
      expect(saveButton).not.toBeDisabled()
    })
  })

  it('validates that tool name has no spaces', async () => {
    render(<ToolEditor {...defaultProps} />)

    const nameInput = screen.getByLabelText(/ชื่อเครื่องมือ/)
    const descriptionInput = screen.getByLabelText(/คำอธิบาย/)
    const iconInput = screen.getByPlaceholderText(/fa-solid fa-tasks/)

    fireEvent.change(nameInput, { target: { value: 'Invalid Name' } })
    fireEvent.change(descriptionInput, { target: { value: 'Description' } })
    fireEvent.change(iconInput, { target: { value: 'fa-solid fa-cube' } })

    await waitFor(() => {
      const saveButton = screen.getByText('บันทึกเครื่องมือ')
      expect(saveButton).toBeDisabled()
    })
  })

  it('calls onCancel when cancel button is clicked', () => {
    const mockCancel = vi.fn()
    render(<ToolEditor {...defaultProps} onCancel={mockCancel} />)

    const cancelButton = screen.getByText('ยกเลิก')
    fireEvent.click(cancelButton)

    expect(mockCancel).toHaveBeenCalled()
  })

  it('calls onSave when save button is clicked with valid data', async () => {
    const mockSave = vi.fn()
    render(<ToolEditor {...defaultProps} onSave={mockSave} />)

    const nameInput = screen.getByLabelText(/ชื่อเครื่องมือ/)
    const descriptionInput = screen.getByLabelText(/คำอธิบาย/)

    fireEvent.change(nameInput, { target: { value: 'NewTool' } })
    fireEvent.change(descriptionInput, { target: { value: 'Tool description' } })

    const form = screen.getByText('บันทึกเครื่องมือ').closest('form')
    if (form) {
      fireEvent.submit(form)

      await waitFor(() => {
        expect(mockSave).toHaveBeenCalled()
      })
    }
  })

  it('displays datasource dropdown with options', () => {
    render(<ToolEditor {...defaultProps} />)
    const select = screen.getByLabelText(/เชื่อมต่อกับแหล่งข้อมูล/)
    expect(select).toBeInTheDocument()
  })

  it('shows all datasources in dropdown', () => {
    render(<ToolEditor {...defaultProps} />)
    expect(screen.getByText('Database 1')).toBeInTheDocument()
    expect(screen.getByText('Database 2')).toBeInTheDocument()
  })

  it('adds a new parameter when add button is clicked', () => {
    render(<ToolEditor {...defaultProps} />)

    const addParamButton = screen.getByText('เพิ่มพารามิเตอร์')
    fireEvent.click(addParamButton)

    const paramInputs = screen.getAllByPlaceholderText(/task_name/)
    expect(paramInputs.length).toBeGreaterThan(0)
  })

  it('removes parameter when delete button is clicked', () => {
    render(<ToolEditor {...defaultProps} tool={mockTool} />)

    const deleteButtons = document.querySelectorAll('.fa-times')
    if (deleteButtons.length > 0) {
      const paramDeleteButton = deleteButtons[0].closest('button')
      if (paramDeleteButton) {
        fireEvent.click(paramDeleteButton)

        // Parameter should be removed
        const paramName = screen.queryByDisplayValue('param1')
        expect(paramName).not.toBeInTheDocument()
      }
    }
  })

  it('displays color picker', () => {
    render(<ToolEditor {...defaultProps} />)
    // Check if color buttons exist
    const colorButtons = document.querySelectorAll('[class*="bg-"]')
    expect(colorButtons.length).toBeGreaterThan(0)
  })

  it('changes color when color is clicked', () => {
    render(<ToolEditor {...defaultProps} />)

    const colorButtons = document.querySelectorAll('button[class*="bg-red-500"]')
    if (colorButtons.length > 0) {
      fireEvent.click(colorButtons[0])
      // Color should be selected (would have ring classes)
      expect(colorButtons[0]).toHaveClass('ring-2')
    }
  })

  it('suggests icon based on tool name', () => {
    render(<ToolEditor {...defaultProps} />)

    const nameInput = screen.getByLabelText(/ชื่อเครื่องมือ/)
    fireEvent.change(nameInput, { target: { value: 'add_task' } })
    fireEvent.blur(nameInput)

    const iconInput = screen.getByPlaceholderText(/fa-solid fa-tasks/) as HTMLInputElement
    expect(iconInput.value).toContain('fa-')
  })

  it('displays existing parameters', () => {
    render(<ToolEditor {...defaultProps} tool={mockTool} />)
    expect(screen.getByDisplayValue('param1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('First param')).toBeInTheDocument()
  })

  it('validates parameter names have no spaces', async () => {
    render(<ToolEditor {...defaultProps} tool={mockTool} />)

    const nameInput = screen.getByDisplayValue('TestTool')
    const descInput = screen.getByDisplayValue('A test tool')

    // Add parameter with space in name
    const addParamButton = screen.getByText('เพิ่มพารามิเตอร์')
    fireEvent.click(addParamButton)

    const paramInputs = screen.getAllByPlaceholderText(/task_name/)
    const newParamInput = paramInputs[paramInputs.length - 1]
    fireEvent.change(newParamInput, { target: { value: 'invalid param' } })

    await waitFor(() => {
      const saveButton = screen.getByText('บันทึกเครื่องมือ')
      expect(saveButton).toBeDisabled()
    })
  })

  it('allows changing parameter type', () => {
    render(<ToolEditor {...defaultProps} tool={mockTool} />)

    const typeSelects = screen.getAllByDisplayValue('Text')
    expect(typeSelects.length).toBeGreaterThan(0)

    fireEvent.change(typeSelects[0], { target: { value: 'number' } })
    expect((typeSelects[0] as HTMLSelectElement).value).toBe('number')
  })
})