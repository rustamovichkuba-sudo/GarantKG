import { Link } from 'react-router-dom'
import { Shield, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Бренд */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Garant<span className="text-primary-400">.kg</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Платформа безопасных сделок для Кыргызстана. Найдите исполнителя,
              заключите сделку с гарантией.
            </p>
          </div>

          {/* Платформа */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Платформа</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/how-it-works" className="hover:text-white transition">Как это работает</Link></li>
              <li><Link to="/listings" className="hover:text-white transition">Объявления</Link></li>
              <li><Link to="/about" className="hover:text-white transition">О компании</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Пользователям */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Пользователям</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/register" className="hover:text-white transition">Регистрация</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Войти</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Условия использования</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Политика конфиденциальности</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0" />
                <span>Бишкек, Кыргызстан</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <span>+996 (700) 000-000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <span>info@garant.kg</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2024 Garant.kg. Все права защищены.</p>
          <p className="text-xs text-gray-600">
            ⚠️ Реальный приём средств требует платёжного партнёра — сейчас работает в тестовом режиме
          </p>
        </div>
      </div>
    </footer>
  )
}
