// Local fixtures for design exploration, not TVmaze responses.
export const shows = [
  { id: 1, title: 'Only Murders in the Building', year: '2021', genres: ['Comedy', 'Mystery'], rating: '8.1', color: '#d5ad58', art: 'windows', short: 'Три соседа. Один подкаст. Слишком много подозреваемых.', label: 'ONLY MURDERS\nIN THE BUILDING' },
  { id: 2, title: 'Murder, She Wrote', year: '1984', genres: ['Drama', 'Mystery'], rating: '7.8', color: '#a6b6a0', art: 'typewriter', short: 'Писательница Джессика Флетчер замечает то, что упускают другие.', label: 'MURDER,\nSHE WROTE' },
  { id: 3, title: 'A Murder at the End of the World', year: '2023', genres: ['Drama', 'Thriller', 'Mystery'], rating: '7.2', color: '#a8c0cc', art: 'mountain', short: 'Уединённый отель в Исландии. Девять гостей. Одна тайна.', label: 'A MURDER\nAT THE END\nOF THE WORLD' },
  { id: 4, title: 'How to Get Away with Murder', year: '2014', genres: ['Drama', 'Crime', 'Thriller'], rating: '8.0', color: '#c77c57', art: 'scales', short: 'Уроки права, после которых уже не получится остаться прежним.', label: 'HOW TO GET\nAWAY WITH\nMURDER' },
  { id: 5, title: 'The Murder at the Vicarage', year: '1986', genres: ['Crime', 'Mystery'], rating: '7.5', color: '#a3ab77', art: 'house', short: 'Тихая английская деревня хранит совсем не тихие секреты.', label: 'THE MURDER\nAT THE VICARAGE' },
  { id: 6, title: 'Murderville', year: '2022', genres: ['Comedy', 'Crime'], rating: '6.9', color: '#c99aab', art: 'eye', short: 'Детектив, приглашённая звезда и расследование без сценария.', label: 'MURDERVILLE' },
  { id: 7, title: 'Midsomer Murders', year: '1997', genres: ['Drama', 'Crime', 'Mystery'], rating: '8.0', color: '#b4ba84', art: 'house', short: 'Открыточные пейзажи и преступления за идеально ровными изгородями.', label: 'MIDSOMER\nMURDERS' },
  { id: 8, title: 'Stranger Things', year: '2016', genres: ['Drama', 'Science-Fiction', 'Horror'], rating: '8.5', color: '#bd7266', art: 'eye', short: 'Маленький город. Большая тайна. Друзья, готовые шагнуть в неизвестность.', label: 'STRANGER\nTHINGS' },
  { id: 9, title: 'The Bear', year: '2022', genres: ['Drama', 'Comedy'], rating: '8.3', color: '#8ca8ba', art: 'windows', short: 'Шеф-повар возвращается домой, чтобы заново собрать кухню и свою жизнь.', label: 'THE BEAR' },
]

import { newConcepts } from './new-concepts.js'

export const concepts = {
  ...newConcepts,
  dos: { brand: 'TV_EXPLORER', eyebrow: 'ПЕРСОНАЛЬНАЯ БАЗА СЕРИАЛОВ / VER 1.0', title: 'Ваш следующий\nсериал найден<span class="cursor">_</span>', subtitle: 'Введите название. Исследуйте выдачу.\nЕщё одна серия — и точно спать.', search: 'C:\\SHOWS\\>', placeholder: 'Введите название сериала', button: 'НАЙТИ ↵', empty: 'ОЖИДАНИЕ ЗАПРОСА', hint: 'База готова. Для начала введите название сериала.', results: 'РЕЗУЛЬТАТЫ ПОИСКА', footer: 'TV EXPLORER SYSTEM', footnote: '640 KB хороших историй хватит каждому.' },
  botanical: { brand: 'Гербарий историй', eyebrow: 'АТЛАС СЕРИАЛОВ · ТОМ ПЕРВЫЙ', title: 'Истории, в которых\nхочется <em>потеряться.</em>', subtitle: 'У каждой истории — свой характер.\nНайдите ту, что приживётся в вашем вечере.', search: 'Название истории', placeholder: 'Какой сериал будем искать?', button: 'Найти историю ↗', empty: 'Ваша коллекция начинается здесь', hint: 'Введите название — и мы разложим истории по полочкам.', results: 'Найденные экземпляры', footer: 'Собирайте истории, а не закладки.', footnote: 'Бережно отобрано для любопытных.' },
  diner: { brand: 'ЕЩЁ СЕРИЮ!', eyebrow: 'СЕРИАЛЬНАЯ ЗАКУСОЧНАЯ · ОТКРЫТО ДО ФИНАЛА', title: 'Ну что,\n<span>как обычно?</span>', subtitle: 'Вам детектив, комедию или что-нибудь поострее?\nНайдём сериал по вашему вкусу.', search: 'Что будете смотреть?', placeholder: 'Название сериала, пожалуйста', button: 'Заказать →', empty: 'Ваш столик пока свободен', hint: 'Назовите сериал — подадим всё, что есть в меню.', results: 'Сегодня в меню', footer: 'Хорошие истории. Большие порции.', footnote: 'Работаем, пока вы не скажете «ещё одну».' },
}
