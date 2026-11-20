import type { CSSProperties } from 'react'
import type { Show } from '../../../../../../types'
import styles from './styles.module.css'

export interface Props {
  show: Show
  index: number
  number: number
  selected: boolean
  onSelect: (id: number) => void
}
export function usePresenter(p: Props) {
  return {
    show: p.show,
    selected: p.selected,
    className: `${styles['vhs-case']} ${p.selected ? styles.selected : ''}`,
    style: {
      '--tape': p.show.color,
      '--lean': `${(p.index - 1) * 3}deg`,
    } as CSSProperties,
    label: `Достать кассету ${p.show.title}`,
    tag: `${String(p.number).padStart(2, '0')} / ${p.show.year}`,
    onClick: () => p.onSelect(p.show.id),
  }
}
