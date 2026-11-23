import type { Show } from '../../../../types'
import styles from './styles.module.css'

export interface Props {
  shows: Show[]
  selectedShow: Show | null
  page: number
  isSearching: boolean
  resultKey: string
  onSelect: (id: number) => void
}

export function usePresenter(p: Props) {
  return {
    hasShows: p.shows.length > 0,
    isSearching: p.isSearching,
    resultKey: p.resultKey,
    status: p.isSearching ? 'Ищем новую подборку…' : 'Выберите кассету — посмотрите на экране',
    tapeShelfClassName: `${styles['tape-shelf']} ${p.isSearching ? styles.searching : ''}`,
    items: p.shows.map((show, index) => ({
      show,
      index,
      number: (p.page - 1) * 3 + index + 1,
      selected: p.selectedShow?.id === show.id,
      onSelect: p.onSelect,
    })),
    slots: [
      {
        number: '01',
        label: 'Ваша',
      },
      {
        number: '02',
        label: 'Будущая',
      },
      {
        number: '03',
        label: 'Коллекция',
      },
    ],
  }
}
