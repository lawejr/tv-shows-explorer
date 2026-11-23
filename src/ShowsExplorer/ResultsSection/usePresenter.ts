import type { Show } from '../types'

export interface Props {
  shows: Show[]
  selectedShow: Show | null
  page: number
  isSearching: boolean
  resultKey: string
  onSelect: (id: number) => void
}

export function usePresenter(props: Props) {
  return props
}
