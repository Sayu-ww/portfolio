import type { SharedTypes } from '@shared'

export type NavLinkItem = {
  title: SharedTypes.LocalizedText
  href: string
  description?: SharedTypes.LocalizedText
  icon?: React.ReactNode
}
