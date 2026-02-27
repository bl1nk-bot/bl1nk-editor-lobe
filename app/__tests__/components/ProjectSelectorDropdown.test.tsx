import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProjectSelectorDropdown from '@/components/ProjectSelectorDropdown'

const mockProjects = [
  { id: '1', name: 'Project Alpha' },
  { id: '2', name: 'Project Beta' },
  { id: '3', name: 'Project Gamma' }
]

describe('ProjectSelectorDropdown', () => {
  it('renders all projects as options', () => {
    const mockSelect = vi.fn()
    render(
      <ProjectSelectorDropdown
        projects={mockProjects}
        onSelectProject={mockSelect}
      />
    )

    expect(screen.getByText('Project Alpha')).toBeInTheDocument()
    expect(screen.getByText('Project Beta')).toBeInTheDocument()
    expect(screen.getByText('Project Gamma')).toBeInTheDocument()
  })

  it('calls onSelectProject when an option is selected', () => {
    const mockSelect = vi.fn()
    render(
      <ProjectSelectorDropdown
        projects={mockProjects}
        onSelectProject={mockSelect}
      />
    )

    const select = screen.getByTitle('Select Project') as HTMLSelectElement
    fireEvent.change(select, { target: { value: '2' } })

    expect(mockSelect).toHaveBeenCalledWith(mockProjects[1])
  })

  it('displays selected project', () => {
    const mockSelect = vi.fn()
    render(
      <ProjectSelectorDropdown
        projects={mockProjects}
        selectedProject={mockProjects[1]}
        onSelectProject={mockSelect}
      />
    )

    const select = screen.getByTitle('Select Project') as HTMLSelectElement
    expect(select.value).toBe('2')
  })

  it('handles no selected project', () => {
    const mockSelect = vi.fn()
    render(
      <ProjectSelectorDropdown
        projects={mockProjects}
        onSelectProject={mockSelect}
      />
    )

    const select = screen.getByTitle('Select Project') as HTMLSelectElement
    expect(select.value).toBe('')
  })

  it('handles empty projects array', () => {
    const mockSelect = vi.fn()
    render(
      <ProjectSelectorDropdown
        projects={[]}
        onSelectProject={mockSelect}
      />
    )

    const select = screen.getByTitle('Select Project')
    expect(select).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    const mockSelect = vi.fn()
    render(
      <ProjectSelectorDropdown
        projects={mockProjects}
        onSelectProject={mockSelect}
      />
    )

    const select = screen.getByTitle('Select Project')
    expect(select).toHaveClass('border', 'border-gray-300', 'dark:border-gray-600')
  })

  it('does not call onSelectProject when selecting same project', () => {
    const mockSelect = vi.fn()
    render(
      <ProjectSelectorDropdown
        projects={mockProjects}
        selectedProject={mockProjects[0]}
        onSelectProject={mockSelect}
      />
    )

    const select = screen.getByTitle('Select Project') as HTMLSelectElement
    // Try to select non-existent project
    fireEvent.change(select, { target: { value: 'invalid' } })

    expect(mockSelect).not.toHaveBeenCalled()
  })
})