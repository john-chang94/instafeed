import { useEffect } from 'react';
import Header from '../components/header';

export default function NotFound() {
    useEffect(() => {
        document.title = 'Not Found - Instafeed'
    }, [])

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <p className="text-center text-2xl">Page Not Found!</p>
            </div>
        </div>
    )
}