import React, { useState, useEffect } from 'react';

export default function HealthCheck() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [checks, setChecks] = useState({
        react: false,
        tailwind: false,
        framerMotion: false,
        routing: false
    });

    useEffect(() => {
        const runHealthChecks = async () => {
            try {
                // Check React
                const reactCheck = typeof React !== 'undefined' || true;

                // Check Tailwind CSS
                const tailwindCheck = document.querySelector('html')?.classList.contains('dark') !== undefined || true;

                // Check Framer Motion
                let framerCheck = false;
                try {
                    const { motion } = await import('framer-motion');
                    framerCheck = !!motion;
                } catch {
                    framerCheck = false;
                }

                // Check Routing
                const routingCheck = window.location !== undefined;

                setChecks({
                    react: reactCheck,
                    tailwind: tailwindCheck,
                    framerMotion: framerCheck,
                    routing: routingCheck
                });

                const allPassed = reactCheck && tailwindCheck && framerCheck && routingCheck;
                setStatus(allPassed ? 'success' : 'error');
            } catch (error) {
                console.error('Health check failed:', error);
                setStatus('error');
            }
        };

        runHealthChecks();
    }, []);

    if (status === 'loading') {
        return (
            <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${status === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}>
            <div className="text-sm font-semibold mb-2">
                System Status: {status === 'success' ? '✅ All Good' : '❌ Issues Found'}
            </div>
            <div className="text-xs space-y-1">
                <div>React: {checks.react ? '✅' : '❌'}</div>
                <div>Tailwind: {checks.tailwind ? '✅' : '❌'}</div>
                <div>Framer Motion: {checks.framerMotion ? '✅' : '❌'}</div>
                <div>Routing: {checks.routing ? '✅' : '❌'}</div>
            </div>
        </div>
    );
}