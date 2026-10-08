import { Link } from 'react-router-dom'
import { Shield, Search, FileText, CreditCard, CheckCircle, Star, AlertTriangle, ArrowRight } from 'lucide-react'

const steps = [
  { icon: Search, color: 'bg-blue-50 text-blue-600', n: '01', title: 'Найдите друг друга', desc: 'Заказчик размещает задание или исполнитель публикует своё предложение услуг. Используйте фильтры по категории, городу, цене и рейтингу.' },
  { icon: FileText, color: 'bg-purple-50 text-purple-600', n: '02', title: 'Зафиксируйте условия', desc: 'В чате обсудите детали и составьте договор: чёткие критерии выполнения, этапы, сроки, стоимость. После согласия обеих сторон условия закрепляются и не меняются.' },
  { icon: CreditCard, color: 'bg-green-50 text-green-600', n: '03', title: 'Внесите средства', desc: 'Заказчик пополняет баланс и резервирует оплату на платформе. Деньги заморожены — исполнитель видит подтверждение и приступает к работе.' },
  { icon: Shield, color: 'bg-orange-50 text-orange-600', n: '04', title: 'Выполните работу', desc: 'Исполнитель работает по зафиксированным условиям. По завершении загружает доказательства: фото, документы, ссылки, текстовый отчёт.' },
  { icon: CheckCircle, color: 'bg-teal-50 text-teal-600', n: '05', title: 'Подтвердите результат', desc: 'Заказчик проверяет результат. Нажимает «Принять» — средства идут исполнителю. Если не так — «Запросить исправление» или «Открыть спор».' },
  { icon: Star, color: 'bg-yellow-50 text-yellow-600', n: '06', title: 'Получите деньги и отзыв', desc: 'После подтверждения средства (за вычетом комиссии платформы 5%) переходят исполнителю. Обе стороны оставляют честные отзывы.' },
]

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Как работает Garant.kg</h1>
          <p className="text-primary-100">Полный цикл безопасной сделки — от поиска до получения оплаты</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.n} className="flex gap-6 items-start">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${step.color}`}>
                <step.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Шаг {step.n}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Споры */}
        <div className="mt-14 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Что если возник спор?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Любая сторона может открыть спор по активной сделке. Модератор изучает зафиксированные условия,
                переписку, загруженные доказательства и выносит решение: полная выплата исполнителю,
                возврат заказчику или частичное разделение суммы. Обоснование решения обязательно.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/register" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3.5 rounded-xl transition">
            Попробовать бесплатно <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
