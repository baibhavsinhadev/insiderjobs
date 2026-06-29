import { ClerkProvider } from '@clerk/react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx';

// Import Clerk PUBLISHABLE_KEY
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
    throw new Error("PUBLISHABLE is not provided");
};

createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <BrowserRouter>
            <AppProvider>
                <App />
            </AppProvider>
        </BrowserRouter>
    </ClerkProvider >
);