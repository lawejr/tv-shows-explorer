import type { Show } from './types'

interface SearchResult {
  show: {
    id: number
    name: string
    premiered: string | null
    genres: string[]
    rating: { average: number | null }
    summary: string | null
    image: { medium: string } | null
  }
}

export interface SearchShowsResult {
  shows: Show[]
  genres: string[]
}

const missingPosterSvg = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="210" height="295">',
  '<rect width="210" height="295" fill="#284b42"/>',
  '<text x="105" y="150" text-anchor="middle" fill="#ede2c5" font-size="20" ',
  'style="text-transform:uppercase">No cover</text>',
  '</svg>',
].join('')

const missingPoster = `data:image/svg+xml,${encodeURIComponent(missingPosterSvg)}`

export async function searchShows(query: string, signal: AbortSignal): Promise<SearchShowsResult> {
  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`, {
    signal,
  })
  if (!response.ok) throw new Error(`TVmaze: ${response.status}`)
  const results: SearchResult[] = await response.json()

  const genres = new Set<string>()
  const shows = results.map(({ show }) => {
    show.genres.forEach(genre => genres.add(genre))

    return {
      id: show.id,
      title: show.name,
      year: show.premiered?.slice(0, 4) ?? '—',
      genres: show.genres,
      rating: show.rating.average?.toString() ?? '—',
      summary: show.summary
        ? new DOMParser().parseFromString(show.summary, 'text/html').body.textContent ?? ''
        : 'Описание пока отсутствует.',
      poster: show.image?.medium ?? missingPoster,
      color: '#94a68a',
    }
  })

  return {
    shows,
    genres: [...genres],
  }
}
