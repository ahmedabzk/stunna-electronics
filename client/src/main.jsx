import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from './App.jsx'
import './index.css'

import { CartProgressContextProvider } from "./context/CartProgress.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { UserContextProvider } from './context/UserContext.jsx';



const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <CartContextProvider>
          <CartProgressContextProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </CartProgressContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
