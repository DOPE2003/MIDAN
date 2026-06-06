import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['ar', 'en', 'ur'] as const,
  defaultLocale: 'ar',
  localePrefix: 'always',
})

export type Locale = (typeof routing.locales)[number]
export const locales = routing.locales
export const defaultLocale = routing.defaultLocale
