interface FilterBarProps {
  filter: 'all' | 'active' | 'completed'
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void
  sortOrder: 'recent' | 'priority-high' | 'priority-low' | 'alphabetical'
  onSortChange: (
    sortOrder: 'recent' | 'priority-high' | 'priority-low' | 'alphabetical'
  ) => void
}

export default function FilterBar({
  filter,
  onFilterChange,
  sortOrder,
  onSortChange,
}: FilterBarProps) {
  return (
    <div id="filter-bar">
      <button
        type="button"
        data-active={filter === 'all'}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>

      <button
        type="button"
        data-active={filter === 'active'}
        onClick={() => onFilterChange('active')}
      >
        Active
      </button>

      <button
        type="button"
        data-active={filter === 'completed'}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>

      <select
        id="sort-order"
        value={sortOrder}
        onChange={(event) =>
          onSortChange(
            event.target.value as
              | 'recent'
              | 'priority-high'
              | 'priority-low'
              | 'alphabetical'
          )
        }
      >
        <option value="recent">Recently Added</option>
        <option value="priority-high">Priority: High to Low</option>
        <option value="priority-low">Priority: Low to High</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  )
}