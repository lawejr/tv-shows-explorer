import { ShowDetails } from './ShowDetails'
import { ShowsList } from './ShowsList'
import { usePresenter } from './usePresenter'
import type { Props } from './usePresenter'
import styles from './styles.module.css'

export function ResultsSection(props: Props) {
  const presenter = usePresenter(props)

  return (
    <section className={styles['rental-stage']} aria-label="Полки видеопроката">
      <ShowDetails show={presenter.selectedShow} />
      <ShowsList
        shows={presenter.shows}
        selectedShow={presenter.selectedShow}
        page={presenter.page}
        isSearching={presenter.isSearching}
        resultKey={presenter.resultKey}
        onSelect={presenter.onSelect}
      />
    </section>
  )
}
