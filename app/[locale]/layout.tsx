import type { Metadata } from 'next'
import { Cairo, Inter, Noto_Nastaliq_Urdu } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import SlideNav from '@/components/SlideNav'
import '../globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-nastaliq',
  display: 'swap',
})


export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { languages: { ar: '/ar', en: '/en', ur: '/ur' } },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: params.locale === 'ar' ? 'ar_SA' : params.locale === 'ur' ? 'ur_PK' : 'en_US',
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!routing.locales.includes(locale as any)) notFound()

  const messages = await getMessages()
  const isRTL = locale !== 'en'

  const fontClass =
    locale === 'ur'
      ? `${nastaliq.variable} font-nastaliq`
      : locale === 'en'
      ? `${inter.variable} font-inter`
      : `${cairo.variable} font-cairo`

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className={fontClass}>
      <head>
        <link rel="alternate" hrefLang="ar" href="/ar" />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="ur" href="/ur" />
        <link rel="alternate" hrefLang="x-default" href="/ar" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <SlideNav />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
