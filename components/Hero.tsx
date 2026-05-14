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
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-[#001030]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 container-custom pt-32 pb-24 flex flex-col items-center text-center text-white">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-white/25 text-white/80 px-4 py-2 rounded-full text-xs font-medium mb-10 tracking-wide"
        >
          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
          {t('badge')}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-[5rem] font-extrabold mb-6 leading-[1.12] text-shadow-dark max-w-4xl"
        >
          {t('title')}
          <br />
          <span className="text-accent">{t('titleAccent')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="text-white/70 text-lg max-w-2xl leading-loose mb-12"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href={`/${locale}/projects`} className="btn-accent text-sm px-10 py-4">
            {t('ctaProjects')}
            <ArrowIcon className="w-4 h-4" />
          </Link>
          <Link href={`/${locale}/contact`} className="btn-outline-white text-sm px-10 py-4">
            <HiPhone className="w-4 h-4" />
            {t('ctaQuote')}
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-20 w-full max-w-3xl border-t border-white/15 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { val: t('statProjectsVal'), label: t('statProjects') },
            { val: t('statTeamVal'),     label: t('statTeam') },
            { val: t('statYearsVal'),    label: t('statYears') },
            { val: t('statCertVal'),     label: t('statCert') },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl font-extrabold text-accent mb-1">{s.val}</div>
              <div className="text-white/55 text-xs tracking-wide">{s.label}</div>
            </div>
          ))}
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
