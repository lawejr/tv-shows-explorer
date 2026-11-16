import { concepts } from './data.js'
import { artwork, branch } from './art.js'
import { newShell } from './new-shell.js'

export function shell(theme) {
  if (['cinema', 'noir', 'festival'].includes(theme)) return newShell(theme)
  const c = concepts[theme]
  const illustration = theme === 'dos'
    ? '<div class="dos-art" aria-hidden="true"><div class="pixel-screen"><span>TV</span><i>▶ PLAY NEXT STORY</i></div><div class="pixel-base">■ ■ ▰</div><small>NO SIGNAL? FIND A STORY.</small></div>'
    : theme === 'botanical' ? `<div class="plant-art">${branch}<span>Fig. 01 — Historia serialis</span></div>`
      : '<div class="diner-art" aria-hidden="true"><div class="plate"><span>100%</span><i>FRESH<br>STORIES</i><b>✦</b></div><div class="diner-sticker">ОДНУ?<br><strong>ИЛИ СЕЗОН?</strong></div></div>'
  return `<div class="concept-page">
    <header class="site-header"><div class="wordmark">${theme === 'botanical' ? '❧ ' : theme === 'diner' ? '✦ ' : '▦ '}${c.brand}</div><span class="header-detail">${theme === 'dos' ? 'FILE &nbsp; SEARCH &nbsp; VIEW <b>● ONLINE</b>' : theme === 'botanical' ? 'КОЛЛЕКЦИЯ ВЕЧЕРОВ / EST. 2026' : 'С ВАМИ С ПЕРВОГО ЭПИЗОДА ↗'}</span></header>
    <section class="hero"><div class="hero-copy"><p class="eyebrow">${c.eyebrow}</p><h1>${c.title.replaceAll('\n', '<br>')}</h1><p class="subtitle">${c.subtitle.replaceAll('\n', '<br>')}</p></div>${illustration}</section>
    <section class="search-area" aria-label="Поиск сериалов"><form id="search-form"><label for="query">${c.search}</label><div class="input-group"><input id="query" name="query" type="search" placeholder="${c.placeholder}" autocomplete="off" maxlength="100"/><button type="submit">${c.button}</button></div></form><div class="search-hint"><span>${theme === 'dos' ? '↵ ENTER — начать поиск' : theme === 'botanical' ? 'Начните с названия, остальное найдётся.' : 'Поиск подаём горячим. Без спойлеров.'}</span><span>Попробуйте <button class="suggestion" data-query="Murder">Murder</button> или <button class="suggestion" data-query="The Bear">The Bear</button></span></div></section>
    <section id="results" class="results" aria-live="polite" aria-atomic="true"></section>
    <footer class="site-footer"><span>${c.footer}</span><span>${c.footnote}</span><b>${theme === 'dos' ? '[ ESC ] CLEAR' : theme === 'botanical' ? '❧' : '✦'}</b></footer>
  </div>`
}

export function emptyState(theme, status, query) {
  const c = concepts[theme]
  if (status === 'loading') return '<div class="empty-state"><span class="empty-symbol loading">◌</span><h2>Ищем вашу следующую историю…</h2><p>Раскладываем сериалы по местам.</p></div>'
  if (status === 'empty') return `<div class="empty-state"><span class="empty-symbol">∅</span><h2>Ничего не нашлось</h2><p>По запросу «${escapeHtml(query)}» нет сериалов в демоколлекции.</p><button class="text-button" data-query="Murder">Попробовать Murder →</button></div>`
  return `<div class="empty-state"><span class="empty-symbol">${theme === 'dos' ? '[ _ ]' : theme === 'botanical' ? '❧' : '✦'}</span><h2>${c.empty}</h2><p>${c.hint}</p><small>${theme === 'dos' ? '0 FILES FOUND · READY FOR INPUT' : theme === 'botanical' ? 'Ex libris · ваша будущая коллекция' : 'ПОИСК → ВЫБОР → ЕЩЁ ОДНА СЕРИЯ'}</small></div>`
}

export function resultsView(state, matches) {
  const genres = [...new Set(matches.flatMap(show => show.genres))]
  const filtered = matches.filter(show => state.genre === 'All' || show.genres.includes(state.genre))
  const pages = Math.ceil(filtered.length / 3)
  const current = filtered.slice((state.page - 1) * 3, state.page * 3)
  return `<div class="results-heading"><div><span class="section-kicker">${concepts[state.theme].kicker || 'DIRECTORY / SEARCH'}</span><h2>${concepts[state.theme].results}</h2></div><span class="result-count">${filtered.length} ${plural(filtered.length)} <span>/ «${escapeHtml(state.query)}»</span></span></div>
    <div class="filters" aria-label="Фильтр по жанру">${['All', ...genres].map(genre => `<button data-genre="${genre}" aria-pressed="${state.genre === genre}">${genre === 'All' ? 'Все жанры' : genre}${state.genre === genre ? '<span> ✓</span>' : ''}</button>`).join('')}</div>
    <div class="cards">${current.map((show, index) => card(show, state.theme, (state.page - 1) * 3 + index + 1)).join('')}</div>
    <nav class="pagination" aria-label="Страницы результатов"><span>${String((state.page - 1) * 3 + 1).padStart(2, '0')}—${String(Math.min(state.page * 3, filtered.length)).padStart(2, '0')} из ${String(filtered.length).padStart(2, '0')}</span><div><button data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''} aria-label="Предыдущая страница">←</button>${Array.from({ length: pages }, (_, i) => `<button data-page="${i + 1}" ${state.page === i + 1 ? 'aria-current="page"' : ''} aria-label="Страница ${i + 1}">${i + 1}</button>`).join('')}<button data-page="${state.page + 1}" ${state.page === pages ? 'disabled' : ''} aria-label="Следующая страница">→</button></div><span>ПО 3 НА СТРАНИЦЕ</span></nav>`
}

function card(show, theme, number) {
  return `<article class="show-card"><div class="card-image">${artwork(show)}<span class="card-number">${theme === 'dos' ? 'FILE_' : theme === 'botanical' ? 'ОБРАЗЕЦ № ' : '№ '}${String(number).padStart(2, '0')}</span></div><div class="card-body"><div class="card-meta"><span>${show.year} / СЕРИАЛ</span><b>★ ${show.rating}</b></div><h3>${show.title}</h3><p>${show.short}</p><div class="card-genres">${show.genres.join(' · ')}</div></div></article>`
}

function plural(n) { return n === 1 ? 'сериал' : n < 5 ? 'сериала' : 'сериалов' }
function escapeHtml(value) { return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]) }
