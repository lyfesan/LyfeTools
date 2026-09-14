import { useEffect, useId, useRef, useState } from 'react'
import { FaCheck, FaChevronDown, FaMagnifyingGlass } from 'react-icons/fa6'

export interface ComboBoxOption {
  label: string
  value: string
  disabled?: boolean
}

type ComboBoxProps = {
  options: Array<ComboBoxOption | string>
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

function normalizeOption(option: ComboBoxOption | string): ComboBoxOption {
  return typeof option === 'string' ? { label: option, value: option } : option
}

export function ComboBox({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
}: ComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const listboxId = useId()
  const normalizedOptions = options.map(normalizeOption)
  const selectedOption = normalizedOptions.find((option) => option.value === value)
  const filteredOptions = normalizedOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    if (isOpen) searchInputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  function moveHighlight(direction: 1 | -1) {
    const enabledIndexes = filteredOptions
      .map((option, index) => (option.disabled ? -1 : index))
      .filter((index) => index >= 0)

    if (enabledIndexes.length === 0) return

    const currentPosition = enabledIndexes.indexOf(highlightedIndex)
    const nextPosition = currentPosition < 0
      ? 0
      : (currentPosition + direction + enabledIndexes.length) % enabledIndexes.length

    setHighlightedIndex(enabledIndexes[nextPosition])
  }

  function selectOption(index: number) {
    const option = filteredOptions[index]
    if (!option || option.disabled) return
    onChange(option.value)
    setIsOpen(false)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!isOpen) setIsOpen(true)
        moveHighlight(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        if (!isOpen) setIsOpen(true)
        moveHighlight(-1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (isOpen) selectOption(highlightedIndex)
        else setIsOpen(true)
        break
      case 'Escape':
        setIsOpen(false)
        break
      default:
        break
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && <label className="mb-2 block text-sm font-medium text-txt-main">{label}</label>}

      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => {
          setSearchTerm('')
          setHighlightedIndex(0)
          setIsOpen((open) => !open)
        }}
        onKeyDown={handleKeyDown}
        className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-surface px-4 py-2 text-left text-txt-main shadow-sm transition hover:border-border-hover focus:outline-none focus:ring-2 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={selectedOption ? '' : 'text-txt-muted'}>{selectedOption?.label ?? placeholder}</span>
        <FaChevronDown className={`ml-3 h-3 w-3 text-txt-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label ?? 'Options'}
          className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-border bg-surface py-1 shadow-lg"
        >
          <li className="px-2 py-2">
            <div className="flex items-center rounded-md border border-border px-3 focus-within:ring-2 focus-within:ring-brand">
              <FaMagnifyingGlass className="mr-2 h-3 w-3 text-txt-muted" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value)
                  setHighlightedIndex(0)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    event.preventDefault()
                    moveHighlight(event.key === 'ArrowDown' ? 1 : -1)
                  }
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    selectOption(highlightedIndex)
                  }
                }}
                placeholder="Search options..."
                aria-label="Search options"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-txt-main outline-none placeholder:text-txt-muted"
              />
            </div>
          </li>

          {filteredOptions.length === 0 ? (
            <li className="px-4 py-2 text-sm text-txt-muted">No options found.</li>
          ) : filteredOptions.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
              onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
              onClick={() => selectOption(index)}
              className={`flex items-center justify-between px-4 py-2 text-sm ${option.disabled
                ? 'cursor-not-allowed text-txt-muted'
                : index === highlightedIndex
                  ? 'cursor-pointer bg-surface-subtle text-txt-main'
                  : 'cursor-pointer text-txt-secondary hover:bg-surface-subtle hover:text-txt-main'
                }`}
            >
              {option.label}
              {option.value === value && <FaCheck className="h-3 w-3 text-brand" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}