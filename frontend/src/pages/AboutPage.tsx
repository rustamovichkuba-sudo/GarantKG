import { Shield, Target, Users, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">О платформе</h1>
          <p className="text-primary-100">Garant.kg — безопасные сделки для Кыргызстана</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Наша миссия</h2>
          <p className="text-gray-600 leading-relaxed">
            Мы создали Garant.kg, чтобы устранить главную проблему рынка фриланса и услуг в Кыргызстане —
            отсутствие доверия между незнакомыми людьми. Заказчики боятся платить вперёд и не получить результат.
            Исполнители боятся работать и не получить оплату. Мы решаем обе проблемы.
          </p>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: 'Безопасность', desc: 'Деньги заморожены на платформе до подтверждения результата обеими сторонами' },
            { icon: Target, title: 'Прозрачность', desc: 'Все условия зафиксированы и неизменны. Каждое действие записывается' },
            { icon: Award, title: 'Репутация', desc: 'Реальные отзывы только по завершённым сделкам — никакой накрутки' },
          ].map((v) => (
            <div key={v.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <v.icon className="w-8 h-8 text-primary-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Для кого платформа</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { role: 'Заказчики', items: ['Найти проверенного исполнителя', 'Зафиксировать условия до оплаты', 'Платить только за принятый результат', 'Открыть спор при несоответствии'] },
              { role: 'Исполнители', items: ['Получить надёжных заказчиков', 'Деньги зарезервированы до начала работы', 'Доказать выполнение с документами', 'Накопить рейтинг и репутацию'] },
            ].map((g) => (
              <div key={g.role} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-600" /> {g.role}
                </h3>
                <ul className="space-y-2">
                  {g.items.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-1.5 shrink-0" />{i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-gray-700">
          <strong className="text-amber-700">⚠️ Важно:</strong> Платформа находится в стадии MVP. Реальный приём средств
          требует получения лицензии и подключения платёжного партнёра. Сейчас работает тестовый режим.
        </div>
        <div className="text-center">
          <Link to="/register" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3.5 rounded-xl transition">
            Начать бесплатно
          </Link>
        </div>
      </div>
    </div>
  )
}
