export const TELEGRAM_USERNAME = 'komilov_rahmatulloh55'

export const telegramText = `Ha sevgilim! 💍❤️

Men turmushga chiqaman.
Sizni juda yaxshi ko'raman! 🤍`

export const openTelegramWithMessage = () => {
  window.location.href = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(telegramText)}`
}
