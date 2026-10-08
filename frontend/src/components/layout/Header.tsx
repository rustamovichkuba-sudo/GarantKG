import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Shield, Menu, X, Bell, User, LogOut, ChevronDown } from 'lucide-react'
import { isLoggedIn, getStoredUser, setStoredUser } from '../../lib/auth'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const loggedIn = isLoggedIn()
  const user = getStoredUser()

  function handleLogout() {
    setStoredUser(null)
    navigate('/')
    setUserMenuOpen(false)
  }

  const navLinks = [
    { to: '/listings', label: 'Объявления' },
    { to: '/how-it-works', label: 'Как это работает' },
    { to: '/about', label: 'О платформе' },
  ]

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Garant<span className="text-primary-600">.kg</span>
            </span>
          </Link>

          {/* Навигация — десктоп */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Правый блок */}
          <div className="hidden md:flex items-center gap-3">
            {loggedIn ? (
              <>
                <button className="relative p-2 text-gray-500 hover:text-gray-700">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user?.first_name || 'Профиль'}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" /> Личный кабинет
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" /> Выйти
                      </button>
                    </div>
                  )}
                </div>
                <Link
                  to="/listings/new"
                  className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                  + Разместить
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2"
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>

          {/* Бургер меню */}
          <button
            className="md:hidden p-2 text-gray-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2 text-sm text-gray-700 hover:text-primary-600"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-gray-100" />
          {loggedIn ? (
            <>
              <Link to="/dashboard" className="block py-2 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>
                Личный кабинет
              </Link>
              <button onClick={handleLogout} className="block py-2 text-sm text-red-600">
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>
                Войти
              </Link>
              <Link to="/register" className="block py-2 text-sm font-medium text-primary-600" onClick={() => setMenuOpen(false)}>
                Регистрация
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
