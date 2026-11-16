import { newConcepts } from './new-concepts.js'
import { cinemaScene, noirScene, festivalScene } from './scenes.js'

export function newShell(theme) {
  const c = newConcepts[theme]
  const scene = { cinema: cinemaScene, noir: noirScene, festival: festivalScene }[theme]
  const hero = `<div class="new-hero-copy"><p class="eyebrow">${c.eyebrow}</p><h1>${c.title}</h1><p class="subtitle">${c.subtitle}</p></div>`
  const search = `<section class="search-area" aria-label="Поиск сериалов"><form id="search-form"><label for="query">${c.search}</label><div class="input-group"><input id="query" name="query" type="search" placeholder="${c.placeholder}" autocomplete="off" maxlength="100"/><button type="submit">${c.button}</button></div></form><div class="search-hint"><span>${c.hintline}</span><span>Например, <button class="suggestion" data-query="Murder">Murder</button> / <button class="suggestion" data-query="The Bear">The Bear</button></span></div></section>`
  return `<div class="concept-page new-concept"><header class="site-header"><div class="wordmark"><span>${c.symbol}</span> ${c.brand}</div><span class="header-detail">${c.detail}</span><span class="cinema-header-mark">${theme === 'cinema' ? '● СКОРО НА ЭКРАНЕ' : theme === 'noir' ? 'VOL. 001 / 2026' : '◉ ВХОД СВОБОДНЫЙ'}</span></header><section class="new-hero">${hero}${scene}</section>${search}<section id="results" class="results" aria-live="polite" aria-atomic="true"></section><footer class="site-footer"><span>${c.footer}</span><span>${c.footnote}</span><b>${c.symbol}</b></footer></div>`
}
