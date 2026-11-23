import type { CSSProperties } from 'react'

export interface Props {
  genres: string[]
  genre: string
  page: number
  pages: number
  count: number
  resultKey: string
  onGenreChange: (genre: string) => void
  onPageChange: (page: number) => void
}

export function usePresenter(p: Props) {
  return {
    resultKey: p.resultKey,
    genres: ['All', ...p.genres].map((value, index) => ({
      value,
      label: value === 'All' ? 'Все жанры' : value,
      selected: value === p.genre,
      style: {
        '--genre-delay': `${index * 45}ms`,
      } as CSSProperties,
      onClick: () => p.onGenreChange(value),
    })),
    pages: Array.from({
      length: p.pages,
    }, (_, i) => ({
      value: i + 1,
      label: `Страница ${i + 1}`,
      current: i + 1 === p.page,
      onClick: () => p.onPageChange(i + 1),
    })),
    countLabel: `${p.count} найдено`,
    first: p.page === 1,
    last: p.page === p.pages,
    previous: () => p.onPageChange(p.page - 1),
    next: () => p.onPageChange(p.page + 1),
  }
}
