'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { projects, statsValues } from '@/lib/data'
import RoleBadge from '@/components/RoleBadge'
import {
  HiLocationMarker, HiX, HiChevronLeft, HiChevronRight,
  HiCalendar, HiCurrencyDollar, HiClock, HiClipboardList,
  HiArrowRight, HiBriefcase,
} from 'react-icons/hi'

type Project = typeof projects[number]

const CATEGORY_FILTER_ALL = 'all'

// iOS-safe scroll lock: position:fixed preserves layout; restores scroll on unlock
function lockScroll(savedY: React.MutableRefObject<number>) {
  savedY.current = window.scrollY
  document.body.style.cssText +=
    `;position:fixed;top:-${savedY.current}px;left:0;right:0;overflow:hidden;`
}
function unlockScroll(savedY: React.MutableRefObject<number>) {
  document.body.style.cssText = document.body.style.cssText
    .replace(/position:[^;]+;/g, '')
    .replace(/top:[^;]+;/g, '')
    .replace(/left:[^;]+;/g, '')
    .replace(/right:[^;]+;/g, '')
    .replace(/overflow:[^;]+;/g, '')
  window.scrollTo(0, savedY.current)
}

export default function ProjectsPage() {
  const t   = useTranslations('projects')
  const tp  = useTranslations('pages.projects')
  const tpd = useTranslations('pages.projectDetail')
  const ts  = useTranslations('stats')
  const locale = useLocale()
  const searchParams = useSearchParams()

  const categoryKeys = ['civil', 'infrastructure', 'finishing', 'steel', 'roads', 'mosque', 'landscape'] as const

  const [activeFilter,    setActiveFilter]    = useState(() => {
    const cat = searchParams.get('category')
    return cat && (categoryKeys as readonly string[]).includes(cat) ? cat : CATEGORY_FILTER_ALL
  })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [imageIndex,      setImageIndex]      = useState(0)
  const scrollYRef = useRef(0)

  const statLabels = ts.raw('statLabels') as string[]

  // Sync filter when navigating back to this page with a different ?category= param
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && (categoryKeys as readonly string[]).includes(cat)) {
      setActiveFilter(cat)
    } else if (!cat) {
      setActiveFilter(CATEGORY_FILTER_ALL)
    }
  }, [searchParams])

  const filtered = activeFilter === CATEGORY_FILTER_ALL
    ? projects
    : projects.filter((p) => p.categoryId === activeFilter)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setImageIndex(0)
    lockScroll(scrollYRef)
  }

  const closeModal = useCallback(() => {
    setSelectedProject(null)
    unlockScroll(scrollYRef)
  }, [])

  const prevImage = useCallback(() => {
    if (!selectedProject) return
    setImageIndex((i) => (i - 1 + selectedProject.images.length) % selectedProject.images.length)
  }, [selectedProject])

  const nextImage = useCallback(() => {
    if (!selectedProject) return
    setImageIndex((i) => (i + 1) % selectedProject.images.length)
  }, [selectedProject])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selectedProject) return
      if (e.key === 'Escape')      closeModal()
      if (e.key === 'ArrowLeft')   prevImage()
      if (e.key === 'ArrowRight')  nextImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedProject, closeModal, prevImage, nextImage])

  // Clean up scroll lock if component unmounts while modal is open
  useEffect(() => () => { unlockScroll(scrollYRef) }, [])

  return (
    <div className="min-h-screen bg-white">

      {/* ── PAGE HERO ─────────────────────────────────── */}
      <div className="bg-[#080e20] pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label">{tp('header.breadcrumb')}</span>
            <h1
              className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white leading-[1.1] mb-3 tracking-[-0.02em]"
            >
              {tp('header.title')}
            </h1>
            <p className="text-white/40 text-sm md:text-base max-w-xl">{tp('header.subtitle')}</p>
          </motion.div>

          {/* General Notes */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 bg-white/5 border border-white/10 rounded-xl px-5 py-4"
          >
            <span className="text-accent text-[10px] font-bold uppercase shrink-0" style={{ letterSpacing: '0.15em' }}>
              {locale === 'ar' ? 'ملاحظات عامة' : locale === 'ur' ? 'عمومی نوٹس' : 'General Notes'}
            </span>
            <div className="h-px bg-white/10 hidden sm:block w-4 shrink-0" />
            <div className="flex flex-col gap-2 text-white/50 text-xs leading-relaxed">
              {(locale === 'ar'
                ? ['لكل مشروع نطاق أعمال خاص وفق متطلبات العميل.', 'تم تنفيذ المشاريع بنظام المقاول الرئيسي والمقاول الفرعي.', 'جميع وثائق المشاريع متوفرة في قاعدة بياناتنا وتُقدَّم عند الطلب.']
                : locale === 'ur'
                ? ['ہر منصوبے کا کام کا دائرہ گاہک کی ضروریات کے مطابق ہوتا ہے۔', 'منصوبے مرکزی ٹھیکیدار اور ذیلی ٹھیکیدار دونوں کی حیثیت سے انجام دیے گئے۔', 'تمام منصوبوں کی دستاویزات ہمارے ڈیٹا بیس میں موجود ہیں اور درخواست پر فراہم کی جا سکتی ہیں۔']
                : ['Every project has a distinct scope of work tailored to client requirements.', 'Projects were executed under both main contracting and subcontracting models.', 'All project documents are available in our database and can be provided upon request.']
              ).map((note, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-accent mt-0.5 shrink-0">•</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/8 rounded-xl overflow-hidden mt-10 border border-white/8"
          >
            {statsValues.map((s, i) => (
              <div key={i} className="bg-white/5 py-5 px-5 text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-accent leading-none mb-1">
                  {s.value}{s.suffix}
                </div>
                <div className="text-white/35 text-[9px] sm:text-[10px] leading-tight mt-1 font-medium">{statLabels[i]}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── FILTER TABS ───────────────────────────────── */}
      <div className="sticky top-[56px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-3">
            <button
              onClick={() => setActiveFilter(CATEGORY_FILTER_ALL)}
              className={`shrink-0 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                activeFilter === CATEGORY_FILTER_ALL
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-500 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {t('filterAll')}
            </button>
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`shrink-0 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                  activeFilter === key
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {tp(`categories.${key}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROJECT GRID ──────────────────────────────── */}
      <div className="container-custom py-12 md:py-16">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {filtered.map((project, i) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const title    = t(`items.${project.id}.title` as any)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const location = t(`items.${project.id}.location` as any)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const duration = t(`items.${project.id}.duration` as any)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const role     = t(`items.${project.id}.role` as any)
              const category = tp(`categories.${project.categoryId}`)

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => openModal(project)}
                  className="card-project group cursor-pointer rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 hover:border-transparent hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.coverImage}
                      alt={title}
                      className="card-img w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 img-overlay" />

                    {/* Category chip */}
                    <div className="absolute top-3 start-3">
                      <span className="chip-white text-[9px]">{category}</span>
                    </div>

                    {/* View Gallery overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/15 backdrop-blur-sm border border-white/30 text-white text-[12px] font-bold px-5 py-2.5 rounded-full tracking-wide">
                        {tp('viewGallery')} · {project.images.length} photos
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    {/* Title + role badge row */}
                    <div className="mb-2.5">
                      <h3 className="font-extrabold text-gray-900 text-base leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {title}
                      </h3>
                      <RoleBadge role={project.projectRole} label={role} size="xs" />
                    </div>

                    <div className="flex items-center justify-between text-[12px] text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <HiLocationMarker className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span className="truncate">{location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <HiCalendar className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>{project.year}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="text-primary font-extrabold text-base">
                        SAR {(() => { const m = project.value / 1_000_000; return m % 1 === 0 ? m.toFixed(0) : m.toFixed(2) })()}M
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-gray-400 text-[11px]">
                          <HiClock className="w-3.5 h-3.5" />
                          {duration}
                        </div>
                        <Link
                          href={`/${locale}/projects/${project.id}`}
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1 text-accent text-[11px] font-bold hover:text-primary transition-colors"
                        >
                          Details
                          <HiArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-24 text-center text-gray-400">
            No projects in this category yet.
          </div>
        )}
      </div>

      {/* ── GALLERY MODAL ─────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const title    = t(`items.${selectedProject.id}.title`    as any)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const location = t(`items.${selectedProject.id}.location` as any)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const duration = t(`items.${selectedProject.id}.duration` as any)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const role     = t(`items.${selectedProject.id}.role`     as any)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const roleDesc = t(`items.${selectedProject.id}.roleDesc` as any)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const desc     = t(`items.${selectedProject.id}.desc`     as any)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const scopeRaw = t.raw(`items.${selectedProject.id}.scope` as any) as string[]
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const itemRaw  = t.raw(`items.${selectedProject.id}` as any) as { breakdown?: { label: string; sublabel: string }[] }
          const breakdown = itemRaw.breakdown
          const category = tp(`categories.${selectedProject.categoryId}`)

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="modal-backdrop flex flex-col"
              onClick={closeModal}
              style={{ overscrollBehavior: 'contain' }}
            >
              {/* Header bar */}
              <div
                className="flex items-center justify-between px-4 md:px-8 py-3.5 border-b border-white/10 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="chip-white shrink-0 text-[9px]">{category}</span>
                  <h2 className="text-white font-extrabold text-sm md:text-base truncate">
                    {title}
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 ms-3"
                  aria-label="Close"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              {/*
                Mobile: outer div scrolls vertically as one unit.
                Desktop (lg): outer is overflow-hidden; details panel scrolls independently.
              */}
              <div
                className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden lg:min-h-0"
                style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image viewer — fixed height on mobile, flex-1 on desktop */}
                <div className="relative shrink-0 lg:flex-1 lg:shrink flex items-center justify-center bg-black/50"
                  style={{ minHeight: '52vmin' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imageIndex}
                      src={selectedProject.images[imageIndex]}
                      alt={`${title} — photo ${imageIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-full max-h-full w-full h-full object-contain"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      {...({} as any)}
                    />
                  </AnimatePresence>

                  {/* Nav arrows */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-all hover:scale-110"
                        aria-label="Previous image"
                      >
                        <HiChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center transition-all hover:scale-110"
                        aria-label="Next image"
                      >
                        <HiChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Counter */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/65 text-white text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wide">
                    {imageIndex + 1} / {selectedProject.images.length}
                  </div>
                </div>

                {/* Details panel — no overflow on mobile (parent scrolls); lg gets its own scroll */}
                <div className="w-full lg:w-80 xl:w-96 bg-[#0a0f1e] border-t border-white/8 lg:border-t-0 lg:border-s lg:border-white/10 shrink-0 lg:overflow-y-auto"
                  style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
                >
                  <div className="p-5 md:p-6 space-y-5">

                    {/* Role badge + description — most prominent fact */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/8">
                      <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold tracking-wider uppercase mb-3">
                        <HiBriefcase className="w-3.5 h-3.5 shrink-0" />
                        {tpd('contractorRole')}
                      </div>
                      <div className="mb-2">
                        <RoleBadge
                          role={selectedProject.projectRole}
                          label={role}
                          variant="dark"
                          size="sm"
                        />
                      </div>
                      <p className="text-white/50 text-[12px] leading-relaxed mt-2">{roleDesc}</p>
                    </div>

                    {/* Key figures */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-bold tracking-wider uppercase mb-2">
                          <HiCurrencyDollar className="w-3.5 h-3.5" />
                          {tp('contractValue')}
                        </div>
                        <div className="text-accent font-extrabold text-lg leading-none">
                          SAR {(() => { const m = selectedProject.value / 1_000_000; return m % 1 === 0 ? m.toFixed(0) : m.toFixed(2) })()}M
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-bold tracking-wider uppercase mb-2">
                          <HiClock className="w-3.5 h-3.5" />
                          {tp('duration')}
                        </div>
                        <div className="text-white font-extrabold text-base leading-none">
                          {duration}
                        </div>
                      </div>
                    </div>

                    {/* Contract breakdown — multi-package projects */}
                    {breakdown && breakdown.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-white/40 text-[10px] font-bold tracking-wider uppercase mb-1">
                          Contract Breakdown
                        </div>
                        {breakdown.map((pkg, i) => {
                          const pkgMil = (selectedProject as { breakdown?: { value: number }[] }).breakdown![i].value / 1_000_000
                          const pkgVal = pkgMil % 1 === 0 ? pkgMil.toFixed(0) : pkgMil.toFixed(2)
                          return (
                            <div key={i} className="flex items-start gap-2.5 bg-white/5 border border-white/8 rounded-xl px-3 py-2.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="text-white/85 text-[12px] font-bold leading-snug">{pkg.label}</div>
                                <div className="text-white/35 text-[10px] mt-0.5">{pkg.sublabel}</div>
                              </div>
                              <div className="text-accent font-extrabold text-[13px] shrink-0 ms-1">SAR {pkgVal}M</div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-bold tracking-wider uppercase mb-2">
                        <HiLocationMarker className="w-3.5 h-3.5" />
                        {tp('location')}
                      </div>
                      <div className="text-white font-semibold text-sm">{location}</div>
                    </div>

                    {/* Description */}
                    <div>
                      <p className="text-white/55 text-[13px] leading-relaxed">{desc}</p>
                    </div>

                    {/* Scope */}
                    <div>
                      <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold tracking-wider uppercase mb-3">
                        <HiClipboardList className="w-3.5 h-3.5" />
                        {tp('scope')}
                      </div>
                      <ul className="space-y-2">
                        {scopeRaw.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2.5 text-white/65 text-[13px]">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Thumbnail strip */}
                    {selectedProject.images.length > 1 && (
                      <div>
                        <div className="text-white/40 text-[10px] font-bold tracking-wider uppercase mb-3">
                          {tpd('allPhotos')}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {selectedProject.images.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setImageIndex(idx)}
                              className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                idx === imageIndex ? 'border-accent scale-105' : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* View full detail link */}
                    <Link
                      href={`/${locale}/projects/${selectedProject.id}`}
                      onClick={closeModal}
                      className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-[#00988a] text-white font-bold py-3 rounded-xl text-sm transition-all duration-200 hover:shadow-lg"
                    >
                      Full Project Details
                      <HiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
