'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { routing } from '@/i18n/routing'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'
import Link from 'next/link'

const LOCALE_LABELS: Record<string, string> = { ar: 'AR', en: 'EN' }

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const isRTL = locale !== 'en'

  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`
  const isSolid = !isHome || scrolled

  const navLinks = [
    { href: `/${locale}`,           label: t('home') },
    { href: `/${locale}/about`,     label: t('about') },
    { href: `/${locale}/services`,  label: t('services') },
    { href: `/${locale}/projects`,  label: t('projects') },
    { href: `/${locale}/equipment`, label: t('equipment') },
    { href: `/${locale}/contact`,   label: t('contact') },
  ]

  const isActive = (href: string) =>
    href === `/${locale}` || href === `/${locale}/`
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(href)

  const switchLocale = (newLocale: string) => {
    setIsLangOpen(false)
    const subPath = pathname.replace(`/${locale}`, '')
    router.push(`/${newLocale}${subPath}`)
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
        isSolid
          ? 'bg-white/96 backdrop-blur-md border-b border-gray-100/80 py-3 shadow-sm'
          : 'bg-gradient-to-b from-[#020812]/55 to-transparent backdrop-blur-[2px] py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">

        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark.svg"
            alt="Midan Alemar"
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200 rounded-lg tracking-wide ${
                  active
                    ? isSolid ? 'text-primary' : 'text-white'
                    : isSolid
                    ? 'text-gray-500 hover:text-primary hover:bg-gray-50'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0.5 inset-x-3.5 h-0.5 bg-accent rounded-full"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right: lang + CTA */}
        <div className="hidden lg:flex items-center gap-3">

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                isSolid ? 'text-gray-500 hover:bg-gray-50 hover:text-gray-800' : 'text-white/65 hover:text-white hover:bg-white/10'
              }`}
            >
              {LOCALE_LABELS[locale]}
              <HiChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ duration: 0.14 }}
                  className={`absolute top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[110px] ${isRTL ? 'right-0' : 'left-0'}`}
                >
                  {routing.locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`w-full px-4 py-2.5 text-[13px] font-semibold text-start hover:bg-gray-50 transition-colors flex items-center justify-between gap-3 ${loc === locale ? 'text-accent' : 'text-gray-700'}`}
                    >
                      <span>{LOCALE_LABELS[loc]}</span>
                      {loc === locale && <div className="w-1.5 h-1.5 bg-accent rounded-full" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <Link
            href={`/${locale}/contact`}
            className={`text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 ${
              isSolid
                ? 'bg-primary text-white hover:bg-[#001848] hover:shadow-lg'
                : 'bg-white/15 border border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm'
            }`}
          >
            {t('cta')}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${isSolid ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`px-4 py-3.5 rounded-xl text-[14px] font-semibold transition-all ${
                    isActive(link.href)
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                {routing.locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { switchLocale(loc); setIsMobileOpen(false) }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${loc === locale ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {LOCALE_LABELS[loc]}
                  </button>
                ))}
              </div>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setIsMobileOpen(false)}
                className="btn-primary mt-2 justify-center text-sm"
              >
                {t('cta')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
