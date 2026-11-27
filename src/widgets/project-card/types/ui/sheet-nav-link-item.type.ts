import type { SharedTypes } from '@shared'

export type SheetNavState = 'frontend' | 'backend'

export type SheetNavLinkItem = {
  state: SheetNavState
  label: SharedTypes.LocalizedText
}
