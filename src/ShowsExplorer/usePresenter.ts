import { useState } from 'react'
import { useShowSearch } from './hooks/useShowSearch'

export function usePresenter() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { matches, isError, isLoading, resultKey, onRetry } = useShowSearch(query)
  const genres = [...new Set(matches.flatMap(show => show.genres))]
  const filtered = matches.filter(show => genre === 'All' || show.genres.includes(genre))
  const current = filtered.slice((page - 1) * 3, page * 3)
  const selectedShow = current.find(show => show.id === selectedId) ?? null
  const onSearch = (value: string) => {
    setQuery(value)
    setGenre('All')
    setPage(1)
    setSelectedId(null)
  }
  const onGenreChange = (value: string) => {
    setGenre(value)
    setPage(1)
    setSelectedId(null)
  }
  const onPageChange = (value: number) => {
    setPage(value)
    setSelectedId(null)
  }
  let status = 'Полка ждёт вашего запроса'
  if (isLoading) {
    status = 'Ищем кассеты…'
  } else if (isError) {
    status = 'Не удалось получить сериалы. Проверьте подключение и попробуйте ещё раз.'
  } else if (query.trim()) {
    status = `«${query.trim()}» — ничего не найдено`
  }

  return {
    query,
    genre,
    genres,
    page,
    current,
    selectedShow,
    count: filtered.length,
    pages: Math.ceil(filtered.length / 3),
    hasResults: matches.length > 0,
    isSearching: isLoading && matches.length > 0,
    isError,
    resultKey,
    onRetry,
    status,
    onSearch,
    onGenreChange,
    onPageChange,
    onSelect: setSelectedId,
  }
}
