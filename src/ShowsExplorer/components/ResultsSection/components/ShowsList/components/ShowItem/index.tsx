import { Poster } from '../../../Poster'
import { usePresenter } from './usePresenter'
import type { Props } from './usePresenter'
import styles from './styles.module.css'

export function ShowItem(props: Props) {
  const presenter = usePresenter(props)

  return (
    <button
      type="button"
      className={presenter.className}
      style={presenter.style}
      aria-label={presenter.label}
      aria-pressed={presenter.selected}
      onClick={presenter.onClick}
    >
      <span className={styles['vhs-spine']} aria-hidden="true">
        {presenter.show.title}
      </span>
      <span className={styles['vhs-front']}>
        <Poster key={presenter.show.poster} src={presenter.show.poster} alt="" className={styles.poster} />
        <span className={styles['vhs-format']}>
          Vhs
          <b>
            Стерео
          </b>
        </span>
      </span>
      <span className={styles['tape-tag']}>
        {presenter.tag}
      </span>
    </button>
  )
}
