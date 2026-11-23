import { usePresenter } from "./usePresenter";
import type { Props } from "./usePresenter";
import styles from "./styles.module.css";

export function SearchForm(props: Props) {
  const { query, inputRef, onChange, onSubmit, suggestions, onKeyDown } = usePresenter(props);

  return (
    <form className={styles.counter} onSubmit={onSubmit}>
      <label htmlFor="show-query">
        <span className={styles.title}>
          Кассир слушает.
        </span>
        <small className={styles.prompt}>
          Какую кассету ищем?
        </small>
      </label>
      <div className={styles.searchField}>
        <input
          ref={inputRef}
          id="show-query"
          type="search"
          placeholder="Название сериала…"
          autoComplete="off"
          maxLength={100}
          value={query}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <div className={styles.suggestions} role="group" aria-label="Примеры поисковых запросов">
          <span>
            Например:
          </span>
          {suggestions.map((item) => (
            <button key={item.title} type="button" onClick={item.onClick}>
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
