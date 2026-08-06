import { useEffect, useState } from 'react'
import InvitationPanels from './components/InvitationPanels'
import SectionNav from './components/SectionNav'
import { invitationSections, galleryImages } from './data/invitation'
import { useActiveSection } from './hooks/useActiveSection'

function App() {
  const activeSection = useActiveSection(invitationSections.map((section) => section.id))
  const [motionReady, setMotionReady] = useState(false)

  useEffect(() => {
    let isCancelled = false
    const openingImage = new Image()
    openingImage.src = invitationSections[0].heroImage

    const imageReady = openingImage.decode
      ? openingImage.decode().catch(() => {})
      : new Promise((resolve) => {
          openingImage.onload = resolve
          openingImage.onerror = resolve
        })
    const fontReady = document.fonts?.load('400 1em "Eline Novika"').catch(() => {}) ?? Promise.resolve()
    const fallback = new Promise((resolve) => window.setTimeout(resolve, 1200))

    Promise.race([Promise.all([imageReady, fontReady]), fallback]).then(() => {
      if (!isCancelled) requestAnimationFrame(() => setMotionReady(true))
    })

    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <div className={`experience ${motionReady ? 'motion-ready' : ''}`}>
      <div className="experience__aura experience__aura--left" />
      <div className="experience__aura experience__aura--right" />
      <div className="zari-weave" aria-hidden="true">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M-60 660C240 480 320 890 690 650S1130 260 1500 490" />
          <path d="M-80 250C220 510 460 90 770 330S1190 760 1520 470" />
        </svg>
      </div>
      <div className="zari-sparkles" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => <span key={index} />)}
      </div>

      <main className="device-frame">
        <div className="device-frame__shine" />
        <SectionNav sections={invitationSections} activeSection={activeSection} />

        <div className="invitation-shell">
          <InvitationPanels sections={invitationSections} galleryImages={galleryImages} activeSection={activeSection} />
        </div>
      </main>
    </div>
  )
}

export default App
