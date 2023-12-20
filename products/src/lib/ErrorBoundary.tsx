import React, { ReactNode, ErrorInfo } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode | null;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static defaultProps: Partial<ErrorBoundaryProps>;
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
ErrorBoundary.defaultProps = {
  fallback: (
    <React.Fragment>
      <div>Something went wrong</div>
    </React.Fragment>
  ),
};
export default ErrorBoundary;
