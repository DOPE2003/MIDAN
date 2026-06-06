'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { companyInfo, certifications } from '@/lib/data'
import {
  HiLocationMarker, HiPhone, HiMail, HiClock,
  HiCheckCircle, HiShieldCheck, HiArrowRight,
  HiExternalLink, HiDeviceMobile,
} from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function ContactPage() {
  const t      = useTranslations('pages.contact')
  const locale = useLocale()
  const isRTL  = locale !== 'en'

  const contactItems = [
    {
      Icon: HiLocationMarker,
      label: t('addressTitle'),
      value: locale === 'ar'
        ? 'الطريق الدائري الشرقي، حي الازدهار، الرياض'
        : locale === 'ur'
        ? 'ایسٹرن رنگ روڈ، الازدهار ضلع، ریاض'
        : 'Eastern Ring Rd, Al Ezdihar Dist., Riyadh',
      href: companyInfo.mapsUrl,
      external: true,
    },
    {
      Icon: HiDeviceMobile,
      label: t('phoneMobile'),
      value: companyInfo.phoneDisplay,
      href: `tel:${companyInfo.phoneTel}`,
      ltr: true,
    },
    {
      Icon: HiPhone,
      label: t('phoneLandline'),
      value: companyInfo.phoneLandlineDisplay,
      href: `tel:${companyInfo.phoneLandlineTel}`,
      ltr: true,
    },
    {
      Icon: HiMail,
      label: t('emailTitle'),
      value: companyInfo.email,
      href: `mailto:${companyInfo.email}`,
      ltr: true,
    },
    {
      Icon: HiClock,
      label: t('workingHours'),
      value: t('hours'),
      href: null,
    },
  ]

  return (
    <div className="min-h-screen bg-[#040c1e]">

      {/* ── PAGE HERO ────────────────────────────────────── */}
      <div className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/landscape/img7.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040c1e]/60 via-[#040c1e]/80 to-[#040c1e]" />

        <div className="container-custom relative z-10">
          <motion.div {...fadeUp(0)} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-0.5 bg-accent rounded-full" />
              <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">{t('header.breadcrumb')}</span>
            </div>
            <h1
              className="font-extrabold text-white leading-[1.08] mb-4 tracking-[-0.025em]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
            >
              {t('header.title')}
            </h1>
            <p className="text-white/40 text-[15px] leading-relaxed max-w-lg">{t('header.subtitle')}</p>
          </motion.div>
        </div>
      </div>

      {/* ── CONTACT INFO ─────────────────────────────────── */}
      <div className="container-custom pb-24">

        {/* Section label */}
        <motion.div {...fadeUpView(0)} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-[-0.02em]">
            {t('infoTitle')}
          </h2>
          <div className="w-10 h-0.5 bg-accent rounded-full" />
        </motion.div>

        {/* Contact cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {contactItems.map(({ Icon, label, value, href, external, ltr }, i) => {
            const card = (
              <div className={`group flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 ${
                href
                  ? 'bg-white/4 border-white/8 hover:bg-white/8 hover:border-accent/30 cursor-pointer'
                  : 'bg-white/3 border-white/6'
              }`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                  href ? 'bg-white/8 group-hover:bg-accent' : 'bg-white/5'
                }`}>
                  <Icon className={`w-5 h-5 transition-colors duration-300 ${
                    href ? 'text-accent group-hover:text-white' : 'text-accent/60'
                  }`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] font-bold text-white/30 tracking-[0.2em] uppercase mb-1.5">{label}</div>
                  <div className={`font-semibold text-[15px] leading-snug transition-colors duration-300 ${
                    href ? 'text-white/80 group-hover:text-accent' : 'text-white/60'
                  }`}>
                    {ltr ? <span dir="ltr">{value}</span> : value}
                  </div>
                  {href && (
                    <div className="flex items-center gap-1 mt-2 text-accent/50 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <HiExternalLink className="w-3 h-3" />
                      {external
                        ? (locale === 'ar' ? 'فتح الخريطة' : locale === 'ur' ? 'نقشہ کھولیں' : 'Open Maps')
                        : href.startsWith('mailto')
                          ? (locale === 'ar' ? 'إرسال بريد' : locale === 'ur' ? 'ای میل کریں' : 'Send Email')
                          : (locale === 'ar' ? 'اتصال' : locale === 'ur' ? 'کال کریں' : 'Call')}
                    </div>
                  )}
                </div>
              </div>
            )

            return href ? (
              <motion.a
                key={i}
                {...fadeUpView(i * 0.07)}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {card}
              </motion.a>
            ) : (
              <motion.div key={i} {...fadeUpView(i * 0.07)}>
                {card}
              </motion.div>
            )
          })}
        </div>

        {/* ── CTA BUTTONS ── */}
        <motion.div {...fadeUpView(0.35)} className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href={companyInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#25D366]/12 border border-[#25D366]/22 text-[#4ade80] font-bold text-sm hover:bg-[#25D366]/22 hover:border-[#25D366]/40 transition-all duration-200 group"
          >
            <FaWhatsapp className="w-5 h-5 text-[#25D366] shrink-0" />
            <span>{t('whatsappCta')}</span>
            <HiArrowRight className={`w-4 h-4 ms-auto opacity-50 group-hover:opacity-90 group-hover:translate-x-0.5 transition-all ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
          </a>

          <a
            href={companyInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-7 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/65 font-bold text-sm hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200 group"
          >
            <HiLocationMarker className="w-5 h-5 text-accent shrink-0" />
            <span>{t('mapsCta')}</span>
            <HiArrowRight className={`w-4 h-4 ms-auto opacity-30 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
          </a>
        </motion.div>

        {/* ── CERTIFICATIONS ── */}
        <motion.div
          {...fadeUpView(0.45)}
          className="border-t border-white/8 pt-10"
        >
          <div className="flex items-center gap-2 mb-6">
            <HiShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase">
              {locale === 'ar' ? 'الشهادات والاعتمادات' : locale === 'ur' ? 'سرٹیفیکیشن اور اعتماد' : 'Certifications & Accreditations'}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {certifications.map((c) => (
              <div key={c} className="flex items-center gap-2.5 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5">
                <HiCheckCircle className="w-3.5 h-3.5 text-accent/70 shrink-0" />
                <span className="text-white/55 text-[13px] font-semibold">{c}</span>
              </div>
            ))}
            <div className="flex items-center gap-2.5 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5">
              <HiCheckCircle className="w-3.5 h-3.5 text-accent/70 shrink-0" />
              <span className="text-white/55 text-[13px] font-semibold" dir="ltr">D-U-N-S: #{companyInfo.duns}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
