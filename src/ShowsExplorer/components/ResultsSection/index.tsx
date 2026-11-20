import { ShowDetails } from './components/ShowDetails'
import { ShowsList } from './components/ShowsList'
import { usePresenter } from './usePresenter'
import type { Props } from './usePresenter'
import styles from './styles.module.css'

export function ResultsSection(props: Props) {
  const p = usePresenter(props)

  return (
    <section className={styles['rental-stage']} aria-label="Полки видеопроката">
      <ShowDetails show={p.selectedShow} />
      <ShowsList
        shows={p.shows}
        selectedShow={p.selectedShow}
        page={p.page}
        onSelect={p.onSelect}
      />
    </section>
  )
}
