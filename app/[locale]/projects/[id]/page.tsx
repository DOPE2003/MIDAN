import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/data'
import { routing } from '@/i18n/routing'
import ProjectDetail from '@/components/ProjectDetail'

type Props = { params: { locale: string; id: string } }

export async function generateMetadata({ params: { locale, id } }: Props) {
  const project = projects.find(p => p.id === id)
  if (!project) return {}

  const tItems = await getTranslations({ locale, namespace: 'projects' })
  const tMeta  = await getTranslations({ locale, namespace: 'meta' })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const item = tItems.raw(`items.${id}` as any) as { title: string; desc: string }

  return {
    title: `${item.title} | ${tMeta('title')}`,
    description: item.desc,
    openGraph: {
      title: item.title,
      description: item.desc,
      images: [{ url: project.coverImage, width: 1200, height: 630, alt: item.title }],
      type: 'article',
      locale: locale === 'ar' ? 'ar_SA' : locale === 'ur' ? 'ur_PK' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.desc,
      images: [project.coverImage],
    },
  }
}

export function generateStaticParams() {
  return routing.locales.flatMap(locale =>
    projects.map(p => ({ locale, id: p.id }))
  )
}

export default function ProjectDetailPage({ params: { id } }: Props) {
  const project = projects.find(p => p.id === id)
  if (!project) notFound()

  return <ProjectDetail projectId={id} />
}
