import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// На GitHub Pages сайт живёт по /GarantKG/, поэтому basename нужен
const basename = import.meta.env.VITE_BASE_URL || '/GarantKG/'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ListingsPage from './pages/ListingsPage'
import HowItWorksPage from './pages/HowItWorksPage'
import AboutPage from './pages/AboutPage'
import FaqPage from './pages/FaqPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import { isLoggedIn } from './lib/auth'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
})

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return isLoggedIn() ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={basename}>
        <Routes>
          {/* Страницы без шапки/подвала */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Страницы с Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/listings/:id" element={<ListingsPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />

            {/* Защищённые роуты */}
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />

            {/* Заглушки — появятся в следующих этапах */}
            <Route path="/listings/new" element={<PrivateRoute><ComingSoon title="Новое объявление" /></PrivateRoute>} />
            <Route path="/deals" element={<PrivateRoute><ComingSoon title="Мои сделки" /></PrivateRoute>} />
            <Route path="/notifications" element={<PrivateRoute><ComingSoon title="Уведомления" /></PrivateRoute>} />
            <Route path="/my-listings" element={<PrivateRoute><ComingSoon title="Мои объявления" /></PrivateRoute>} />
            <Route path="/terms" element={<ComingSoon title="Условия использования" />} />
            <Route path="/privacy" element={<ComingSoon title="Политика конфиденциальности" />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🚧</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-500 text-sm">Этот раздел появится в следующем обновлении.</p>
      </div>
    </div>
  )
}
