import { useState, useEffect } from 'react'
import { Lock, ArrowRight } from 'lucide-react'

// WICHTIG: Ändern Sie dieses Passwort jeden Monat!
// Format: makro-MMM-YYYY (z.B. makro-nov-2025, makro-dez-2025)
const CURRENT_PASSWORD = 'a56BV-39'

export default function PasswordProtection({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Check if user is already authenticated (stored in sessionStorage)
  useEffect(() => {
    const auth = sessionStorage.getItem('dashboard_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (password === CURRENT_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('dashboard_auth', 'true')
      setError('')
    } else {
      setError('Falsches Passwort. Bitte überprüfen Sie Ihren Newsletter.')
      setPassword('')
    }
  }

  if (isAuthenticated) {
    return children
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Lock className="w-6 h-6 text-slate-700" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Makro-Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Exklusiver Bereich für Abonnenten
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Zugangspasswort
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
              placeholder="Passwort eingeben"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>Dashboard öffnen</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="text-center space-y-4">
            <a 
              href="https://meine-geldseite-makrokompass.ghost.io/ghost/#/site" 
              className="text-sm text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Noch kein Zugang? Jetzt anmelden
            </a>
            
            <p className="text-xs text-slate-400">
              Das aktuelle Passwort finden Sie in Ihrem Newsletter.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
