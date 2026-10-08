import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import api from '../lib/api'
import { setStoredUser } from '../lib/auth'

const schema = z.object({
  first_name: z.string().min(2, 'Минимум 2 символа'),
  last_name: z.string().optional(),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Неверный формат телефона'),
  email: z.string().email('Неверный email').optional().or(z.literal('')),
  password: z.string().min(8, 'Минимум 8 символов'),
  confirm_password: z.string(),
}).refine((d) => d.password === d.confirm_password, {
  message: 'Пароли не совпадают',
  path: ['confirm_password'],
})
type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setServerError('')
    try {
      const payload = {
        phone: data.phone,
        first_name: data.first_name,
        last_name: data.last_name || '',
        email: data.email || undefined,
        password: data.password,
      }
      const res = await api.post('/auth/register/', payload)
      localStorage.setItem('access_token', res.data.access)
      setStoredUser(res.data.user)
      navigate('/')
    } catch (err: any) {
      const d = err.response?.data
      const msg = d?.error?.message || d?.detail || 'Ошибка при регистрации'
      setServerError(msg)
    }
  }

  const perks = [
    'Безопасное резервирование средств',
    'Защита для заказчика и исполнителя',
    'Арбитраж при спорах',
    'Реальные отзывы и репутация',
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Левая панель — только десктоп */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-900 text-white flex-col justify-center px-12">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold">Garant.kg</span>
        </div>
        <h2 className="text-3xl font-bold leading-tight mb-4">
          Работайте без риска — платформа гарантирует честность
        </h2>
        <p className="text-primary-200 mb-8 text-sm leading-relaxed">
          Присоединяйтесь к тысячам пользователей, которые уже совершают безопасные сделки на Garant.kg
        </p>
        <ul className="space-y-3">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-green-300 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Правая панель — форма */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Garant<span className="text-primary-600">.kg</span></span>
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Создать аккаунт</h1>
            <p className="text-gray-500 text-sm mt-1">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-primary-600 hover:underline">Войти</Link>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            {serverError && (
              <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{serverError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Имя *</label>
                  <input
                    {...register('first_name')}
                    placeholder="Айгерим"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${errors.first_name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`}
                  />
                  {errors.first_name && <p className="text-xs text-red-500 mt-1">{errors.first_name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Фамилия</label>
                  <input
                    {...register('last_name')}
                    placeholder="Иванова"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Номер телефона *</label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+996 700 000 000"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email (необязательно)</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Пароль *</label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPass ? 'text' : 'password'}
                    placeholder="Минимум 8 символов"
                    className={`w-full px-3.5 py-2.5 pr-10 rounded-xl border text-sm outline-none transition ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Повторите пароль *</label>
                <input
                  {...register('confirm_password')}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Повторите пароль"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition ${errors.confirm_password ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'}`}
                />
                {errors.confirm_password && <p className="text-xs text-red-500 mt-1">{errors.confirm_password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition text-sm mt-2"
              >
                {isSubmitting ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              Регистрируясь, вы принимаете{' '}
              <Link to="/terms" className="text-primary-600 hover:underline">условия использования</Link>
              {' '}и{' '}
              <Link to="/privacy" className="text-primary-600 hover:underline">политику конфиденциальности</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
