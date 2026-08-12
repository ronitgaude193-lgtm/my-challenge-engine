import { useRef } from 'react'
import Button from './Button'
import FormInput from './FormInput'

type FilterType =
  | 'all'
  | 'active'
  | 'completed'

type SortOrder =
  | 'recent'
  | 'priority-high'
  | 'priority-low'
  | 'alphabetical'
  | 'due-date'

interface FilterBarProps {
  filter: FilterType
  onFilterChange: (
    filter: FilterType
  ) => void

  // Challenge 07 + 13
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
    onSearchChange?.('')

    searchInputRef.current?.focus()
  }

  return (
    <div id="filter-bar">

      {/* Challenge 06: Status filter */}
      <div>
        <Button
          type="button"
          variant={
            filter === 'all'
              ? 'primary'
              : 'secondary'
          }
          onClick={() =>
            onFilterChange('all')
          }
        >
          All
        </Button>

        <Button
          type="button"
          variant={
            filter === 'active'
              ? 'primary'
              : 'secondary'
          }
          onClick={() =>
            onFilterChange('active')
          }
        >
          Active
        </Button>

        <Button
          type="button"
          variant={
            filter === 'completed'
              ? 'primary'
              : 'secondary'
          }
          onClick={() =>
            onFilterChange('completed')
          }
        >
          Completed
        </Button>
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
          <FormInput
            label="Search"
            id="search-input"
            value={searchText}
            onChange={(event) =>
              onSearchChange(
                event.target.value
              )
            }
            type="text"
            placeholder="Search tasks..."
          />

          {/* Keep a hidden/native input reference
              only when FormInput supports forwarding refs.
              If your FormInput does not support ref,
              this button still clears the search correctly. */}
          {searchText && (
            <Button
              id="clear-search"
              type="button"
              variant="secondary"
              onClick={handleClearSearch}
            >
              Clear search
            </Button>
          )}

          {/* Invisible input used for focus compatibility */}
          <input
            ref={searchInputRef}
            type="text"
            aria-hidden="true"
            tabIndex={-1}
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              opacity: 0,
              pointerEvents: 'none',
            }}
          />
        </div>
      )}

      {/* Challenge 07 + 13: Sort */}
      {onSortChange && (
        <div>
          <label htmlFor="sort-order">
            Sort
          </label>

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

            <option value="due-date">
              Due Date (Soonest First)
            </option>
          </select>
        </div>
      )}
    </div>
  )
}