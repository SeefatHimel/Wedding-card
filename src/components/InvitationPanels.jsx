import { Fragment, useEffect, useState } from 'react'

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
  const words = text.split(' ')
  let letterIndex = 0

  return (
    <span className="letter-reveal" aria-label={text}>
      {words.map((word, wordIndex) => {
        const letters = [...word].map((letter, index) => {
              const delay = letterIndex * 18
              letterIndex += 1
              return <span className="reveal-letter" aria-hidden="true" key={`${letter}-${index}`} style={{ '--letter-delay': `${delay}ms` }}>{letter}</span>
            })
        letterIndex += 1
        return (
          <Fragment key={`${word}-${wordIndex}`}>
            <span className="reveal-word">{letters}</span>
            {wordIndex < words.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
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
        <div className="opening-details">
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
        {section.text && <p className="panel__text">{section.text}</p>}
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
              <span className="image-strip__shimmer" aria-hidden="true" />
            </figure>
          ))}
          {galleryImages.length > 1 && (
            <span className="image-strip__hint" aria-hidden="true">Swipe for more</span>
          )}
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
          <h2 id={`${section.id}-title`}><LetterReveal text={section.title} /></h2>
          <div className="featured-couple" aria-label="Featured couple names">
          <p className="featured-couple__lead">{section.featuredLead}</p>
          <div className="featured-couple__names">
              <span className="featured-couple__name"><LetterReveal text={section.featuredNames[0]} /></span>
              <span className="featured-couple__amp" aria-label="and">
                ♡
              </span>
              <span className="featured-couple__name"><LetterReveal text={section.featuredNames[1]} /></span>
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

function DetailsPanel({ section, panelState }) {
  return (
    <section className={`panel panel--details ${panelState}`} id={section.id} aria-labelledby={`${section.id}-title`}>
      <div
        className="panel__image panel__image--details"
        style={{ backgroundImage: `linear-gradient(rgba(44, 8, 14, 0.12), rgba(44, 8, 14, 0.5)), url(${section.featureImage})` }}
      />
      <div className="panel__content panel__content--lifted">
        <p className="panel__label">{section.label}</p>
        <h2 id={`${section.id}-title`}><LetterReveal text={section.title} /></h2>
        <div className="detail-stack">
          {section.cards.map((card) => {
            const isVenueCard = card.heading === 'Venue'
            const CardTag = isVenueCard ? 'a' : 'article'

            return (
              <CardTag
                key={card.heading}
                className={`detail-card${isVenueCard ? ' detail-card--venue' : ''}`}
                href={isVenueCard ? section.venueMap : undefined}
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
                {isVenueCard ? (
                  <span className="detail-card__action">
                    Open in Google Maps
                    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                      <path d="M3 13 13 3M6 3h7v7" />
                    </svg>
                  </span>
                ) : null}
              </CardTag>
            )
          })}
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
      <DetailsPanel section={sections[3]} panelState={panelState(sections[3])} />
    </>
  )
}

export default InvitationPanels
