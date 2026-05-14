import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.equipment' })
  return {
    title: `${t('header.title')} | Midan Alemar`,
    description: t('header.subtitle'),
  }
}

export default function EquipmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
