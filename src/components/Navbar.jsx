import { useState, useEffect } from 'react'
import { siteConfig } from '../data'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Programs', href: '#programs' },
  { label: 'Retreat',  href: '#retreat' },
  { label: 'Team',     href: '#team' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const offset = 80
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      {/* Brand */}
      <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className={styles.brand}>
        <span className={styles.brandName}>{siteConfig.name}</span>
        <span className={styles.brandSub}>{siteConfig.tagline}</span>
      </a>

      {/* Desktop Nav */}
      <nav className={styles.nav} aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className={styles.navLink}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a
        href="#contact"
        onClick={(e) => handleNavClick(e, '#contact')}
        className={styles.cta}
      >
        Book Now
      </a>

      {/* Hamburger */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={styles.mobileLink}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={styles.mobileCta}
          >
            Book an Appointment
          </a>
        </div>
      )}
    </header>
  )
}
