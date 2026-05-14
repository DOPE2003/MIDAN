'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'

const SLIDES = [
  { path: '',          key: 'home' },
  { path: '/about',    key: 'about' },
  { path: '/services', key: 'services' },
  { path: '/projects', key: 'projects' },
  { path: '/clients',  key: 'clients' },
  { path: '/equipment',key: 'equipment' },
  { path: '/contact',  key: 'contact' },
]

export default function SlideNav() {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className="hidden xl:flex fixed end-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 items-center">
      {SLIDES.map((slide, i) => {
        const href = `/${locale}${slide.path}`
        const isActive = slide.path === ''
          ? pathname === `/${locale}` || pathname === `/${locale}/`
          : pathname.startsWith(`/${locale}${slide.path}`)
        return (
          <Link key={slide.key} href={href} aria-label={slide.key}>
            <motion.div
              className={`rounded-full transition-all duration-300 shadow-md ${
                isActive
                  ? 'w-2.5 h-2.5 bg-accent'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.4 }}
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            />
          </Link>
        )
      })}
    </div>
  )
}
