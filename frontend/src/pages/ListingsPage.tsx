import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Filter, MapPin, Clock, Star, Briefcase, X, ChevronDown } from 'lucide-react'

// Моковые данные — заменятся на API в Этапе 2
const MOCK_LISTINGS = [
  { id: 1, kind: 'offer', title: 'Разработка сайтов на React / Django', category: 'IT и разработка', city: 'Бишкек', price: 15000, rating: 4.9, reviews: 34, deadline: '7 дней', user: 'Азамат К.', verified: true, tags: ['React', 'Django', 'REST API'] },
  { id: 2, kind: 'order', title: 'Нужен электрик для замены проводки', category: 'Электрика', city: 'Бишкек', price: 8000, rating: null, reviews: 0, deadline: '3 дня', user: 'Айгерим С.', verified: false, tags: ['Электрика', 'Срочно'] },
  { id: 3, kind: 'offer', title: 'Сантехник — установка, ремонт, замена труб', category: 'Сантехника', city: 'Ош', price: 3000, rating: 4.7, reviews: 18, deadline: '1 день', user: 'Марат Дж.', verified: true, tags: ['Сантехника', 'Срочно'] },
  { id: 4, kind: 'offer', title: 'Репетитор по математике и физике', category: 'Репетиторство', city: 'Бишкек', price: 700, rating: 5.0, reviews: 52, deadline: 'Гибко', user: 'Нурзат А.', verified: true, tags: ['Математика', 'Физика', 'ЕГЭ'] },
  { id: 5, kind: 'order', title: 'Требуется уборщица 2 раза в неделю', category: 'Уборка', city: 'Бишкек', price: 4000, rating: null, reviews: 0, deadline: 'Постоянно', user: 'Гульмира Т.', verified: true, tags: ['Уборка', 'Регулярно'] },
  { id: 6, kind: 'offer', title: 'Грузоперевозки по городу и регионам', category: 'Перевозки', city: 'Бишкек', price: 2500, rating: 4.6, reviews: 27, deadline: 'Любой день', user: 'Тилек И.', verified: false, tags: ['Газель', 'Грузоперевозки'] },
  { id: 7, kind: 'offer', title: 'Установка видеонаблюдения под ключ', category: 'Видеонаблюдение', city: 'Бишкек', price: 12000, rating: 4.8, reviews: 11, deadline: '2 дня', user: 'Эркин М.', verified: true, tags: ['CCTV', 'Установка'] },
  { id: 8, kind: 'order', title: 'Разработка мобильного приложения (iOS/Android)', category: 'IT и разработка', city: 'Удалённо', price: 80000, rating: null, reviews: 0, deadline: '30 дней', user: 'StarupKG', verified: true, tags: ['Flutter', 'React Native'] },
]

const CATEGORIES = ['Все категории', 'IT и разработка', 'Электрика', 'Сантехника', 'Репетиторство', 'Уборка', 'Перевозки', 'Видеонаблюдение', 'Ремонт и строительство']
const CITIES = ['Все города', 'Бишкек', 'Ош', 'Удалённо']

function Badge({ kind }: { kind: string }) {
  return kind === 'offer'
    ? <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">Предложение</span>
    : <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full"><Briefcase className="w-3 h-3" />Заказ</span>
}

export default function ListingsPage() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [kind, setKind] = useState(searchParams.get('kind') || 'all')
  const [category, setCategory] = useState(searchParams.get('category') || 'Все категории')
  const [city, setCity] = useState('Все города')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = MOCK_LISTINGS.filter((l) => {
    const matchKind = kind === 'all' || l.kind === kind
    const matchCat = category === 'Все категории' || l.category === category
    const matchCity = city === 'Все города' || l.city === city
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchKind && matchCat && matchCity && matchSearch
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Шапка страницы */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Объявления</h1>
          <p className="text-gray-500 text-sm">Найдите исполнителя или подходящий заказ</p>

          {/* Поиск */}
          <div className="mt-5 flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по объявлениям..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition ${showFilters ? 'border-primary-400 bg-primary-50 text-primary-600' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              <Filter className="w-4 h-4" />
              Фильтры
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <Link to="/listings/new" className="hidden sm:flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition">
              + Разместить
            </Link>
          </div>

          {/* Фильтры */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Тип</label>
                <select value={kind} onChange={e => setKind(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-400">
                  <option value="all">Все объявления</option>
                  <option value="offer">Предложения</option>
                  <option value="order">Заказы</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Категория</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-400">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Город</label>
                <select value={city} onChange={e => setCity(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary-400">
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Вкладки вид */}
          <div className="mt-5 flex gap-2">
            {[['all', 'Все'], ['offer', 'Предложения'], ['order', 'Заказы']].map(([v, l]) => (
              <button key={v} onClick={() => setKind(v)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${kind === v ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'}`}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Список */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-sm text-gray-500 mb-4">Найдено: {filtered.length} объявлений</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Ничего не найдено</p>
            <p className="text-gray-400 text-sm mt-1">Попробуйте изменить параметры поиска</p>
            <button onClick={() => { setSearch(''); setKind('all'); setCategory('Все категории'); setCity('Все города') }} className="mt-4 text-primary-600 text-sm hover:underline">
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <Link key={item.id} to={`/listings/${item.id}`} className="group bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all p-5 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <Badge kind={item.kind} />
                  {item.verified && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />Верифицирован
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-2 group-hover:text-primary-600 transition line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-400 mb-3">{item.category}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map(t => (
                    <span key={t} className="text-xs bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>

                <div className="mt-auto space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {item.price.toLocaleString('ru-KG')} <span className="text-sm font-normal text-gray-400">сом</span>
                    </span>
                    {item.rating && (
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        {item.rating} <span className="text-gray-400 text-xs">({item.reviews})</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.city}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.deadline}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-50 text-xs text-gray-500">{item.user}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
