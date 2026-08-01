/**
 * NEXUS COUNTDOWN — Entry Point
 * 
 * Mounts the root application with strict mode.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/layout/App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
