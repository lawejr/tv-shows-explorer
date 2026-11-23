import { usePresenter } from './usePresenter'
import styles from './styles.module.css'

export function Header() {
  const { title, subtitle } = usePresenter()

  return (
    <header className={styles['room-sign']}>
      <div>
        <h1 className={styles.neon}>
          {title}
        </h1>
        <small>
          {subtitle}
        </small>
      </div>
      <span className={styles['room-caption']}>
        ◉ Открыто до последнего зрителя
      </span>
    </header>
  )
}
