import { Link } from 'react-router-dom'
import {
  Shield, Search, Briefcase, CheckCircle, Star,
  ArrowRight, Users, TrendingUp, Clock, Wrench,
  Monitor, Home, Truck, GraduationCap, Camera,
  Zap, Droplets, Brush, ChevronRight
} from 'lucide-react'

const categories = [
  { icon: Monitor, label: 'IT и разработка', count: '120+', slug: 'it' },
  { icon: Wrench, label: 'Ремонт и строительство', count: '340+', slug: 'repair' },
  { icon: Zap, label: 'Электрика', count: '85+', slug: 'electric' },
  { icon: Droplets, label: 'Сантехника', count: '60+', slug: 'plumbing' },
  { icon: Camera, label: 'Видеонаблюдение', count: '45+', slug: 'cctv' },
  { icon: Brush, label: 'Уборка', count: '90+', slug: 'cleaning' },
  { icon: Truck, label: 'Перевозки', count: '110+', slug: 'delivery' },
  { icon: GraduationCap, label: 'Репетиторство', count: '75+', slug: 'tutor' },
]

const steps = [
  { n: '01', title: 'Найдите друг друга', desc: 'Разместите объявление или найдите подходящее предложение в каталоге.' },
  { n: '02', title: 'Договоритесь об условиях', desc: 'Обсудите детали в чате и зафиксируйте условия, сроки и стоимость.' },
  { n: '03', title: 'Внесите средства', desc: 'Заказчик резервирует оплату на платформе — деньги заморожены до завершения.' },
  { n: '04', title: 'Выполните работу', desc: 'Исполнитель выполняет задание по зафиксированным условиям.' },
  { n: '05', title: 'Подтвердите результат', desc: 'Заказчик принимает работу или открывает спор с доказательствами.' },
  { n: '06', title: 'Получите деньги', desc: 'После подтверждения средства переходят исполнителю. Оба оставляют отзывы.' },
]

const reviews = [
  { name: 'Айгерим К.', role: 'Заказчик', text: 'Нашла отличного разработчика через Garant.kg. Условия зафиксированы, деньги в безопасности — никаких рисков.', rating: 5 },
  { name: 'Бакыт М.', role: 'Исполнитель', text: 'Раньше боялся, что заказчик не заплатит. Теперь деньги зарезервированы заранее — работаю спокойно.', rating: 5 },
  { name: 'Жылдыз А.', role: 'Заказчик', text: 'Возник спор — модератор разобрался за день, вернул часть средств. Честно и прозрачно.', rating: 4 },
]

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6">
              <Shield className="w-4 h-4 text-green-300" />
              <span>Безопасные сделки для Кыргызстана</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Найди человека.<br />
              Заключи сделку.<br />
              <span className="text-green-300">Получи защиту.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl">
              Платформа, где заказчики и исполнители работают без рисков — деньги
              заморожены до подтверждения результата, каждый шаг зафиксирован.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/listings?kind=offer"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-primary-50 transition text-base shadow-lg"
              >
                <Search className="w-5 h-5" />
                Найти исполнителя
              </Link>
              <Link
                to="/listings?kind=order"
                className="inline-flex items-center justify-center gap-2 bg-primary-500/30 backdrop-blur border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-primary-500/50 transition text-base"
              >
                <Briefcase className="w-5 h-5" />
                Найти работу
              </Link>
            </div>
          </div>
        </div>
        {/* Волна */}
        <div className="h-12 bg-white" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </section>

      {/* Статистика */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12">
            {[
              { icon: Users, value: '2 400+', label: 'Пользователей' },
              { icon: CheckCircle, value: '1 800+', label: 'Сделок завершено' },
              { icon: TrendingUp, value: '96%', label: 'Успешных сделок' },
              { icon: Clock, value: '4.8 / 5', label: 'Средний рейтинг' },
            ].map((s) => (
              <div key={s.label} className="text-center p-6 bg-gray-50 rounded-2xl">
                <s.icon className="w-7 h-7 text-primary-600 mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Категории услуг</h2>
              <p className="text-gray-500 mt-1">Найдите специалиста в нужной области</p>
            </div>
            <Link to="/listings" className="hidden sm:flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
              Все категории <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/listings?category=${cat.slug}`}
                className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary-100 transition">
                  <cat.icon className="w-5 h-5 text-primary-600" />
                </div>
                <p className="font-medium text-gray-800 text-sm leading-snug">{cat.label}</p>
                <p className="text-xs text-gray-400 mt-1">{cat.count} объявлений</p>
              </Link>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:hidden">
            <Link to="/listings" className="col-span-2 text-center text-primary-600 text-sm font-medium py-2">
              Все категории →
            </Link>
          </div>
        </div>
      </section>

      {/* Как работает */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Как работает Garant.kg</h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">
              Шесть шагов от поиска до получения оплаты — всё прозрачно и под защитой
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.n} className="relative bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <span className="text-4xl font-extrabold text-primary-100 select-none">{step.n}</span>
                <h3 className="text-base font-semibold text-gray-900 mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Подробнее о процессе <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Что говорят пользователи
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-primary-100 mb-8">
            Зарегистрируйтесь бесплатно и совершайте сделки без рисков
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-50 transition shadow-lg"
            >
              <Shield className="w-5 h-5" />
              Создать аккаунт
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition"
            >
              Узнать подробнее <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
