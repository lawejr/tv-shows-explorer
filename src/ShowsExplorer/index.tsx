import { Header } from './components/Header'
import { ResultsControls } from './components/ResultsControls'
import { ResultsSection } from './components/ResultsSection'
import { SearchForm } from './components/SearchForm'
import { usePresenter } from './usePresenter'
import styles from './styles.module.css'

export function ShowsExplorer() {
  const p = usePresenter()

  return (
    <main className={styles.room}>
      <Header />
      <div className={styles.resultsToolbar}>
        {p.hasResults ? (
          <ResultsControls
            genres={p.genres}
            genre={p.genre}
            count={p.count}
            page={p.page}
            pages={p.pages}
            onGenreChange={p.onGenreChange}
            onPageChange={p.onPageChange}
          />
        ) : (
          <div className={styles.status} role="status">
            {p.status}
            {p.isError && (
              <button type="button" onClick={p.onRetry}>
                Повторить запрос
              </button>
            )}
            <span>
              Введите название внизу или выберите один из примеров
            </span>
          </div>
        )}
      </div>
      <ResultsSection
        shows={p.current}
        selectedShow={p.selectedShow}
        page={p.page}
        onSelect={p.onSelect}
      />
      <SearchForm query={p.query} onSearch={p.onSearch} />
      <p className={styles.demoNote}>
        Данные сериалов —
        <a href="https://www.tvmaze.com/" target="_blank" rel="noreferrer">
          TVmaze
        </a>
      </p>
    </main>
  )
}
