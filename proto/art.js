// Original vector illustrations keep the prototypes self-contained.
const drawings = {
  windows: '<path d="M35 240V48h150v192M65 48V24h90v24"/><path d="M52 73h23v34H52zm46 0h23v34H98zm46 0h23v34h-23zM52 129h23v34H52zm46 0h23v34H98zm46 0h23v34h-23zM52 185h23v34H52zm92 0h23v34h-23z"/><path d="M98 240v-49h23v49"/>',
  typewriter: '<path d="M52 143V45h116v98M42 139h136l21 73H21zM34 212v20h152v-20"/><path d="M68 67h84M68 84h65M68 101h74M55 165h110M49 184h122M78 207h64"/>',
  mountain: '<path d="M-10 208 78 49l58 107 30-56 66 108M53 95l25-46 26 49-24-12z"/><path d="M0 228h220M145 47h33M162 31v33"/><path d="M93 208v-30h36v30M87 178l24-19 24 19"/>',
  scales: '<path d="M110 44v171M71 231h78M85 215h50M45 85h130M110 44l-9 15h18zM45 85l-31 74h62zM175 85l-31 74h62z"/><path d="M14 159q31 42 62 0M144 159q31 42 62 0"/>',
  house: '<path d="M43 221V121h134v100M24 121l86-77 86 77M89 221v-61h42v61M60 144h15v24H60zm85 0h15v24h-15zM151 75V48h22v47M20 221h180"/><path d="M20 221v-60M200 221v-60M5 185h30M185 185h30"/>',
  eye: '<path d="M12 135q98-128 196 0-98 128-196 0z"/><circle cx="110" cy="135" r="39"/><circle cx="110" cy="135" r="13"/><path d="M110 36v25M49 53l14 22M171 53l-14 22M110 209v25"/>',
}

export function artwork(show) {
  const title = show.label.split('\n').map((line, i) => `<tspan x="110" dy="${i ? 20 : 0}">${line}</tspan>`).join('')
  return `<svg class="poster" viewBox="0 0 220 320" role="img" aria-label="Иллюстрация к сериалу ${show.title}"><rect width="220" height="320" fill="${show.color}"/><circle cx="178" cy="51" r="64" fill="#fff" opacity=".12"/><g fill="none" stroke="#26352d" stroke-width="3" stroke-linejoin="round">${drawings[show.art]}</g><rect y="252" width="220" height="68" fill="#26352d"/><text x="110" y="274" fill="#fff5dc" text-anchor="middle" font-family="Georgia,serif" font-size="15" letter-spacing="1">${title}</text><text x="12" y="20" font-family="monospace" font-size="8" fill="#26352d">TVE ORIGINAL ART / 0${show.id}</text></svg>`
}

export const branch = `<svg viewBox="0 0 320 390" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="currentColor" stroke-width="1.5"><path d="M145 375C170 292 136 225 177 149S210 61 207 14M157 300C104 264 83 225 54 186M160 253C218 241 249 211 284 163M170 183C125 156 102 112 90 65"/><path d="M155 307C107 318 71 291 68 264c34-9 65 9 87 43ZM151 284c-6-40-34-65-61-64-2 28 18 54 61 64ZM121 255c-41 2-70-21-74-47 34-1 61 16 74 47ZM89 224c-39-8-57-36-51-60 31 10 46 32 51 60ZM158 255c32 19 65 7 78-17-25-14-55-10-78 17ZM194 241c37 5 65-12 70-39-32-5-55 10-70 39ZM231 215c36-2 56-23 56-50-32 2-50 20-56 50ZM169 187c-41 7-69-13-72-39 30-4 53 9 72 39ZM137 153c-38-2-57-27-54-51 31 5 48 23 54 51ZM112 114c-30-12-40-38-31-62 26 14 37 36 31 62ZM181 141c33 3 56-18 58-43-29-1-48 16-58 43ZM195 105c-31-10-43-37-36-60 25 9 39 31 36 60ZM206 64c25-8 37-30 30-52-25 8-34 27-30 52Z"/></g></svg>`
