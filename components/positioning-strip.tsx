"use client"
import { useLanguage } from "@/components/language-context"

export function PositioningStrip() {
  const { t } = useLanguage()
  const pillars = [
    t("positioning.p1"), t("positioning.p2"),
    t("positioning.p3"), t("positioning.p4"),
  ]

  return (
    <section className="bg-navy-primary">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-6 px-6 py-6 sm:flex-row sm:gap-0">
        {pillars.map((text, i) => (
          <div key={text} className="flex items-center">
            {i > 0 && <div className="mx-6 hidden h-8 w-px bg-gold/30 sm:block" />}
            <div className="flex flex-col items-center gap-1.5">
              <div className="h-px w-4 bg-gold" />
              <span className="font-sans text-[11px] font-[600] uppercase tracking-[0.2em] text-kc-white">
                {text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
