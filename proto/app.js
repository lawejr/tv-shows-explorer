import { immersiveShell, renderImmersive, disposeImmersive } from './immersive.js'
import { shows } from './data.js'
import { shell, emptyState, resultsView } from './view.js'

const app = document.querySelector('#app')
const initialTheme = location.hash.slice(1)
const state = { theme: ['dos', 'cinema', 'rental', 'universe'].includes(initialTheme) ? initialTheme : 'dos', query: '', genre: 'All', page: 1, status: 'idle' }
let pendingSearch

function renderResults() {
  disposeImmersive()
  const matches = shows.filter(show => show.title.toLowerCase().includes(state.query.toLowerCase()))
  if (['rental', 'universe'].includes(state.theme)) {
    renderImmersive(state, matches)
    return
  }
  document.querySelector('#results').innerHTML = state.status === 'ready'
    ? resultsView(state, matches)
    : emptyState(state.theme, state.status, state.query)
  document.querySelector('#results').setAttribute('aria-busy', String(state.status === 'loading'))
}

function renderTheme() {
  app.dataset.theme = state.theme
  disposeImmersive()
  app.innerHTML = ['rental', 'universe'].includes(state.theme) ? immersiveShell(state.theme) : shell(state.theme)
  document.querySelector('#query').value = state.query
  document.querySelectorAll('[data-theme]').forEach(button => {
    if (button.tagName === 'BUTTON') button.setAttribute('aria-pressed', String(button.dataset.theme === state.theme))
  })
  document.querySelector('#search-form').addEventListener('submit', event => {
    event.preventDefault()
    search(document.querySelector('#query').value)
  })
  renderResults()
}

function search(value) {
  clearTimeout(pendingSearch)
  state.query = value.trim()
  state.genre = 'All'
  state.page = 1
  document.querySelector('#query').value = state.query
  if (!state.query) {
    state.status = 'idle'
    renderResults()
    return
  }
  state.status = 'loading'
  renderResults()
  // Short, cancellable delay makes the loading layout reviewable.
  pendingSearch = setTimeout(() => {
    state.status = shows.some(show => show.title.toLowerCase().includes(state.query.toLowerCase())) ? 'ready' : 'empty'
    renderResults()
  }, 350)
}

document.addEventListener('click', event => {
  const button = event.target.closest('button')
  if (!button) return
  if (button.dataset.theme) {
    state.theme = button.dataset.theme
    history.replaceState(null, '', `#${state.theme}`)
    renderTheme()
  }
  if (button.dataset.query) search(button.dataset.query)
  if (button.dataset.genre) {
    state.genre = button.dataset.genre
    state.page = 1
    renderResults()
    document.querySelector(`[data-genre="${state.genre}"]`).focus()
  }
  if (button.dataset.page) {
    state.page = Number(button.dataset.page)
    renderResults()
    document.querySelector('[aria-current="page"]').focus()
  }
})
document.querySelector('#demo').addEventListener('click', () => search('Murder'))
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    search('')
    document.querySelector('#query').focus()
  }
})
renderTheme()
window.addEventListener('hashchange', () => {
  const theme = location.hash.slice(1)
  if (['dos', 'cinema', 'rental', 'universe'].includes(theme) && theme !== state.theme) {
    state.theme = theme
    renderTheme()
  }
})
