import { Link } from 'react-router-dom'
import { Briefcase, FileText, Plus, Star, Bell } from 'lucide-react'
import { getStoredUser } from '../lib/auth'

export default function DashboardPage() {
  const user = getStoredUser()

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Приветствие */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Добро пожаловать, {user?.first_name || 'пользователь'}!
          </h1>
          <p className="text-gray-500 text-sm mt-1">Управляйте своими объявлениями и сделками</p>
        </div>

        {/* Карточки быстрых действий */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Plus, label: 'Новое объявление', to: '/listings/new', color: 'bg-primary-600 text-white' },
            { icon: Briefcase, label: 'Мои сделки', to: '/deals', color: 'bg-white border border-gray-200 text-gray-700' },
            { icon: FileText, label: 'Мои объявления', to: '/my-listings', color: 'bg-white border border-gray-200 text-gray-700' },
            { icon: Bell, label: 'Уведомления', to: '/notifications', color: 'bg-white border border-gray-200 text-gray-700' },
          ].map((a) => (
            <Link key={a.label} to={a.to} className={`rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition ${a.color}`}>
              <a.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{a.label}</span>
            </Link>
          ))}
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Завершённых сделок', value: '0' },
            { label: 'Активных сделок', value: '0' },
            { label: 'Средний рейтинг', value: '—' },
            { label: 'На балансе', value: '0 сом' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Пустые состояния */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Последние сделки</h3>
            <div className="text-center py-8">
              <Briefcase className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Сделок пока нет</p>
              <Link to="/listings" className="mt-3 inline-block text-primary-600 text-sm hover:underline">
                Найти исполнителя →
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Мои объявления</h3>
            <div className="text-center py-8">
              <Star className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Объявлений пока нет</p>
              <Link to="/listings/new" className="mt-3 inline-block text-primary-600 text-sm hover:underline">
                Разместить объявление →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
