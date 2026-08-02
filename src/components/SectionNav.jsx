function SectionNav({ sections, activeSection }) {
  return (
    <nav className="section-nav" aria-label="Invitation sections">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={activeSection === section.id ? 'is-active' : ''}
          aria-label={section.label}
          aria-current={activeSection === section.id ? 'true' : undefined}
        />
      ))}
    </nav>
  )
}

export default SectionNav
