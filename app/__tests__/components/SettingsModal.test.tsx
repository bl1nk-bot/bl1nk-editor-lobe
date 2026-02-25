import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SettingsModal from '@/components/SettingsModal'

// Mock createPortal
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom')
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node
  }
})

// Mock ToolEditor
vi.mock('@/components/ToolEditor', () => ({
  default: ({ onSave, onCancel }: any) => (
    <div data-testid="tool-editor">
      <button onClick={() => onSave({})}>Save Tool</button>
      <button onClick={onCancel}>Cancel Tool</button>
    </div>
  )
}))

const mockProject = {
  id: '1',
  name: 'Test Project',
  isFavorite: false,
  tags: [
    { id: 'tag-1', name: 'Important', bg: 'bg-red-500', text: 'text-white', ring: 'ring-red-500' }
  ],
  tools: [
    {
      id: 'tool-1',
      name: 'TestTool',
      description: 'A test tool',
      parameters: [],
      icon: 'fa-solid fa-cube',
      color: 'bg-blue-500'
    }
  ],
  datasources: [
    {
      id: 'ds-1',
      name: 'Test DB',
      value: 'abc123',
      type: 'notion_database_id'
    }
  ],
  knowledge: [
    {
      id: 'k-1',
      name: 'Test Knowledge',
      content: 'Test content'
    }
  ],
  messages: []
}

describe('SettingsModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    project: mockProject,
    onUpdateProjectProperty: vi.fn(),
    onAddTool: vi.fn(),
    onUpdateTool: vi.fn(),
    onDeleteTool: vi.fn(),
    onExportTools: vi.fn(),
    onImportTools: vi.fn(),
    onAddDatasource: vi.fn(),
    onUpdateDatasource: vi.fn(),
    onDeleteDatasource: vi.fn(),
    onAddKnowledge: vi.fn(),
    onUpdateKnowledge: vi.fn(),
    onDeleteKnowledge: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
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
    const { container } = render(<SettingsModal {...defaultProps} isOpen={false} />)
    expect(container.textContent).toBe('')
  })

  it('renders modal title when open', () => {
    render(<SettingsModal {...defaultProps} />)
    expect(screen.getByText('ตั้งค่าโครงการ')).toBeInTheDocument()
  })

  it('renders all tabs', () => {
    render(<SettingsModal {...defaultProps} />)
    expect(screen.getByText('ทั่วไป')).toBeInTheDocument()
    expect(screen.getByText('เครื่องมือ')).toBeInTheDocument()
    expect(screen.getByText('แหล่งข้อมูล')).toBeInTheDocument()
    expect(screen.getByText('องค์ความรู้')).toBeInTheDocument()
  })

  it('switches to tools tab when clicked', () => {
    render(<SettingsModal {...defaultProps} />)
    const toolsTab = screen.getByText('เครื่องมือ')
    fireEvent.click(toolsTab)
    expect(screen.getByText('สร้างเครื่องมือใหม่')).toBeInTheDocument()
  })

  it('displays project name in general tab', () => {
    render(<SettingsModal {...defaultProps} />)
    const nameInput = screen.getByDisplayValue('Test Project') as HTMLInputElement
    expect(nameInput).toBeInTheDocument()
  })

  it('updates project name on blur', () => {
    const mockUpdate = vi.fn()
    render(<SettingsModal {...defaultProps} onUpdateProjectProperty={mockUpdate} />)

    const nameInput = screen.getByDisplayValue('Test Project') as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'New Name' } })
    fireEvent.blur(nameInput)

    expect(mockUpdate).toHaveBeenCalledWith('name', 'New Name')
  })

  it('toggles favorite status', () => {
    const mockUpdate = vi.fn()
    render(<SettingsModal {...defaultProps} onUpdateProjectProperty={mockUpdate} />)

    const favoriteToggle = screen.getByLabelText('ปักหมุดในรายการโปรด')
    fireEvent.click(favoriteToggle)

    expect(mockUpdate).toHaveBeenCalledWith('isFavorite', true)
  })

  it('displays existing tags', () => {
    render(<SettingsModal {...defaultProps} />)
    expect(screen.getByText('Important')).toBeInTheDocument()
  })

  it('displays existing tools in tools tab', () => {
    render(<SettingsModal {...defaultProps} />)
    const toolsTab = screen.getByText('เครื่องมือ')
    fireEvent.click(toolsTab)
    expect(screen.getByText('TestTool')).toBeInTheDocument()
  })

  it('opens tool editor when create new tool is clicked', () => {
    render(<SettingsModal {...defaultProps} />)
    const toolsTab = screen.getByText('เครื่องมือ')
    fireEvent.click(toolsTab)

    const createButton = screen.getByText('สร้างเครื่องมือใหม่')
    fireEvent.click(createButton)

    expect(screen.getByTestId('tool-editor')).toBeInTheDocument()
  })

  it('calls onDeleteTool when delete is clicked', () => {
    const mockDelete = vi.fn()
    render(<SettingsModal {...defaultProps} onDeleteTool={mockDelete} />)

    const toolsTab = screen.getByText('เครื่องมือ')
    fireEvent.click(toolsTab)

    const deleteButtons = document.querySelectorAll('.fa-trash')
    if (deleteButtons.length > 0) {
      const deleteButton = deleteButtons[0].closest('button')
      if (deleteButton) {
        fireEvent.click(deleteButton)
        expect(mockDelete).toHaveBeenCalledWith('tool-1')
      }
    }
  })

  it('displays datasources in datasources tab', () => {
    render(<SettingsModal {...defaultProps} />)
    const datasourcesTab = screen.getByText('แหล่งข้อมูล')
    fireEvent.click(datasourcesTab)
    expect(screen.getByText('Test DB')).toBeInTheDocument()
  })

  it('displays knowledge in knowledge tab', () => {
    render(<SettingsModal {...defaultProps} />)
    const knowledgeTab = screen.getByText('องค์ความรู้')
    fireEvent.click(knowledgeTab)
    expect(screen.getByText('Test Knowledge')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const mockClose = vi.fn()
    render(<SettingsModal {...defaultProps} onClose={mockClose} />)

    const closeButtons = document.querySelectorAll('.fa-times')
    if (closeButtons.length > 0) {
      const closeButton = closeButtons[0].closest('button')
      if (closeButton) {
        fireEvent.click(closeButton)
        expect(mockClose).toHaveBeenCalled()
      }
    }
  })

  it('calls onExportTools when export button is clicked', () => {
    const mockExport = vi.fn()
    render(<SettingsModal {...defaultProps} onExportTools={mockExport} />)

    const toolsTab = screen.getByText('เครื่องมือ')
    fireEvent.click(toolsTab)

    const exportButton = screen.getByText('ส่งออกเครื่องมือ')
    fireEvent.click(exportButton)

    expect(mockExport).toHaveBeenCalled()
  })

  it('opens datasource form when add datasource is clicked', () => {
    render(<SettingsModal {...defaultProps} />)

    const datasourcesTab = screen.getByText('แหล่งข้อมูล')
    fireEvent.click(datasourcesTab)

    const addButton = screen.getByText('เพิ่มแหล่งข้อมูลใหม่')
    fireEvent.click(addButton)

    expect(screen.getByText('เพิ่มแหล่งข้อมูล')).toBeInTheDocument()
  })

  it('opens knowledge form when add knowledge is clicked', () => {
    render(<SettingsModal {...defaultProps} />)

    const knowledgeTab = screen.getByText('องค์ความรู้')
    fireEvent.click(knowledgeTab)

    const addButton = screen.getByText('สร้างองค์ความรู้ใหม่')
    fireEvent.click(addButton)

    expect(screen.getByText('เพิ่มองค์ความรู้')).toBeInTheDocument()
  })
})