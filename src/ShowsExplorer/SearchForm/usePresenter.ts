import { useRef } from 'react'
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react'

export interface Props {
  query: string
  onSearch: (value: string) => void
}

export function usePresenter({ query, onSearch }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const onChange = (event: ChangeEvent<HTMLInputElement>) => onSearch(event.target.value)
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const suggestions = ['Breaking Bad', 'Game of Thrones', 'Friends', 'Sherlock', 'The Office'].map(title => ({
    title,
    onClick: () => {
      onSearch(title)
      inputRef.current?.focus()
    },
  }))
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Escape') return
    onSearch('')
    inputRef.current?.focus()
  }

  return {
    query,
    inputRef,
    onChange,
    onSubmit,
    suggestions,
    onKeyDown,
  }
}
