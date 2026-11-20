import { useEffect, useState } from 'react'
import { searchShows } from '../searchShows'
import type { Show } from '../types'

interface SearchState {
  query: string
  attempt: number
  shows: Show[]
  status: 'success' | 'error'
}

export function useShowSearch(query: string) {
  const term = query.trim()
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState<SearchState | null>(null)

  useEffect(() => {
    if (!term) return undefined
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      try {
        const shows = await searchShows(term, controller.signal)
        if (!controller.signal.aborted) {
          setResult({
            query: term,
            attempt,
            shows,
            status: 'success',
          })
        }
      } catch {
        if (!controller.signal.aborted) {
          setResult({
            query: term,
            attempt,
            shows: [],
            status: 'error',
          })
        }
      }
    }, 300)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [term, attempt])

  const current = term && result?.query === term && result.attempt === attempt ? result : null
  const isError = current?.status === 'error'
  const isLoading = Boolean(term && !current)
  const onRetry = () => setAttempt(value => value + 1)

  return {
    matches: current?.shows ?? [],
    isError,
    isLoading,
    onRetry,
  }
}
