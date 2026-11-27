import { LayoutUi } from '@widgets/layout'
import { AboutSection } from './ui/about-section.component'
import { ContactSection } from './ui/contact-section.component'
import { ExpertiseSection } from './ui/expertise-section.component'
import { FeaturedProjectsSection } from './ui/featured-projects-section.component'

export function HomeWidget() {
  return (
    <LayoutUi.Layout>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 py-6 sm:gap-24 sm:py-12 lg:py-16">
        <AboutSection />
        <ExpertiseSection />
        <FeaturedProjectsSection />
        <ContactSection />
      </div>
    </LayoutUi.Layout>
  )
}
