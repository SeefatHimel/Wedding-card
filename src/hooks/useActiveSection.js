import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const items = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!items.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-10% 0px -25% 0px', threshold: 0.45 },
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}
