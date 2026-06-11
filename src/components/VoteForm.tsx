'use client'

import { useState, FormEvent } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error' | 'duplicate'

export default function VoteForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !city.trim()) return

    setState('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          city: city.trim(),
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setState('success')
        setName('')
        setEmail('')
        setCity('')
      } else if (res.status === 409) {
        setState('duplicate')
        setErrorMessage(data.error)
      } else {
        setState('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setState('error')
      setErrorMessage('Network error. Please check your connection.')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-xl font-semibold text-green-800">Thanks for voting!</h3>
        <p className="text-green-600 mt-1">Your vote has been recorded.</p>
        <button
          onClick={() => setState('idle')}
          className="mt-4 text-sm text-green-700 underline hover:text-green-800"
        >
          Vote again
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error / Duplicate message */}
      {(state === 'error' || state === 'duplicate') && (
        <div className={`rounded-lg px-4 py-3 text-sm ${
          state === 'duplicate'
            ? 'bg-orange-50 border border-orange-200 text-orange-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
          disabled={state === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
          disabled={state === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <input
          id="city"
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Your city"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
          disabled={state === 'loading'}
        />
      </div>

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
        ) : (
          'Vote'
        )}
      </button>
    </form>
  )
}
