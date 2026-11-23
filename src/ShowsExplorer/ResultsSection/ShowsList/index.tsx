import { ShowItem } from './ShowItem'
import { ShowsListDecoration } from './ShowsListDecoration'
import { usePresenter } from './usePresenter'
import type { Props } from './usePresenter'
import styles from './styles.module.css'

export function ShowsList(props: Props) {
  const presenter = usePresenter(props)

  return (
    <div className={styles['shelf-wall']} aria-busy={presenter.isSearching}>
      <div className={styles['shelf-label']}>
        <span>
          Ваша подборка
        </span>
        <small role="status" aria-live="polite">
          {presenter.status}
        </small>
      </div>
      <div key={presenter.resultKey} className={presenter.tapeShelfClassName}>
        {presenter.hasShows ? (
          presenter.items.map(item => (
            <ShowItem key={item.show.id} {...item} />
          ))
        ) : (
          presenter.slots.map(slot => (
            <div key={slot.number} className={styles['empty-slot']} aria-hidden="true">
              {slot.number}
              <br />
              <span>
                {slot.label}
              </span>
            </div>
          ))
        )}
      </div>
      <div className={styles['wood-shelf']} />
      <div className={styles['shelf-under']}>
        <span>
          Перемотать перед возвратом ↶
        </span>
        <span>
          До 3 кассет на полке
        </span>
      </div>
      <ShowsListDecoration />
    </div>
  )
}
