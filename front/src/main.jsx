import React from 'react'
import ReactDOM from 'react-dom/client'
import { createContext } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import { useState } from 'react'
import './index.css'
import {Home} from './components/Home'
import {Cesta} from './components/Cesta'
import { Productos } from './components/Productos'
import { Producto } from './components/Producto'

const queryClient= new QueryClient()
export const Context = createContext(null)

function App() {
  const [estado, setEstado]= useState({
    cesta: []
  })
  return <Context.Provider value={[estado, setEstado]}>
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route path="*" element = {<Productos/>}></Route>
            <Route index element = {<Productos/>}></Route>
            <Route path="productos" element={<Productos/>}></Route>
            <Route path="productos/:id" element={<Producto/>}></Route>
            <Route path="cesta" element={<Cesta/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Context.Provider>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
