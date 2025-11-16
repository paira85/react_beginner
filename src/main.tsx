import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/index.tsx'
import { BrowserRouter } from 'react-router'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import SignIn from './pages/sign-in/index'
import SignUp from './pages/sign-up'

import RootLayout from './pages/layout.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import CreateTopic from './pages/topics/create.tsx'
import TopicDetail from './pages/topics/detail.tsx' 
import { Toaster } from 'sonner'
import Portfolio from './pages/portfolio/index.tsx'
import AuthCallback from './pages/auth/callback.tsx'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">     
      <BrowserRouter>
      
      
        <Routes>
          <Route element={<RootLayout />} >
            <Route index element={<App />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="auth/callback" element={<AuthCallback />} />
            <Route path="topics/:topicId/create" element={<CreateTopic />} />
            <Route path="topics/:topicId/Detail" element={<TopicDetail />} />
            <Route path="portfolio" element={<Portfolio />} />
            
          </Route>
        </Routes>
      
      </BrowserRouter>
      <Toaster richColors position='top-center'  />
    </ThemeProvider>
  </StrictMode>
)
