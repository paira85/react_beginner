
import './App.css';
import { AppHeader, AppFooter, AppSidebar } from './components/common';
import { ThemeProvider } from './components/theme-provider';
import { Button } from './components/ui';
export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="page">
        <AppHeader />
        <div className="container">
          <main className="w-full h-hull min-h-[720px] flex p-6 gap-6">
            {/* 카테고리 사이드바 */}
            <AppSidebar />
            {/* 토픽 콘텐츠 */}
            <section>

            </section>
          </main>
        </div>
        <AppFooter />
      </div>
    </ThemeProvider>
  )
}