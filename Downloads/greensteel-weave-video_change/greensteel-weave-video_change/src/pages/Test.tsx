import React from 'react';

export default function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          🎉 Website is Working!
        </h1>
        <p className="text-xl text-gray-600">
          AAASHA TRADING LTD - Test Page
        </p>
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-green-200/50 shadow-xl">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            ✅ Components Status
          </h2>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>React is working</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Tailwind CSS is working</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Routing is working</span>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Navigate to <code className="bg-gray-100 px-2 py-1 rounded">/</code> to see the main website
        </div>
      </div>
    </div>
  );
}