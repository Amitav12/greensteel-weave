import React from 'react';

export function DebugInfo() {
  const [errors, setErrors] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setErrors(prev => [...prev, event.message]);
    };
    
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setErrors(prev => [...prev, `Promise rejection: ${event.reason}`]);
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
  
  if (errors.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md z-50">
      <h3 className="font-bold">Debug Errors:</h3>
      <ul className="list-disc list-inside text-sm">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
}