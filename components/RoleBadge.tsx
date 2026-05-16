import type { ProjectRole } from '@/lib/data'

// Badge config lives here so Tailwind's content scanner sees all classes
const cfg: Record<ProjectRole, { light: string; dark: string; dot: string }> = {
  'Main Contractor': {
    light: 'bg-blue-50 text-blue-700 border-blue-200',
    dark:  'bg-blue-500/15 text-blue-300 border-blue-400/30',
    dot:   'bg-blue-500',
  },
  'Subcontractor': {
    light: 'bg-amber-50 text-amber-700 border-amber-200',
    dark:  'bg-amber-500/15 text-amber-300 border-amber-400/30',
    dot:   'bg-amber-500',
  },
  'Lead Designer': {
    light: 'bg-purple-50 text-purple-700 border-purple-200',
    dark:  'bg-purple-500/15 text-purple-300 border-purple-400/30',
    dot:   'bg-purple-500',
  },
  'Consultant': {
    light: 'bg-gray-100 text-gray-600 border-gray-200',
    dark:  'bg-gray-500/15 text-gray-300 border-gray-400/30',
    dot:   'bg-gray-400',
  },
  'Development Partner': {
    light: 'bg-teal-50 text-teal-700 border-teal-200',
    dark:  'bg-teal-500/15 text-teal-300 border-teal-400/30',
    dot:   'bg-teal-500',
  },
}

interface Props {
  role: ProjectRole
  label?: string          // override display text (for i18n)
  variant?: 'light' | 'dark'
  size?: 'xs' | 'sm'
  className?: string
}

export default function RoleBadge({ role, label, variant = 'light', size = 'sm', className = '' }: Props) {
  const c = cfg[role]
  const colorClasses = variant === 'light' ? c.light : c.dark
  const sizeClasses  = size === 'xs'
    ? 'text-[9px] px-2 py-0.5 gap-1'
    : 'text-[10px] px-2.5 py-1 gap-1.5'

  return (
    <span
      className={`inline-flex items-center font-bold tracking-wide border rounded-full ${colorClasses} ${sizeClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      {label ?? role}
    </span>
  )
}
