import { useCallback, useState } from 'react'

export interface Props {
  src: string
  alt: string
  className?: string
}

export function usePresenter(props: Props) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const onLoad = () => setStatus('loaded')
  const onError = () => setStatus('error')
  const imageRef = useCallback((image: HTMLImageElement | null) => {
    if (image?.complete) setStatus(image.naturalWidth > 0 ? 'loaded' : 'error')
  }, [])

  return {
    ...props,
    imageRef,
    onLoad,
    onError,
    loading: status === 'loading',
    failed: status === 'error',
  }
}
