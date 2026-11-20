import { Poster } from '../../../Poster'
import { usePresenter } from './usePresenter'
import type { Props } from './usePresenter'
import styles from './styles.module.css'

export function ShowItem(props: Props) {
  const p = usePresenter(props)

  return (
    <button
      type="button"
      className={p.className}
      style={p.style}
      aria-label={p.label}
      aria-pressed={p.selected}
      onClick={p.onClick}
    >
      <span className={styles['vhs-spine']} aria-hidden="true">
        {p.show.title}
      </span>
      <span className={styles['vhs-front']}>
        <Poster key={p.show.poster} src={p.show.poster} alt="" className={styles.poster} />
        <span className={styles['vhs-format']}>
          Vhs
          <b>
            Стерео
          </b>
        </span>
      </span>
      <span className={styles['tape-tag']}>
        {p.tag}
      </span>
    </button>
  )
}
