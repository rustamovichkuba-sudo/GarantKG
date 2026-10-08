import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react'
import api from '../lib/api'
import { setStoredUser } from '../lib/auth'

const schema = z.object({
  phone: z.string().min(10, 'Введите номер телефона'),
  password: z.string().min(1, 'Введите пароль'),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setServerError('')
    try {
      const res = await api.post('/auth/login/', data)
      localStorage.setItem('access_token', res.data.access)
      setStoredUser(res.data.user)
      navigate('/')
    } catch (err: any) {
      const msg = err.response?.data?.error?.message || err.response?.data?.detail || 'Неверный телефон или пароль'
      setServerError(msg)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Лого */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 justify-center">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Garant<span className="text-primary-600">.kg</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-gray-900 mt-6">Войти в аккаунт</h1>
          <p className="text-gray-500 text-sm mt-1">Нет аккаунта? <Link to="/register" className="text-primary-600 hover:underline">Зарегистрироваться</Link></p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {serverError && (
            <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Номер телефона
              </label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+996 700 000 000"
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                  errors.phone
                    ? 'border-red-300 focus:border-red-400 bg-red-50'
                    : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
                }`}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Пароль
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Введите пароль"
                  className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm outline-none transition ${
                    errors.password
                      ? 'border-red-300 focus:border-red-400 bg-red-50'
                      : 'border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition text-sm"
            >
              {isSubmitting ? 'Входим...' : 'Войти'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Входя, вы соглашаетесь с{' '}
              <Link to="/terms" className="text-primary-600 hover:underline">условиями использования</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
