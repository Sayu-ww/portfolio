type Props = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading(props: Props) {
  const { eyebrow, title, description } = props

  return (
    <div className="max-w-2xl">
      <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.18em] uppercase">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="text-muted-foreground mt-4 text-base leading-7">{description}</p>}
    </div>
  )
}
