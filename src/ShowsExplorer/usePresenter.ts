import { useMemo, useState } from 'react'
import { useShowSearch } from './hooks/useShowSearch'
import type { Show } from './types'

const showsPerPage = 3

interface PageResult {
  shows: Show[]
  count: number
  selectedShow: Show | null
}

function getPageResult(matches: Show[], genre: string, page: number, selectedId: number | null): PageResult {
  const start = (page - 1) * showsPerPage
  const shows: Show[] = []
  let count = 0
  let selectedShow: Show | null = null

  matches.forEach(show => {
    if (genre === 'All' || show.genres.includes(genre)) {
      if (count >= start && shows.length < showsPerPage) {
        shows.push(show)
        if (show.id === selectedId) {
          selectedShow = show
        }
      }

      count += 1
    }
  })

  return {
    shows,
    count,
    selectedShow,
  }
}

export function usePresenter() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { matches, genres, isError, isLoading, resultKey, onRetry } = useShowSearch(query)
  const pageResult = useMemo(
    () => getPageResult(matches, genre, page, selectedId),
    [matches, genre, page, selectedId],
  )
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
    current: pageResult.shows,
    selectedShow: pageResult.selectedShow,
    count: pageResult.count,
    pages: Math.ceil(pageResult.count / showsPerPage),
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
