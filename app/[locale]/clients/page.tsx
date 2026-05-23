'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { clientIds, clientPngIds } from '@/lib/data'

export default function ClientsPage() {
  const t = useTranslations('clients')
  const items = t.raw('items') as Record<string, { name: string; sector: string }>

  return (
    <div className="min-h-screen bg-[#040c1e] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse at 30% 50%, #7030A0 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, #00B09B 0%, transparent 55%)' }}
      />

      <div className="container-custom relative z-10 pt-32 pb-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
          className="mb-12 text-center"
        >
          <span className="text-accent text-xs font-bold tracking-[0.15em] uppercase">{t('label')}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-3 leading-tight">
            {t('title')}
          </h1>
          <p className="text-white/45 text-sm max-w-md mx-auto">{t('body')}</p>
        </motion.div>

        {/* Client grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto mb-10">
          {clientIds.map((id, i) => {
            const client = items[id]
            if (!client) return null
            const ext = clientPngIds.has(id) ? 'png' : 'svg'
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-white/4 border border-white/8 hover:bg-white/8 hover:border-accent/25 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-0.5 cursor-default overflow-hidden"
                style={{ minHeight: '110px' }}
              >
                <img
                  src={`/logos/${id}.${ext}`}
                  alt={client.name}
                  className="h-8 sm:h-10 w-auto max-w-full object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="text-center">
                  <div className="text-white/50 group-hover:text-white/75 text-[10px] sm:text-xs font-semibold leading-tight transition-colors duration-300 line-clamp-1">
                    {client.name}
                  </div>
                  <div className="text-white/25 group-hover:text-accent/60 text-[9px] uppercase tracking-wide mt-0.5 transition-colors duration-300">
                    {client.sector}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-2 border border-white/12 text-white/35 text-xs font-semibold px-5 py-2.5 rounded-full bg-white/4">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            {t('footnote')}
          </span>
        </motion.div>
      </div>
    </div>
  )
}
