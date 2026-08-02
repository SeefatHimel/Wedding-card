import { useEffect, useState } from 'react'
import InvitationPanels from './components/InvitationPanels'
import SectionNav from './components/SectionNav'
import { invitationSections, galleryImages } from './data/invitation'
import { useActiveSection } from './hooks/useActiveSection'

const DEFAULT_API_URL = 'http://127.0.0.1:8000/api/rsvps/'
const BACKEND_PING_INTERVAL_MS = 5 * 60 * 1000

function App() {
  const activeSection = useActiveSection(invitationSections.map((section) => section.id))
  const apiUrl = import.meta.env.VITE_RSVP_API_URL || DEFAULT_API_URL
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

  useEffect(() => {
    let intervalId
    let isDisposed = false

    async function pingBackend() {
      try {
        await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        })
      } catch {
        // Keep the wake-up check silent so it never distracts from the invitation experience.
      }
    }

    function startHeartbeat() {
      if (intervalId || document.visibilityState !== 'visible') {
        return
      }

      pingBackend()
      intervalId = window.setInterval(pingBackend, BACKEND_PING_INTERVAL_MS)
    }

    function stopHeartbeat() {
      if (!intervalId) {
        return
      }

      window.clearInterval(intervalId)
      intervalId = undefined
    }

    function syncHeartbeat() {
      if (isDisposed) {
        return
      }

      if (document.visibilityState === 'visible') {
        startHeartbeat()
      } else {
        stopHeartbeat()
      }
    }

    syncHeartbeat()
    document.addEventListener('visibilitychange', syncHeartbeat)
    window.addEventListener('focus', syncHeartbeat)
    window.addEventListener('blur', stopHeartbeat)

    return () => {
      isDisposed = true
      stopHeartbeat()
      document.removeEventListener('visibilitychange', syncHeartbeat)
      window.removeEventListener('focus', syncHeartbeat)
      window.removeEventListener('blur', stopHeartbeat)
    }
  }, [apiUrl])

  return (
    <div className={`experience ${motionReady ? 'motion-ready' : ''}`}>
      <div className="experience__aura experience__aura--left" />
      <div className="experience__aura experience__aura--right" />

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
