import { usePresenter } from './usePresenter'
import styles from './styles.module.css'

export function ShowsListDecoration() {
  const { items } = usePresenter()

  return (
    <div aria-hidden="true">
      <div className={styles['prop-shelf']}>
        {items.map(item => (
          <i key={item.id} style={item.style}>
            <b>
              {item.label}
            </b>
          </i>
        ))}
        <div className={styles['dvd-disc']} />
      </div>
      <div className={styles['wood-shelf']} />
    </div>
  )
}
