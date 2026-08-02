import { useEffect, useState } from 'react'
import RsvpForm from './RsvpForm'

function AnimatedName({ name, delay }) {
  return (
    <span className="title-stack__name" aria-label={name} style={{ '--name-delay': `${delay}ms` }}>
      {[...name].map((letter, index) => (
        <span className="title-stack__letter" aria-hidden="true" key={`${letter}-${index}`} style={{ '--letter-index': index }}>{letter}</span>
      ))}
    </span>
  )
}

function LetterReveal({ text }) {
  return (
    <span className="blessing-letter-reveal" aria-label={text}>
      {[...text].map((letter, index) => (
        <span className="blessing-letter" aria-hidden="true" key={`${letter}-${index}`} style={{ '--letter-delay': `${index * 18}ms` }}>
          {letter === ' ' ? '\u00a0' : letter}
        </span>
      ))}
    </span>
  )
}

function OpeningPanel({ section, panelState }) {
  return (
    <section className={`panel panel--opening ${panelState}`} id={section.id} aria-labelledby={`${section.id}-title`}>
      <div
        className="panel__image panel__image--hero"
        style={{ backgroundImage: `linear-gradient(rgba(44, 8, 14, 0.12), rgba(44, 8, 14, 0.12)), url(${section.heroImage})` }}
      />
      <div className="panel__overlay" />
      <div className="panel__content panel__content--opening">
        <div className="title-stack">
          <h1 id={`${section.id}-title`}><AnimatedName name={section.title[0]} delay={120} /></h1>
          <span className="title-stack__amp" aria-hidden="true">
            {section.title[1]}
          </span>
          <p><AnimatedName name={section.title[2]} delay={550} /></p>
        </div>
        <p className="meta-line">
          <time dateTime={section.dateTime}>{section.date}</time>
          <span className="meta-line__venue">{section.place}</span>
        </p>
        <div className="pill-row" aria-label="Invitation tags">
          {section.tags.map((tag) => (
            <span className="glass-pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <p className="swipe-hint">{section.note}</p>
      </div>
    </section>
  )
}

function StoryPanel({ section, galleryImages, panelState }) {
  return (
    <section className={`panel panel--story ${panelState}`} id={section.id} aria-labelledby={`${section.id}-title`}>
      <div className="panel__content">
        <p className="panel__label">{section.label}</p>
        <h2 id={`${section.id}-title`}><LetterReveal text={section.title} /></h2>
        <p className="panel__text">{section.text}</p>
        <div className="story-quote">
          <span className="story-quote__mark" aria-hidden="true">
            30:21
          </span>
          <span className="story-quote__text">{section.accent}</span>
        </div>
        <div className="image-strip" role="region" aria-label="Wedding photo gallery">
          {galleryImages.map((image, index) => (
            <figure className={`image-strip__card image-strip__card--${index + 1}`} key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
          <span className="image-strip__hint" aria-hidden="true">Swipe for more</span>
        </div>
      </div>
    </section>
  )
}

function EventsPanel({ section, panelState }) {
  return (
    <section className={`panel panel--events ${panelState}`} id={section.id} aria-labelledby={`${section.id}-title`}>
      <div className="panel__content">
        <div className="events-copy">
          <p className="panel__label">{section.label}</p>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          <div className="featured-couple" aria-label="Featured couple names">
            <p className="featured-couple__lead">{section.featuredLead}</p>
            <div className="featured-couple__names">
              <span>{section.featuredNames[0]}</span>
              <span className="featured-couple__amp" aria-label="and">
                ♡
              </span>
              <span>{section.featuredNames[1]}</span>
            </div>
          </div>
        </div>
        <div className="schedule-list">
          {section.schedule.map(([name, time]) => (
            <article key={name} className="schedule-item">
              <div>
                <h3>{name}</h3>
                <p>{time}</p>
              </div>
              <span className="schedule-item__dot" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DetailsPanel({ section, rsvpSection, panelState }) {
  return (
    <section className={`panel panel--details ${panelState}`} id={section.id} aria-labelledby={`${section.id}-title`}>
      <div
        className="panel__image panel__image--details"
        style={{ backgroundImage: `linear-gradient(rgba(44, 8, 14, 0.12), rgba(44, 8, 14, 0.5)), url(${section.featureImage})` }}
      />
      <div className="panel__content panel__content--lifted">
        <p className="panel__label">{section.label}</p>
        <h2 id={`${section.id}-title`}>{section.title}</h2>
        <div className="detail-stack">
          {section.cards.map((card) => {
            const isVenueCard = card.heading === 'Venue'
            const CardTag = isVenueCard ? 'a' : 'article'

            return (
              <CardTag
                key={card.heading}
                className={`detail-card${isVenueCard ? ' detail-card--venue' : ''}`}
                href={isVenueCard ? rsvpSection.venueMap : undefined}
                target={isVenueCard ? '_blank' : undefined}
                rel={isVenueCard ? 'noreferrer' : undefined}
                aria-label={isVenueCard ? 'Open venue location in Google Maps' : undefined}
              >
                <p>{card.heading}</p>
                <h3>
                  {card.body.split('\n').map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h3>
              </CardTag>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function RsvpPanel({ section, panelState }) {
  return (
    <section className={`panel panel--rsvp ${panelState}`} id={section.id} aria-labelledby={`${section.id}-title`}>
      <div className="panel__content panel__content--rsvp-compact">
        <div className="rsvp-copy">
          <p className="panel__label">{section.label}</p>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          <p className="panel__text">{section.text}</p>
          <div className="contact-list" aria-label="RSVP contact numbers">
            {section.contacts.map((contact) => (
              <a key={contact} href={`tel:${contact.replace(/-/g, '')}`} className="contact-chip">
                {contact}
              </a>
            ))}
          </div>
        </div>
        <div className="rsvp-form-shell">
          <RsvpForm />
        </div>
      </div>
    </section>
  )
}

function InvitationPanels({ sections, galleryImages, activeSection }) {
  const [enteredSections, setEnteredSections] = useState(() => new Set())

  useEffect(() => {
    if (!activeSection) return
    setEnteredSections((current) => {
      if (current.has(activeSection)) return current
      return new Set(current).add(activeSection)
    })
  }, [activeSection])

  const panelState = (section) => [
    activeSection === section.id ? 'is-active' : '',
    enteredSections.has(section.id) ? 'has-entered' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <OpeningPanel section={sections[0]} panelState={panelState(sections[0])} />
      <StoryPanel section={sections[1]} galleryImages={galleryImages} panelState={panelState(sections[1])} />
      <EventsPanel section={sections[2]} panelState={panelState(sections[2])} />
      <DetailsPanel section={sections[3]} rsvpSection={sections[4]} panelState={panelState(sections[3])} />
      <RsvpPanel section={sections[4]} panelState={panelState(sections[4])} />
    </>
  )
}

export default InvitationPanels
