import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'clients' })
  return {
    title: `${t('title')} | Midan Alemar`,
    description: t('body'),
  }
}

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
