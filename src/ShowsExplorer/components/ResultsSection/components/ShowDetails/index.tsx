import { Poster } from '../Poster'
import { usePresenter } from './usePresenter'
import type { Props } from './usePresenter'
import styles from './styles.module.css'

export function ShowDetails(props: Props) {
  const { show, previewKey, summaryRef, summaryStyle, metadata, genres, posterAlt } = usePresenter(props)

  return (
    <aside className={styles['tv-corner']} aria-label="Описание выбранного сериала">
      <div className={styles.crt}>
        <div key={previewKey} className={styles['crt-glass']}>
          <span className={styles['crt-osd']}>
            Av 1 · Play ▷
          </span>
          <div className={styles['tape-preview']} aria-live="polite">
            {show ? (
              <div className={styles['tv-show']}>
                <Poster
                  key={show.poster}
                  src={show.poster}
                  alt={posterAlt}
                  className={styles.poster}
                />
                <div>
                  <small>
                    {metadata}
                  </small>
                  <h2>
                    {show.title}
                  </h2>
                  <div ref={summaryRef} className={styles.summary}>
                    <p style={summaryStyle}>
                      {show.summary}
                    </p>
                  </div>
                  <small>
                    {genres}
                  </small>
                </div>
              </div>
            ) : (
              <>
                <b>
                  Be kind.
                  <br />
                  Rewind.
                </b>
                <p>
                  Найдите сериал.
                  <br />
                  Достаньте кассету с полки.
                </p>
              </>
            )}
          </div>
          <div className={styles.scanlines} aria-hidden="true" />
        </div>
        <div className={styles['tv-bottom']} aria-hidden="true">
          <span>
            Trinitron / color Tv
          </span>
          <i />
          <i />
          <b>
            ●
          </b>
        </div>
      </div>
      <div className={styles.vcr} aria-hidden="true">
        <span>
          Vhs Hi-Fi
        </span>
        <div />
        <b>
          00:00
        </b>
      </div>
      <div className={styles['rental-sticker']}>
        Не забудьте
        <br />
        <strong>
          Ещё одну серию.
        </strong>
      </div>
    </aside>
  )
}
