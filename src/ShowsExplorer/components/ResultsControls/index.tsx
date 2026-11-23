import { usePresenter } from './usePresenter'
import type { Props } from './usePresenter'
import styles from './styles.module.css'

export function ResultsControls(props: Props) {
  const p = usePresenter(props)

  return (
    <div className={styles['room-controls']}>
      <div key={p.resultKey} className={styles['room-genres']} role="group" aria-label="Жанры">
        {p.genres.map(item => (
          <button
            type="button"
            key={item.value}
            style={item.style}
            aria-pressed={item.selected}
            onClick={item.onClick}
          >
            {item.label}
          </button>
        ))}
      </div>
      <nav className={styles['room-pages']} aria-label="Страницы результатов">
        <span role="status">
          {p.countLabel}
        </span>
        <button type="button" disabled={p.first} onClick={p.previous} aria-label="Предыдущая страница">
          ←
        </button>
        {p.pages.map(item => (
          <button
            type="button"
            key={item.value}
            aria-current={item.current ? 'page' : undefined}
            onClick={item.onClick}
            aria-label={item.label}
          >
            {item.value}
          </button>
        ))}
        <button type="button" disabled={p.last} onClick={p.next} aria-label="Следующая страница">
          →
        </button>
      </nav>
    </div>
  )
}
