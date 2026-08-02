import RsvpForm from './RsvpForm'

function OpeningPanel({ section }) {
  return (
    <section className="panel panel--opening" id={section.id} aria-labelledby={`${section.id}-title`}>
      <div
        className="panel__image panel__image--hero"
        style={{ backgroundImage: `linear-gradient(rgba(44, 8, 14, 0.12), rgba(44, 8, 14, 0.12)), url(${section.heroImage})` }}
      />
      <div className="panel__overlay" />
      <div className="panel__content panel__content--opening">
        <div className="monogram" aria-hidden="true">
          {section.monogram}
        </div>
        <div className="title-stack">
          <h1 id={`${section.id}-title`}>{section.title[0]}</h1>
          <span className="title-stack__amp" aria-hidden="true">
            {section.title[1]}
          </span>
          <p>{section.title[2]}</p>
        </div>
        <p className="meta-line">
          <time dateTime={section.dateTime}>{section.date}</time> • {section.place}
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

function StoryPanel({ section, galleryImages }) {
  return (
    <section className="panel panel--story" id={section.id} aria-labelledby={`${section.id}-title`}>
      <div className="panel__content">
        <p className="panel__label">{section.label}</p>
        <h2 id={`${section.id}-title`}>{section.title}</h2>
        <p className="panel__text">{section.text}</p>
        <div className="story-quote">
          <span className="story-quote__mark" aria-hidden="true">
            30:21
          </span>
          {section.accent}
        </div>
        <div className="image-strip">
          {galleryImages.map((image, index) => (
            <figure className={`image-strip__card image-strip__card--${index + 1}`} key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function EventsPanel({ section }) {
  return (
    <section className="panel panel--events" id={section.id} aria-labelledby={`${section.id}-title`}>
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

function DetailsPanel({ section, rsvpSection }) {
  return (
    <section className="panel panel--details" id={section.id} aria-labelledby={`${section.id}-title`}>
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

function RsvpPanel({ section }) {
  return (
    <section className="panel panel--rsvp" id={section.id} aria-labelledby={`${section.id}-title`}>
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

function InvitationPanels({ sections, galleryImages }) {
  return (
    <>
      <OpeningPanel section={sections[0]} />
      <StoryPanel section={sections[1]} galleryImages={galleryImages} />
      <EventsPanel section={sections[2]} />
      <DetailsPanel section={sections[3]} rsvpSection={sections[4]} />
      <RsvpPanel section={sections[4]} />
    </>
  )
}

export default InvitationPanels
