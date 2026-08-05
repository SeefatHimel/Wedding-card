function SectionNav({ sections, activeSection }) {
  return (
    <nav className="section-nav" aria-label="Invitation sections">
      {sections.map((section, index) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={activeSection === section.id ? 'is-active' : ''}
          aria-label={section.label}
          aria-current={activeSection === section.id ? 'true' : undefined}
        >
          <span className="section-nav__number">{String(index + 1).padStart(2, '0')}</span>
          <span className="section-nav__label">{section.label}</span>
        </a>
      ))}
    </nav>
  )
}

export default SectionNav
