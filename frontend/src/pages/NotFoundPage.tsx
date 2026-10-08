import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-extrabold text-primary-200 select-none">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">Страница не найдена</h1>
        <p className="text-gray-500 mb-8">Такой страницы не существует или она была удалена.</p>
        <div className="flex justify-center gap-3">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-gray-300 transition">
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
          <Link to="/" className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition">
            <Home className="w-4 h-4" /> На главную
          </Link>
        </div>
      </div>
    </div>
  )
}
