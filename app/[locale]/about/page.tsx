'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import {
  HiShieldCheck, HiUsers, HiGlobe, HiOfficeBuilding,
  HiArrowRight, HiArrowLeft, HiCheckCircle,
} from 'react-icons/hi'
import { certifications, manpower } from '@/lib/data'

const valueIcons = [
  <HiShieldCheck key="shield" className="w-5 h-5" />,
  <HiUsers      key="users"   className="w-5 h-5" />,
  <HiGlobe      key="globe"   className="w-5 h-5" />,
  <HiOfficeBuilding key="bld" className="w-5 h-5" />,
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function AboutPage() {
  const t      = useTranslations('pages.about')
  const tAbout = useTranslations('about')
  const locale = useLocale()
  const isRTL  = locale !== 'en'
  const Arrow  = isRTL ? HiArrowLeft : HiArrowRight

  const values     = t.raw('values')     as { title: string; desc: string }[]
  const milestones = t.raw('milestones') as { year: string; event: string }[]
  const roles      = t.raw('manpowerRoles') as string[]

  return (
    <div className="min-h-screen bg-white">

      {/* ── PAGE HERO ─────────────────────────────────── */}
      <div className="relative bg-[#080e20] pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/civil/img1.jpg"
          alt="About hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080e20] via-[#080e20]/80 to-transparent" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="section-label">{t('header.breadcrumb')}</span>
            <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold text-white leading-[1.1] mb-4 tracking-[-0.02em]">
              {t('header.title')}
            </h1>
            <p className="text-white/85 text-base leading-relaxed">{t('header.subtitle')}</p>
          </motion.div>
        </div>
      </div>

      {/* ── INTRO ─────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left text */}
            <motion.div {...fade(0)}>
              <span className="section-label">{t('introTitle')}</span>
              <h2 className="section-title">{tAbout('title')}</h2>
              <p className="section-body mb-5">{tAbout('body1')}</p>
              <p className="section-body mb-8">{tAbout('body2')}</p>

              {/* Highlights */}
              <ul className="space-y-3 mb-8">
                {(tAbout.raw('highlights') as string[]).map((h: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-gray-600">
                    <HiCheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <Link href={`/${locale}/contact`} className="btn-primary">
                {t('workWithUs')} <Arrow className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Right identity card */}
            <motion.div {...fade(0.1)}>
              <div className="bg-primary rounded-2xl p-8 text-white">
                <div className="flex items-end gap-3 mb-6">
                  <div className="text-[5rem] font-extrabold leading-none text-accent">{tAbout('yearsVal')}</div>
                  <div className="text-white/85 text-sm font-semibold tracking-widest uppercase pb-3">{tAbout('yearsLabel')}</div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-8">
                  {[
                    { label: tAbout('foundedLabel'),   value: tAbout('foundedValue') },
                    { label: tAbout('workforceLabel'), value: tAbout('workforceValue') },
                    { label: tAbout('dunsLabel'),      value: tAbout('dunsNumber') },
                    { label: tAbout('certsLabel'),     value: tAbout('certsValue') },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="text-white/70 text-[9px] font-bold tracking-widest uppercase mb-1">{row.label}</div>
                      <div className="text-white font-semibold text-sm">{row.value}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/15 pt-6 flex flex-wrap gap-2">
                  {certifications.map((c) => (
                    <span key={c} className="bg-white/10 text-white/90 text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────── */}
      <section className="py-20 bg-[#f8f9fc]">
        <div className="container-custom">
          <motion.div {...fade(0)} className="mb-12 text-center max-w-xl mx-auto">
            <span className="section-label">{t('valuesLabel')}</span>
            <h2 className="section-title">{t('introTitle')}</h2>
            <p className="section-body">{t('intro')}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((val, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.07)}
                className="group bg-white border border-gray-100 hover:border-accent/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-10 h-10 bg-primary/8 group-hover:bg-primary text-primary group-hover:text-white rounded-xl flex items-center justify-center mb-4 transition-all duration-300">
                  {valueIcons[i]}
                </div>
                <h3 className="font-extrabold text-gray-900 text-base mb-2">{val.title}</h3>
                <p className="text-gray-400 text-[13px] leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#080e20]">
        <div className="container-custom">
          <motion.div {...fade(0)} className="mb-14 text-center">
            <span className="section-label">{t('timelineTitle')}</span>
            <h2 className="section-title-white">{t('decadeTitle')}</h2>
          </motion.div>

          <div className="relative">
            {/* Horizontal line (desktop) */}
            <div className="hidden md:block absolute top-6 inset-x-0 h-px bg-white/10" />

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.08)}
                  className="relative text-center"
                >
                  {/* Dot */}
                  <div className="relative z-10 w-3 h-3 bg-accent rounded-full mx-auto mb-5 ring-4 ring-accent/20" />

                  <div className="text-accent text-xl font-extrabold mb-2">{m.year}</div>
                  <p className="text-white/85 text-[12px] leading-snug">{m.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKFORCE ─────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade(0)}>
              <span className="section-label">{t('manpowerTitle')}</span>
              <h2 className="section-title">{t('peopleTitle')}</h2>
              <p className="section-body mb-8">
                {t('peopleBody', { count: t('totalManpower') })}
              </p>

              <div className="space-y-4">
                {manpower.map((mp, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[13px] font-semibold text-gray-700">{roles[mp.roleIndex]}</span>
                      <span className="text-[12px] text-accent font-bold">{mp.count} · {mp.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${mp.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(0.1)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/projects/infrastructure/img1.jpg" alt="Team" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/projects/steel/img3.jpg" alt="Steel works" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-primary rounded-2xl p-5 text-white text-center">
                    <div className="text-3xl font-extrabold text-accent">{t('totalManpower')}</div>
                    <div className="text-white/85 text-xs font-semibold mt-1">{t('totalLabel')}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
