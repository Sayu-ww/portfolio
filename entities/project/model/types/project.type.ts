import type { LocalizedText } from '@shared/types'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  description: LocalizedText
  preview?: string
  images: ProjectImage[]
  backendCodeSnippets?: ProjectCodeSnippet[]
  linkToDeployProject?: string
  linkToGithub?: string
}

export type ProjectCategory = 'commercial' | 'pet-project' | 'personal' | 'open-source'

export type ProjectImage = {
  src: string
  description: LocalizedText
}

export type ProjectCodeSnippet = {
  title: LocalizedText
  language: string
  code: string
}
