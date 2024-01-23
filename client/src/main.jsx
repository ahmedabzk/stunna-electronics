import React from 'react'
import ReactDOM from 'react-dom/client';

import { ProSidebarProvider } from "react-pro-sidebar";

import { QueryClientProvider} from "@tanstack/react-query";
import App from './App.jsx';
import { queryClient } from './utils/http.js';
import './index.css'

import { CartProgressContextProvider } from "./context/CartProgress.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { UserContextProvider } from './context/UserContext.jsx';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <UserContextProvider>
        <CartContextProvider>
          <CartProgressContextProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </CartProgressContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </ProSidebarProvider>
  </React.StrictMode>
);
