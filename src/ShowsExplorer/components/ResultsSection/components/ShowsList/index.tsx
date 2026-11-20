import { ShowItem } from './components/ShowItem'
import { ShowsListDecoration } from './components/ShowsListDecoration'
import { usePresenter } from './usePresenter'
import type { Props } from './usePresenter'
import styles from './styles.module.css'

export function ShowsList(props: Props) {
  const p = usePresenter(props)

  return (
    <div className={styles['shelf-wall']}>
      <div className={styles['shelf-label']}>
        <span>
          Ваша подборка
        </span>
        <small>
          Выберите кассету — посмотрите на экране
        </small>
      </div>
      <div className={styles['tape-shelf']}>
        {p.hasShows ? (
          p.items.map(item => (
            <ShowItem key={item.show.id} {...item} />
          ))
        ) : (
          p.slots.map(slot => (
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
