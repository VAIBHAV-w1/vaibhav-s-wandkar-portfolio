import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Error captured by boundary; fallback UI is displayed cleanly.
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="container-x py-24 text-center">
            <p className="eyebrow text-muted mb-3">Something went wrong</p>
            <h2 className="text-2xl font-medium text-ink mb-6">This section could not be displayed.</h2>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink transition hover:border-accent-ink"
            >
              Try again
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
