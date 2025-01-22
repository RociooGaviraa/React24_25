import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PokemonProvider } from './context/PokemonContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PokemonProvider>
      <App/>
    </PokemonProvider>
    <App />
  </StrictMode>,
)
