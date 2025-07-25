import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

console.log('main.tsx loading...');

try {
  const root = document.getElementById('root');
  console.log('Root element:', root);
  
  if (!root) {
    throw new Error('Root element not found');
  }
  
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
  console.log('App rendered');
} catch (error) {
  console.error('Main.tsx error:', error);
  document.body.innerHTML = `<h1>Error loading app</h1><pre>${error}</pre>`;
}
