import { artwork } from './art.js'
import { mountUniverse } from './universe.js'

let cleanup = () => {}
export function disposeImmersive() { cleanup(); cleanup = () => {} }
const escape = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char])

export function immersiveShell(theme) {
  return `<div class="immersive ${theme}-room"><header class="room-sign"><div>${theme === 'rental' ? '<span class="neon">ПОСЛЕДНИЙ СЕАНС</span><small>ВИДЕОПРОКАТ НА УГЛУ · VHS / DVD · С 1994</small>' : '<span class="universe-logo">КИНО<span>КОСМОС</span> ✳</span><small>У КАЖДОЙ ИСТОРИИ — СВОЯ ОРБИТА</small>'}</div><span class="room-caption">${theme === 'rental' ? '◉ ОТКРЫТО ДО ПОСЛЕДНЕГО ЗРИТЕЛЯ' : 'ТЯНИТЕ ПРОСТРАНСТВО · ПРИБЛИЖАЙТЕ · ВЫБИРАЙТЕ'}</span></header><div id="results" class="immersive-results" aria-live="polite"></div><form id="search-form" class="${theme === 'rental' ? 'rental-counter' : 'space-search'}"><label for="query">${theme === 'rental' ? '<span>Кассир слушает.</span><small>КАКУЮ КАССЕТУ ИЩЕМ?</small>' : '<span>↗ В какую историю?</span><small>ПОИСК СЕРИАЛОВ</small>'}</label><input id="query" type="search" placeholder="Название сериала…" autocomplete="off" maxlength="100"/><button type="submit">${theme === 'rental' ? 'Найти на полке ↗' : 'Запустить поиск ↗'}</button><button type="button" class="sample-search" data-query="Murder">Попробовать Murder</button></form></div>`
}

function controls(state, matches, filtered) {
  const genres = [...new Set(matches.flatMap(show => show.genres))]
  const pages = Math.ceil(filtered.length / 3)
  return `<div class="room-controls"><div class="room-genres" aria-label="Жанры">${['All', ...genres].map(g => `<button data-genre="${g}" aria-pressed="${state.genre === g}">${g === 'All' ? 'Все жанры' : g}</button>`).join('')}</div><nav class="room-pages" aria-label="Страницы результатов"><span>${filtered.length} найдено</span><button data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''} aria-label="Предыдущая страница">←</button>${Array.from({length: pages}, (_, i) => `<button data-page="${i+1}" ${state.page === i+1 ? 'aria-current="page"' : ''} aria-label="Страница ${i+1}">${i+1}</button>`).join('')}<button data-page="${state.page + 1}" ${state.page === pages ? 'disabled' : ''} aria-label="Следующая страница">→</button></nav></div>`
}

export function renderImmersive(state, matches) {
  const filtered = matches.filter(show => state.genre === 'All' || show.genres.includes(state.genre))
  const current = state.status === 'ready' ? filtered.slice((state.page-1)*3, state.page*3) : []
  const message = state.status === 'loading' ? 'ИЩЕМ ВАШУ ИСТОРИЮ…' : state.status === 'empty' ? `«${escape(state.query)}» — в демоколлекции не найдено` : state.theme === 'rental' ? 'ПОЛКА ЖДЁТ ВАШЕГО ЗАПРОСА' : 'ВАША ВСЕЛЕННАЯ ПОКА НЕ ОТКРЫТА'
  const root = document.querySelector('#results')
  root.setAttribute('aria-busy', String(state.status === 'loading'))
  const bar = state.status === 'ready' ? controls(state, matches, filtered) : `<div class="scene-status">${message}<span>${state.status === 'loading' ? 'Минуточку…' : 'Введите название внизу или нажмите «Попробовать Murder»'}</span></div>`
  if (state.theme === 'universe') {
    root.innerHTML = `${bar}<div class="cosmos-stage"><canvas id="cosmos" aria-label="Интерактивная киновселенная. Перетаскивайте пространство; колесо меняет масштаб."></canvas><div class="cosmos-center" ${current.length ? 'hidden' : ''}><b>У каждой истории<br>своя <em>гравитация.</em></b><p>Найдите сериал — и он появится в вашем космосе.</p></div><div class="space-zoom"><button id="zoom-out" aria-label="Отдалить">−</button><button id="zoom-reset" aria-label="Сбросить положение и масштаб">⌖</button><button id="zoom-in" aria-label="Приблизить">+</button></div><div class="world-access" aria-label="Найденные сериалы">${current.map(s => `<button data-select="${s.id}">${s.title} ↗</button>`).join('')}</div><aside class="space-detail" hidden></aside></div>`
    cleanup = mountUniverse(root, current)
    return
  }
  root.innerHTML = `${bar}<div class="rental-stage"><aside class="tv-corner"><div class="crt"><div class="crt-glass"><span class="crt-osd">AV 1 · PLAY ▷</span><div id="tape-preview"><b>BE KIND.<br>REWIND.</b><p>Найдите сериал.<br>Достаньте кассету с полки.</p></div><div class="scanlines"></div></div><div class="tv-bottom"><span>TRINITRON / COLOR TV</span><i></i><i></i><b>●</b></div></div><div class="vcr"><span>VHS HI-FI</span><div></div><b>00:00</b></div><div class="rental-sticker">НЕ ЗАБУДЬТЕ<br><strong>ЕЩЁ ОДНУ СЕРИЮ.</strong></div></aside><div class="shelf-wall"><div class="shelf-label"><span>ВАША ПОДБОРКА</span><small>ВЫБЕРИТЕ КАССЕТУ — ПОСМОТРИТЕ НА ЭКРАНЕ</small></div><div class="tape-shelf">${current.length ? current.map((s,i) => `<button class="vhs-case" data-select="${s.id}" style="--tape:${s.color};--lean:${(i-1)*3}deg" aria-label="Достать кассету ${s.title}"><span class="vhs-spine">${s.title}</span><span class="vhs-front">${artwork(s)}<span class="vhs-format">VHS <b>СТЕРЕО</b></span></span><span class="tape-tag">${String(i+1+(state.page-1)*3).padStart(2,'0')} / ${s.year}</span></button>`).join('') : '<div class="empty-slot">01<br><span>ВАША</span></div><div class="empty-slot">02<br><span>БУДУЩАЯ</span></div><div class="empty-slot">03<br><span>КОЛЛЕКЦИЯ</span></div>'}</div><div class="wood-shelf"></div><div class="shelf-under"><span>ПЕРЕМОТАТЬ ПЕРЕД ВОЗВРАТОМ ↶</span><span>3 КАССЕТЫ НА ПОЛКЕ</span></div><div class="prop-shelf" aria-hidden="true">${Array.from({length:20},(_,i)=>`<i style="--i:${i};--prop:${['#897b55','#476d69','#9b4d43','#5a5773'][i%4]}"><b>${['VHS','VIDEO','HI-FI','180'][i%4]}</b></i>`).join('')}<div class="dvd-disc"></div></div><div class="wood-shelf lower"></div></div></div>`
  const handler = event => {
    const button = event.target.closest('[data-select]')
    if (!button) return
    const show = current.find(s => s.id === Number(button.dataset.select))
    root.querySelectorAll('.vhs-case').forEach(el => el.classList.toggle('selected',el === button))
    document.querySelector('#tape-preview').innerHTML = `<div class="tv-show">${artwork(show)}<div><small>${show.year} · ★ ${show.rating}</small><h2>${show.title}</h2><p>${show.short}</p><small>${show.genres.join(' / ')}</small></div></div>`
    document.querySelector('.crt-glass').classList.remove('tuning'); void document.querySelector('.crt-glass').offsetWidth; document.querySelector('.crt-glass').classList.add('tuning')
  }
  root.addEventListener('click',handler)
  cleanup = () => root.removeEventListener('click',handler)
}
