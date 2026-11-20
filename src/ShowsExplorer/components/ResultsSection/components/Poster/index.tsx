import { usePresenter } from './usePresenter'
import type { Props } from './usePresenter'
import styles from './styles.module.css'

export function Poster(props: Props) {
  const { src, alt, className, imageRef, onLoad, onError, loading, failed } = usePresenter(props)

  return (
    <span className={`${styles.poster} ${className ?? ''}`} aria-busy={loading}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        className={loading || failed ? styles.hidden : styles.image}
      />
      {loading && (
        <span className={styles.loader} role="status" aria-label="Загрузка обложки">
          <span className={styles.cassette} aria-hidden="true">
            <i />
            <span />
            <i />
          </span>
          <span className={styles.caption} aria-hidden="true">
            Loading
          </span>
        </span>
      )}
      {failed && (
        <span className={styles.loader} role="img" aria-label={alt || 'Обложка недоступна'}>
          <span className={styles.caption}>
            No cover
          </span>
        </span>
      )}
    </span>
  )
}
