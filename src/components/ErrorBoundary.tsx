import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="shadow-card border-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-red-600">
                An error occurred while rendering the component. This might be related to data structure issues.
              </p>
              
              {this.state.error && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Error Details:</h4>
                  <div className="bg-muted p-3 rounded-md">
                    <pre className="text-xs text-red-600 overflow-auto">
                      {this.state.error.toString()}
                    </pre>
                  </div>
                </div>
              )}
              
              {this.state.errorInfo && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Component Stack:</h4>
                  <div className="bg-muted p-3 rounded-md">
                    <pre className="text-xs text-muted-foreground overflow-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => this.setState({ hasError: false, error: undefined, errorInfo: undefined })}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
