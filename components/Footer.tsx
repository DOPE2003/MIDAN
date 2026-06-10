'use client'

import { useTranslations, useLocale } from 'next-intl'
import { companyInfo, certifications } from '@/lib/data'
import { HiLocationMarker, HiPhone, HiMail, HiDeviceMobile } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  const t    = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale()

  const navLinks = [
    { href: `/${locale}`,           label: tNav('home') },
    { href: `/${locale}/about`,     label: tNav('about') },
    { href: `/${locale}/services`,  label: tNav('services') },
    { href: `/${locale}/projects`,  label: tNav('projects') },
    { href: `/${locale}/equipment`, label: tNav('equipment') },
    { href: `/${locale}/contact`,   label: tNav('contact') },
  ]

  return (
    <footer className="bg-[#010e2e] text-white">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40" />

      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8">

          {/* Brand — full width on mobile, half on sm, 5/12 on lg */}
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="mb-4 sm:mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.svg" alt="Midan Alemar" className="h-14 sm:h-16 w-auto object-contain" />
            </div>
            <p className="text-white/85 text-sm leading-loose mb-5 sm:mb-7 max-w-sm">{t('tagline')}</p>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, i) => (
                <span key={i} className="border border-white/15 text-white/80 text-[10px] font-semibold px-3 py-1.5 rounded tracking-wide hover:border-accent/40 hover:text-accent/70 transition-colors cursor-default">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/70 mb-4 sm:mb-5">{t('navTitle')}</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/85 hover:text-accent text-sm transition-colors duration-200 py-0.5 block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/70 mb-4 sm:mb-5">{t('contactTitle')}</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <a
                  href={companyInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/85 hover:text-accent text-sm transition-colors group"
                >
                  <HiLocationMarker className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="leading-relaxed group-hover:underline underline-offset-2">{t('address')}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${companyInfo.phoneTel}`} className="flex items-center gap-3 text-white/85 hover:text-accent text-sm transition-colors py-0.5">
                  <HiDeviceMobile className="w-4 h-4 text-accent shrink-0" />
                  <span dir="ltr" className="font-medium">{companyInfo.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${companyInfo.phoneLandlineTel}`} className="flex items-center gap-3 text-white/85 hover:text-accent text-sm transition-colors py-0.5">
                  <HiPhone className="w-4 h-4 text-accent shrink-0" />
                  <span dir="ltr" className="font-medium">{companyInfo.phoneLandlineDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-3 text-white/85 hover:text-accent text-sm transition-colors py-0.5">
                  <HiMail className="w-4 h-4 text-accent shrink-0" />
                  <span dir="ltr" className="break-all">{companyInfo.email}</span>
                </a>
              </li>
            </ul>

            <a
              href={companyInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 mt-5 sm:mt-6 px-4 py-2.5 rounded-xl bg-[#25D366]/12 border border-[#25D366]/22 text-[#25D366] text-[13px] font-semibold hover:bg-[#25D366]/22 hover:border-[#25D366]/40 transition-all duration-200"
            >
              <FaWhatsapp className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-custom py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs text-white/65 text-center sm:text-start">
          <p>© {new Date().getFullYear()} ميدان الإعمار للمقاولات. {t('copyright')}</p>
          <p className="shrink-0" dir="ltr">D-U-N-S: #{companyInfo.duns}</p>
        </div>
      </div>
    </footer>
  )
}
