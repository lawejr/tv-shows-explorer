import { Header } from './components/Header'
import { ResultsControls } from './components/ResultsControls'
import { ResultsSection } from './components/ResultsSection'
import { SearchForm } from './components/SearchForm'
import { usePresenter } from './usePresenter'
import styles from './styles.module.css'

export function ShowsExplorer() {
  const presenter = usePresenter()

  return (
    <main className={styles.room}>
      <Header />
      <div className={styles.resultsToolbar}>
        {presenter.hasResults ? (
          <ResultsControls
            genres={presenter.genres}
            genre={presenter.genre}
            count={presenter.count}
            page={presenter.page}
            pages={presenter.pages}
            resultKey={presenter.resultKey}
            onGenreChange={presenter.onGenreChange}
            onPageChange={presenter.onPageChange}
          />
        ) : (
          <div className={styles.status} role="status">
            {presenter.status}
            {presenter.isError && (
              <button type="button" onClick={presenter.onRetry}>
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
        shows={presenter.current}
        selectedShow={presenter.selectedShow}
        page={presenter.page}
        isSearching={presenter.isSearching}
        resultKey={presenter.resultKey}
        onSelect={presenter.onSelect}
      />
      <SearchForm query={presenter.query} onSearch={presenter.onSearch} />
      <p className={styles.demoNote}>
        Данные сериалов —
        <a href="https://www.tvmaze.com/" target="_blank" rel="noreferrer">
          TVmaze
        </a>
      </p>
    </main>
  )
}
