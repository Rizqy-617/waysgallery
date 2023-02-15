import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppContextProvider } from './context/AppContext'
import { QueryClient, QueryClientProvider} from "react-query"
import { BrowserRouter } from "react-router-dom"
import './index.css'

const client = new QueryClient

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </AppContextProvider>
  </React.StrictMode>,
)
