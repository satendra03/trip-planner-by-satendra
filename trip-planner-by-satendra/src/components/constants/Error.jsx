import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error h-screen w-screen flex items-center justify-center bg-black">
            <h1 className='text-3xl sm:text-4xl font-extrabold text-center tracking-tight lg:text-5xl text-white/65'>Somthing went wrong</h1>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
