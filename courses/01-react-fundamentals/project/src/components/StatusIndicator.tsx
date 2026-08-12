/**
 * Reusable task due-date/completion status indicator.
 */
interface StatusIndicatorProps {
  status:
    | 'overdue'
    | 'due-today'
    | 'due-soon'
    | 'completed'
}

export default function StatusIndicator({
  status,
}: StatusIndicatorProps) {
  const labels: Record<
    StatusIndicatorProps['status'],
    string
  > = {
    overdue: 'Overdue',
    'due-today': 'Due Today',
    'due-soon': 'Due Soon',
    completed: 'Completed',
  }

  return (
    <span
      data-status={status}
      aria-label={labels[status]}
      style={{
        display: 'inline-block',
        marginLeft: '6px',
        padding: '2px 8px',
        borderRadius: '10px',
        fontSize: '0.8rem',
      }}
    >
      {labels[status]}
    </span>
  )
}