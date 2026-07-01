import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Particles } from './components/Particles'
import { RingBox } from './components/RingBox'
import { openTelegramWithMessage } from './utils/telegram'

type Page = {
  type: 'intro' | 'moon' | 'heart' | 'rose' | 'promise' | 'closedBox' | 'ringBox' | 'proposal' | 'thanks'
  eyebrow: string
  title?: string
  lines: string[]
}

const pages: Page[] = [
  {
    type: 'intro',
    eyebrow: 'faqat sen uchun',
    title: 'CHAROS',
    lines: ['Salom, go‘zal insonim...', 'Bugun senga aytadigan juda muhim gapim bor.'],
  },
  {
    type: 'moon',
    eyebrow: 'birinchi sabab',
    lines: ['Seni uchratgan kunim...', 'Hayotim o‘zgardi.', 'Sen sabab ko‘proq kuladigan bo‘ldim.'],
  },
  {
    type: 'heart',
    eyebrow: 'kelajak',
    lines: ['Kelajak haqida o‘ylasam...', 'Yonimda faqat seni tasavvur qilaman.'],
  },
  {
    type: 'rose',
    eyebrow: 'va’da',
    lines: ['Men mukammal emasman.', 'Lekin seni baxtli qilish uchun har kuni harakat qilaman.'],
  },
  {
    type: 'promise',
    eyebrow: 'chin dildan',
    lines: ['Har tong seni asrashni...', 'Har kecha sen uchun duo qilishni...', 'Va har kuni seni tanlashni xohlayman.'],
  },
  {
    type: 'closedBox',
    eyebrow: 'eng muhim lahza',
    lines: ['Hayotimning eng muhim savoli...', 'Javob seni uchun juda oson bo‘lishini bilaman.'],
  },
  {
    type: 'ringBox',
    eyebrow: 'tayyormisan?',
    lines: ['Sekin...', 'Bu lahza faqat ikkimizniki...', 'Endi esa...'],
  },
  {
    type: 'proposal',
    eyebrow: 'hayotim savoli',
    title: 'CHAROS',
    lines: ['Menga turmushga chiqasanmi?'],
  },
  {
    type: 'thanks',
    eyebrow: 'forever & always',
    title: 'RAHMAT, SEVGILIM!',
    lines: ['Bu mening hayotimdagi eng baxtli lahza.', 'Seni juda yaxshi ko‘raman!', 'Yangi hikoyamiz endi boshlanadi.'],
  },
]

const pageAnimation = {
  initial: { opacity: 0, scale: 1.04, filter: 'blur(16px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.96, filter: 'blur(16px)' },
}

function App() {
  const [pageIndex, setPageIndex] = useState(0)
  const [yesClicked, setYesClicked] = useState(false)
  const currentPage = pages[pageIndex]

  const isFirstPage = pageIndex === 0
  const isProposalPage = currentPage.type === 'proposal'
  const isThanksPage = currentPage.type === 'thanks'
  const progress = ((pageIndex + 1) / pages.length) * 100

  const goNext = () => {
    if (pageIndex < pages.length - 2) {
      setPageIndex(prev => prev + 1)
    }
  }

  const handleYes = () => {
    if (yesClicked) return

    setYesClicked(true)

    confetti({
      particleCount: 180,
      spread: 110,
      origin: { y: 0.72 },
    })

    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.38 },
      })
    }, 450)

    setTimeout(() => {
      setPageIndex(pages.length - 1)
    }, 650)

    setTimeout(() => {
      openTelegramWithMessage()
    }, 1500)
  }

  return (
    <main className="app">
      <section className="desktop-scene">
        <div className="desktop-glow desktop-glow-one" />
        <div className="desktop-glow desktop-glow-two" />

        <div className="desktop-card">
          <p className="desktop-eyebrow">premium proposal website</p>
          <h1>CHAROS</h1>
          <p>
            Qora fon, oltin gradient, sparkle, rose petals va CSS-only ring box animatsiyasi
            bilan cinematic luxury sahifa.
          </p>
          <div className="desktop-ring-wrap">
            <RingBox open />
          </div>
        </div>
      </section>

      <section className="phone-wrap">
        <div className="phone">
          <div className="aurora" />
          <div className="vignette" />

          <Particles />

          <div className="status-bar">
            <span>9:41</span>
            <span className="tiny-heart">♥</span>
            <span>▰▰ ◉</span>
          </div>

          <div className="progress">
            <span style={{ width: `${progress}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.section
              key={currentPage.type}
              className={`page page-${currentPage.type}`}
              variants={pageAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="page-orb" />

              <motion.p
                className="eyebrow"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.18 }}
              >
                {currentPage.eyebrow}
              </motion.p>

              {currentPage.title && (
                <motion.h1
                  className={isThanksPage ? 'thanks-title' : 'main-title'}
                  initial={{ y: 26, opacity: 0, letterSpacing: '0.16em' }}
                  animate={{ y: 0, opacity: 1, letterSpacing: '0.08em' }}
                  transition={{ delay: 0.24, duration: 0.9 }}
                >
                  {currentPage.title}
                </motion.h1>
              )}

              {(currentPage.type === 'closedBox' || currentPage.type === 'ringBox') && (
                <motion.div
                  className="ring-holder"
                  initial={{ y: 34, opacity: 0, scale: 0.86 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.28, duration: 0.9 }}
                >
                  <RingBox open={currentPage.type === 'ringBox'} />
                </motion.div>
              )}

              {currentPage.type === 'moon' && <div className="moon-visual" />}
              {currentPage.type === 'heart' && <div className="heart-visual">♥</div>}
              {currentPage.type === 'rose' && <div className="rose-visual">✦</div>}
              {currentPage.type === 'promise' && <div className="promise-visual">∞</div>}

              <div className="text-block">
                {currentPage.lines.map((line, index) => (
                  <motion.p
                    key={line}
                    className={isProposalPage ? 'proposal-text' : 'line'}
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.34 + index * 0.13 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {!isProposalPage && !isThanksPage && (
                <motion.button
                  className="next-btn"
                  onClick={goNext}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {isFirstPage ? 'Boshlash' : 'Davom etish'}
                </motion.button>
              )}

              {isProposalPage && (
                <motion.button
                  className="yes-btn"
                  onClick={handleYes}
                  disabled={yesClicked}
                  initial={{ y: 24, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.72, type: 'spring', stiffness: 160 }}
                  whileTap={{ scale: 0.94 }}
                >
                  HA ❤️
                </motion.button>
              )}
            </motion.section>
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}

export default App
