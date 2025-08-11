import React, { Component, ErrorInfo, ReactNode } from 'react';
import heroImage from "@/assets/hero-recycling-steel.jpg";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class CarouselErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console for debugging
    console.error('Carousel Error Boundary caught an error:', error, errorInfo);
    
    // You could also log this to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return this.props.fallback || (
        <div className="absolute inset-0 z-10">
          <img
            src={heroImage}
            alt="Recycling and steel operations"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            loading="eager"
            style={{
              filter: 'brightness(0.7) contrast(1.1)'
            }}
          />
          {/* Optional error indicator for development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="absolute top-4 right-4 bg-red-500/20 text-red-300 px-3 py-1 rounded text-xs">
              Carousel Error: {this.state.error?.message}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}