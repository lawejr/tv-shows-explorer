import { useEffect, useState } from 'react'
import { searchShows } from '../searchShows'
import type { Show } from '../types'

interface SearchState {
  query: string
  attempt: number
  shows: Show[]
  genres: string[]
  status: 'success' | 'error'
}

const emptyShows: Show[] = []
const emptyGenres: string[] = []

export function useShowSearch(query: string) {
  const term = query.trim()
  const [attempt, setAttempt] = useState(0)
  const [debouncedTerm, setDebouncedTerm] = useState(term)
  const [result, setResult] = useState<SearchState | null>(null)

  useEffect(() => {
    if (term === debouncedTerm) return undefined

    const timer = window.setTimeout(() => {
      setDebouncedTerm(term)
    }, 300)

    return () => window.clearTimeout(timer)
  }, [term, debouncedTerm])

  useEffect(() => {
    if (!debouncedTerm) return undefined

    const controller = new AbortController()
    const search = async () => {
      try {
        const searchResult = await searchShows(debouncedTerm, controller.signal)
        if (!controller.signal.aborted) {
          setResult({
            query: debouncedTerm,
            attempt,
            shows: searchResult.shows,
            genres: searchResult.genres,
            status: 'success',
          })
        }
      } catch {
        if (!controller.signal.aborted) {
          setResult({
            query: debouncedTerm,
            attempt,
            shows: [],
            genres: [],
            status: 'error',
          })
        }
      }
    }

    void search()

    return () => {
      controller.abort()
    }
  }, [debouncedTerm, attempt])

  const current = term && result?.query === term && result.attempt === attempt ? result : null
  const previous = result?.status === 'success' ? result : null
  const visible = current?.status === 'success' ? current : previous
  const isError = current?.status === 'error'
  const isLoading = Boolean(term && (term !== debouncedTerm || !current))
  const onRetry = () => setAttempt(value => value + 1)

  return {
    matches: visible?.shows ?? emptyShows,
    genres: visible?.genres ?? emptyGenres,
    isError,
    isLoading,
    resultKey: visible ? `${visible.query}-${visible.attempt}` : 'empty',
    onRetry,
  }
}
