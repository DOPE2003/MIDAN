'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { clientIds } from '@/lib/data'

export default function ClientsPage() {
  const t = useTranslations('clients')
  const items = t.raw('items') as Record<string, { name: string; sector: string }>

  return (
    <div className="min-h-screen xl:h-screen xl:overflow-hidden flex items-center bg-white">
      <div className="container-custom w-full pt-24 pb-10 xl:pt-20 xl:pb-0 text-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <span className="text-accent text-xs font-bold tracking-[0.15em] uppercase">{t('label')}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mt-2 mb-3 leading-tight">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">{t('body')}</p>
        </motion.div>

        {/* Client grid — clean text-only cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
          {clientIds.map((id, i) => {
            const client = items[id]
            if (!client) return null
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group border border-gray-100 hover:border-accent/40 hover:bg-primary rounded-xl px-5 py-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="font-bold text-gray-900 group-hover:text-white text-sm mb-1.5 transition-colors duration-300">
                  {client.name}
                </div>
                <div className="text-gray-400 group-hover:text-white/50 text-[10px] leading-snug tracking-wide uppercase transition-colors duration-300">
                  {client.sector}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          className="inline-flex items-center gap-2 border border-gray-100 text-gray-400 text-xs font-semibold px-5 py-2.5 rounded-full"
        >
          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
          {t('footnote')}
        </motion.div>
      </div>
    </div>
  )
}
