interface User {
  id: number
  phone: string
  first_name: string
  last_name: string
  email: string | null
}

export function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setStoredUser(user: User | null) {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
  }
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem('access_token')
}
