import { useRef } from 'react'

type FilterType = 'all' | 'active' | 'completed'

type SortOrder =
  | 'recent'
  | 'priority-high'
  | 'priority-low'
  | 'alphabetical'

interface FilterBarProps {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void

  sortOrder?: SortOrder
  onSortChange?: (sortOrder: SortOrder) => void

  searchText?: string
  onSearchChange?: (searchText: string) => void
}

export default function FilterBar({
  filter,
  onFilterChange,
  sortOrder = 'recent',
  onSortChange,
  searchText = '',
  onSearchChange,
}: FilterBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleClearSearch = () => {
    if (onSearchChange) {
      onSearchChange('')
    }

    searchInputRef.current?.focus()
  }

  return (
    <div id="filter-bar">
      <div>
        <button
          type="button"
          data-active={filter === 'all' ? 'true' : 'false'}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>

        <button
          type="button"
          data-active={filter === 'active' ? 'true' : 'false'}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>

        <button
          type="button"
          data-active={filter === 'completed' ? 'true' : 'false'}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </div>

      {onSearchChange && (
        <div>
          <input
            ref={searchInputRef}
            id="search-input"
            type="text"
            value={searchText}
            placeholder="Search tasks..."
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
          />

          {searchText && (
            <button
              id="clear-search"
              type="button"
              onClick={handleClearSearch}
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {onSortChange && (
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(event) =>
            onSortChange(event.target.value as SortOrder)
          }
        >
          <option value="recent">Recently Added</option>
          <option value="priority-high">
            Priority: High to Low
          </option>
          <option value="priority-low">
            Priority: Low to High
          </option>
          <option value="alphabetical">
            Alphabetical
          </option>
        </select>
      )}
    </div>
  )
}