import type { CSSProperties } from 'react'

const colors = ['#897b55', '#476d69', '#9b4d43', '#5a5773']
const labels = ['Vhs', 'Video', 'Hi-Fi', '180']
const items = Array.from({
  length: 20,
}, (_, index) => ({
  id: index,
  label: labels[index % labels.length],
  style: {
    '--prop': colors[index % colors.length],
    height: `${67 + (index % 3) * 4}px`,
  } as CSSProperties,
}))

export function usePresenter() {
  return {
    items,
  }
}
