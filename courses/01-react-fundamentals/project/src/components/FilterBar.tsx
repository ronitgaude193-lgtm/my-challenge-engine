import { useRef } from 'react'

type FilterType =
  | 'all'
  | 'active'
  | 'completed'

type SortOrder =
  | 'recent'
  | 'priority-high'
  | 'priority-low'
  | 'alphabetical'

interface FilterBarProps {
  filter: FilterType
  onFilterChange: (
    filter: FilterType
  ) => void

  // Challenge 07
  sortOrder?: SortOrder
  onSortChange?: (
    sortOrder: SortOrder
  ) => void

  // Challenge 09 + 11
  searchText?: string
  onSearchChange?: (
    searchText: string
  ) => void

  // Challenge 12
  categoryFilter?: string
  onCategoryChange?: (
    category: string
  ) => void
  categories?: string[]
}

export default function FilterBar({
  filter,
  onFilterChange,

  sortOrder = 'recent',
  onSortChange,

  searchText = '',
  onSearchChange,

  categoryFilter = 'all',
  onCategoryChange,

  categories = [],
}: FilterBarProps) {
  const searchInputRef =
    useRef<HTMLInputElement>(null)

  const handleClearSearch = () => {
    if (onSearchChange) {
      onSearchChange('')
    }

    searchInputRef.current?.focus()
  }

  return (
    <div id="filter-bar">
      {/* Challenge 06: Status filter */}
      <div>
        <button
          type="button"
          data-active={
            filter === 'all'
              ? 'true'
              : 'false'
          }
          onClick={() =>
            onFilterChange('all')
          }
        >
          All
        </button>

        <button
          type="button"
          data-active={
            filter === 'active'
              ? 'true'
              : 'false'
          }
          onClick={() =>
            onFilterChange('active')
          }
        >
          Active
        </button>

        <button
          type="button"
          data-active={
            filter === 'completed'
              ? 'true'
              : 'false'
          }
          onClick={() =>
            onFilterChange('completed')
          }
        >
          Completed
        </button>
      </div>

      {/* Challenge 12: Category filter */}
      {onCategoryChange && (
        <div>
          <label htmlFor="category-filter">
            Category
          </label>

          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(event) =>
              onCategoryChange(
                event.target.value
              )
            }
          >
            <option value="all">
              All categories
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Challenge 09 + 11: Search */}
      {onSearchChange && (
        <div>
          <label htmlFor="search-input">
            Search
          </label>

          <input
            ref={searchInputRef}
            id="search-input"
            type="text"
            value={searchText}
            placeholder="Search tasks..."
            onChange={(event) =>
              onSearchChange(
                event.target.value
              )
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

      {/* Challenge 07: Sort */}
      {onSortChange && (
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(event) =>
            onSortChange(
              event.target.value as SortOrder
            )
          }
        >
          <option value="recent">
            Recently Added
          </option>

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