'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { HiArrowLeft, HiArrowRight, HiPhone } from 'react-icons/hi'
import Link from 'next/link'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=85'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const isRTL = locale !== 'en'
  const ArrowIcon = isRTL ? HiArrowLeft : HiArrowRight

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* ── Background stack ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* Image — very dark so overlaid text always wins */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('${HERO_IMAGE}')`,
            backgroundPosition: 'center 35%',
            filter: 'brightness(0.28) saturate(0.7)',
          }}
        />
        {/* Solid navy tint — unifies the darkened image */}
        <div className="absolute inset-0 bg-[#000d1f]/80" />
        {/* Vertical gradient — darkest at top & bottom, medium in text zone */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        {/* Edge vignette only — keeps the centre image hint visible */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 90% 70% at 50% 45%, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 container-custom pt-28 pb-20 sm:pt-32 sm:pb-24 flex flex-col items-center text-center text-white">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 border border-white/25 text-white/85 px-4 py-2 rounded-full text-xs font-medium mb-8 sm:mb-10 ${isRTL ? '' : 'tracking-wide'}`}
        >
          <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
          {t('badge')}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-extrabold mb-5 sm:mb-6 text-shadow-strong max-w-4xl"
          style={{ lineHeight: isRTL ? '1.45' : '1.12' }}
        >
          {t('title')}
          <br />
          <span className="text-accent">{t('titleAccent')}</span>
        </motion.h1>


        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto px-4 sm:px-0"
        >
          <Link href={`/${locale}/projects`} className="btn-accent text-sm px-8 sm:px-10 py-4">
            {t('ctaProjects')}
            <ArrowIcon className="w-4 h-4 shrink-0" />
          </Link>
          <Link href={`/${locale}/contact`} className="btn-outline-white text-sm px-8 sm:px-10 py-4">
            <HiPhone className="w-4 h-4 shrink-0" />
            {t('ctaQuote')}
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-14 sm:mt-20 w-full max-w-3xl"
        >
          {/* Divider */}
          <div className="w-full border-t border-white/15 mb-8 sm:mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            {[
              { val: t('statProjectsVal'), label: t('statProjects') },
              { val: t('statTeamVal'),     label: t('statTeam') },
              { val: t('statYearsVal'),    label: t('statYears') },
              { val: t('statCertVal'),     label: t('statCert') },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-xl px-3 py-4 sm:bg-transparent sm:backdrop-blur-none sm:border-0 sm:rounded-none sm:px-0 sm:py-0"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-accent mb-1.5" style={{ letterSpacing: 0 }}>
                  {s.val}
                </div>
                <div
                  className="text-white font-black text-xs sm:text-sm"
                  style={{ lineHeight: isRTL ? '1.6' : '1.4' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-px h-10 bg-white/30 mx-auto"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
