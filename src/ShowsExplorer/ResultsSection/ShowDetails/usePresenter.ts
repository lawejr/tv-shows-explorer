import { useLayoutEffect, useRef, useState } from 'react'
import type { Show } from '../../types'

export interface Props {
  show: Show | null
}

export function usePresenter({ show }: Props) {
  const summaryRef = useRef<HTMLDivElement>(null)
  const [summaryLines, setSummaryLines] = useState(1)

  useLayoutEffect(() => {
    const container = summaryRef.current
    const paragraph = container?.querySelector('p')
    if (!container || !paragraph) return undefined
    const measure = () => {
      const lineHeight = Number.parseFloat(getComputedStyle(paragraph).lineHeight)
      setSummaryLines(Math.max(1, Math.floor(container.clientHeight / lineHeight)))
    }
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    measure()

    return () => observer.disconnect()
  }, [show?.id])

  return {
    summaryRef,
    summaryStyle: {
      WebkitLineClamp: summaryLines,
    },
    show,
    previewKey: show?.id ?? 'idle',
    metadata: show ? `${show.year} · ★ ${show.rating}` : '',
    genres: show?.genres.join(' / ') ?? '',
    posterAlt: show ? `Обложка ${show.title}` : '',
  }
}
