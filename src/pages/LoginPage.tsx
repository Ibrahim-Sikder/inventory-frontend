import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, LogIn } from 'lucide-react'
import { useLoginMutation } from '../redux/api/auth.api'
import { useAppDispatch } from '../redux/hooks'
import { setUser } from '../redux/features/auth/authSlice'

export function LoginPage() {
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [loginMutation, { isLoading }] = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await loginMutation({
        credential: email,
        password: password,
      }).unwrap()
      dispatch(setUser(response.data))

      navigate('/dashboard')
    } catch (err: any) {
      if (err?.data?.message) {
        setError(err.data.message)
      } else if (err?.status === 403) {
        setError('Invalid credentials or account is blocked')
      } else if (err?.status === 404) {
        setError('User not found')
      } else {
        setError('Invalid email or password')
      }
    }
  }

  const demoCredentials = [
    { role: 'admin', email: 'admin@gmail.com', password: '123456' },
    { role: 'manager', email: 'manager@gmail.com', password: '123456' },
    { role: 'employee', email: 'employee@gmail.com', password: '123456' },
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mini ERP</h1>
          <p className="text-muted">Inventory & Sales Management System</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <p className="text-sm font-medium text-foreground mb-4">Demo Credentials:</p>
          <div className="space-y-3">
            {demoCredentials.map((cred) => (
              <button
                key={cred.email}
                onClick={() => {
                  setEmail(cred.email)
                  setPassword(cred.password)
                }}
                className="w-full text-left p-3 rounded-lg border border-border hover:bg-background/50 transition-colors"
              >
                <p className="text-sm font-medium text-primary">{cred.role}</p>
                <p className="text-xs text-muted mt-1">{cred.email}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}