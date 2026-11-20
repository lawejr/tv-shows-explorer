import type { Show } from '../../../../types'

export interface Props {
  shows: Show[]
  selectedShow: Show | null
  page: number
  onSelect: (id: number) => void
}
export function usePresenter(p: Props) {
  return {
    hasShows: p.shows.length > 0,
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
