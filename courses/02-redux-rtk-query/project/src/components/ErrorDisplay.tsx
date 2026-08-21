interface ErrorDisplayProps {
  error: unknown
  onRetry?: () => void
}

const ErrorDisplay = ({
  error,
  onRetry,
}: ErrorDisplayProps) => {
  const getErrorMessage = () => {
    if (error instanceof Error) {
      return error.message
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'error' in error
    ) {
      const errorObject = error as { error?: string }

      if (errorObject.error) {
        return errorObject.error
      }
    }

    return 'Failed to load data. Please try again.'
  }

  return (
    <div data-testid="error-display">
      <p>{getErrorMessage()}</p>

      {onRetry && (
        <button
          type="button"
          data-testid="retry-btn"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorDisplay