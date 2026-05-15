import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import {
  siteConfig, introBand, about, services,
  programs, conditions, retreat, nearby, team,
} from './data'

// ── Scroll Reveal Hook ─────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'))
      return
    }
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

// ── Back to Top ────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 90,
        width: 44, height: 44, background: 'var(--forest)', color: 'var(--cream)',
        border: 'none', fontSize: '1.1rem', cursor: 'pointer',
        transition: 'background var(--transition)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--forest-mid)'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--forest)'}
    >↑</button>
  ) : null
}

// ── IntroBand ──────────────────────────────────────
function IntroBand() {
  return (
    <div style={{ background: 'var(--forest)', padding: '2.2rem 2rem' }}>
      <div style={{
        maxWidth: 'var(--max-w)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        textAlign: 'center',
      }}>
        {introBand.map((item, i) => (
          <div key={i} style={{
            padding: '0.7rem 1.2rem',
            borderRight: i < introBand.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--cream)', marginBottom: '0.2rem' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--earth-light)' }}>
              {item.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── About ──────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: '6rem 2rem', background: 'var(--cream-light)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="about-grid">
        {/* Images */}
        <div className="reveal" style={{ position: 'relative', paddingBottom: '2.5rem', paddingRight: '2.5rem' }}>
          <img
            src={about.image1}
            alt="Konamme Wellness retreat"
            loading="lazy"
            style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
          />
          <img
            src={about.image2}
            alt="Ayurvedic treatment"
            loading="lazy"
            style={{
              position: 'absolute', bottom: 0, right: 0,
              width: '55%', aspectRatio: '4/3', objectFit: 'cover',
              border: '6px solid var(--cream-light)',
              boxShadow: '0 8px 32px rgba(26,46,26,0.18)',
            }}
          />
        </div>

        {/* Text */}
        <div className="reveal reveal-delay-2">
          <span className="section-label">Who We Are</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.3rem' }}>
            {about.heading.split('\n').map((line, i) => (
              <span key={i}>{i > 0 ? <><br /><em style={{ color: 'var(--forest-mid)' }}>{line}</em></> : line}</span>
            ))}
          </h2>
          <div className="divider" />
          {about.body.split('\n\n').map((para, i) => (
            <p key={i} style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1rem' }}>{para}</p>
          ))}
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontStyle: 'italic' }}>{about.founder}</p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginTop: '2.8rem' }}>
            {about.stats.map((s, i) => (
              <div key={i} style={{ background: 'var(--forest)', padding: '1.4rem', color: 'var(--cream)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, display: 'block', lineHeight: 1, marginBottom: '0.35rem' }}>{s.num}</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--earth-light)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}

// ── Services ───────────────────────────────────────
function Services() {
  return (
    <section id="services" style={{ padding: '6rem 2rem', background: 'var(--dark)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <span className="section-label" style={{ color: 'var(--earth-light)' }}>What We Offer</span>
            <h2 style={{ color: 'var(--cream)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Our Healing Disciplines</h2>
          </div>
          <p style={{ color: 'rgba(245,240,232,0.6)', maxWidth: '38ch', fontSize: '0.95rem', lineHeight: 1.8 }}>
            Under one roof — a complete spectrum of ancient and modern healing practices to restore your natural balance.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }} className="services-grid">
          {services.map((svc, i) => (
            <ServiceCard key={i} svc={svc} delay={Math.min(i % 3 + 1, 4)} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px)  { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

function ServiceCard({ svc, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`reveal reveal-delay-${delay}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#203520' : 'var(--dark)',
        padding: '2.8rem 2.2rem',
        transition: 'background var(--transition)',
      }}
    >
      <div style={{
        width: 46, height: 46,
        border: '1px solid rgba(201,168,76,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.6rem', fontSize: '1.3rem',
      }}>
        {svc.icon}
      </div>
      <h3 style={{ color: 'var(--cream)', fontSize: '1.25rem', marginBottom: '0.7rem' }}>{svc.title}</h3>
      <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.52)', margin: 0 }}>{svc.desc}</p>
    </div>
  )
}

// ── Programs ───────────────────────────────────────
function Programs() {
  return (
    <section id="programs" style={{ padding: '6rem 2rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <span className="section-label">Tailored for You</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Wellness Programmes</h2>
          <div className="divider" />
          <p style={{ color: 'var(--text-muted)', maxWidth: '52ch', lineHeight: 1.85 }}>
            Each programme is holistically designed and individually customised to suit your body type, dosha, and health goals — guided by our experienced team of practitioners.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
          {programs.map((p, i) => (
            <ProgramCard key={i} prog={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ prog }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--cream-light)',
        borderLeft: '3px solid var(--forest)',
        padding: '2.2rem 2rem',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(26,46,26,0.1)' : 'none',
        transition: 'transform var(--transition), box-shadow var(--transition)',
      }}
    >
      <h3 style={{ fontSize: '1.3rem', color: 'var(--dark)', marginBottom: '0.8rem' }}>{prog.title}</h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.85, margin: 0 }}>{prog.desc}</p>
    </div>
  )
}

// ── Conditions ─────────────────────────────────────
function Conditions() {
  return (
    <section id="conditions" style={{ padding: '6rem 2rem', background: 'var(--cream-light)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <span className="section-label">Illness to Wellness</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Conditions We Treat</h2>
          <div className="divider" />
          <p style={{ color: 'var(--text-muted)', maxWidth: '54ch', lineHeight: 1.85 }}>
            Our integrated approach addresses a wide spectrum of chronic and lifestyle conditions — combining Ayurvedic medicine, naturopathy, diet therapy and modern clinical support.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.8rem' }}>
          {conditions.map((c, i) => (
            <ConditionItem key={i} label={c} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ConditionItem({ label }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.8rem',
        padding: '0.85rem 1.1rem',
        background: hovered ? '#f0f6f0' : 'var(--white)',
        border: `1px solid ${hovered ? 'var(--forest-light)' : 'rgba(45,74,45,0.1)'}`,
        fontSize: '0.85rem', color: 'var(--text)',
        transition: 'all var(--transition)', cursor: 'default',
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--forest-light)', flexShrink: 0 }} />
      {label}
    </div>
  )
}

// ── Retreat ────────────────────────────────────────
function Retreat() {
  return (
    <section id="retreat" style={{ background: 'var(--forest)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 580 }} className="retreat-grid">
        <div
          style={{
            backgroundImage: `url('${retreat.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 400,
          }}
          role="img"
          aria-label="Konamme Wellness retreat accommodation"
        />
        <div style={{ padding: '5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'var(--cream)' }} className="retreat-content">
          <span className="section-label" style={{ color: 'var(--earth-light)' }}>Stay & Heal</span>
          <h2 style={{ color: 'var(--cream)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>Retreat Packages</h2>
          <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.95rem', lineHeight: 1.8 }}>
            We have selected a Traditional Heritage Palace Resort in South India for your Wellness Retreat — offering a signature blend of treatments, organic food, and nature immersion.
          </p>

          <ul style={{ margin: '2rem 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {retreat.includes.map((item, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                padding: '0.75rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.88rem', color: 'rgba(245,240,232,0.8)',
              }}>
                <span style={{ color: 'var(--gold)', flexShrink: 0 }}>—</span>
                {item}
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              const el = document.querySelector('#contact')
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
            }}
            style={{
              alignSelf: 'flex-start', fontFamily: 'var(--font-body)',
              fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.16em',
              textTransform: 'uppercase', padding: '0.9rem 2.4rem',
              background: 'var(--gold)', color: 'var(--dark)',
              border: 'none', cursor: 'pointer',
              transition: 'background var(--transition), transform var(--transition)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-dark)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Enquire About Packages
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .retreat-grid { grid-template-columns: 1fr !important; }
          .retreat-content { padding: 3rem 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}

// ── Nearby ─────────────────────────────────────────
function Nearby() {
  return (
    <section id="nearby" style={{ padding: '6rem 2rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <span className="section-label">Explore the Region</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Nearby Attractions</h2>
          <div className="divider" />
          <p style={{ color: 'var(--text-muted)', maxWidth: '50ch', lineHeight: 1.85 }}>
            Kasaragod is Kerala's northernmost gem — rich in forts, temples, trekking trails, beaches and lush forest walks.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {nearby.map((place, i) => (
            <NearbyCard key={i} place={place} />
          ))}
        </div>
      </div>
    </section>
  )
}

function NearbyCard({ place }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--cream-light)', padding: '1.8rem',
        borderBottom: hovered ? '2px solid var(--gold)' : '2px solid transparent',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all var(--transition)',
      }}
    >
      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 400, color: 'var(--dark)', marginBottom: '0.5rem' }}>{place.name}</h4>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>{place.desc}</p>
    </div>
  )
}

// ── Team ───────────────────────────────────────────
function Team() {
  return (
    <section id="team" style={{ padding: '6rem 2rem', background: 'var(--dark)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-label" style={{ color: 'var(--earth-light)' }}>Our Experts</span>
          <h2 style={{ color: 'var(--cream)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>The Healing Team</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
          {team.map((role, i) => (
            <TeamItem key={i} role={role} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamItem({ role }) {
  const [hovered, setHovered] = useState(false)
  const initial = role.charAt(0).toUpperCase()
  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: 'center', padding: '2rem 1rem',
        background: hovered ? '#2a4a2a' : '#203520',
        transition: 'background var(--transition)',
      }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'var(--forest-mid)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--cream)',
        margin: '0 auto 1rem',
      }}>
        {initial}
      </div>
      <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 500, color: 'var(--cream)', marginBottom: '0.25rem', letterSpacing: '0.04em' }}>{role}</h4>
      <span style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--earth-light)' }}>Specialist</span>
    </div>
  )
}

// ── Contact ────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('sending')
    // Simulate submission — replace with real API call (EmailJS, Formspree, etc.)
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', phone: '', interest: '', message: '' })
    }, 1200)
  }

  const inputStyle = {
    width: '100%', padding: '0.8rem 1rem',
    background: 'var(--cream-light)', border: '1px solid rgba(45,74,45,0.15)',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300,
    color: 'var(--text)', outline: 'none',
    transition: 'border-color var(--transition)',
  }

  const labelStyle = {
    display: 'block', fontSize: '0.68rem', fontWeight: 500,
    letterSpacing: '0.16em', textTransform: 'uppercase',
    color: 'var(--text-muted)', marginBottom: '0.4rem',
  }

  return (
    <section id="contact" style={{ padding: '6rem 2rem', background: 'var(--cream-light)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', alignItems: 'start' }} className="contact-grid">

        {/* Info */}
        <div className="reveal">
          <span className="section-label">Get in Touch</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '0.8rem' }}>Book Your Stay<br />or Consultation</h2>
          <div className="divider" />
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2.5rem' }}>
            Reach out to us to book a retreat, enquire about wellness programmes, or arrange a medical consultation with our doctors.
          </p>

          {[
            { icon: '📞', label: 'Phone', value: `${siteConfig.phone1} · ${siteConfig.phone2}` },
            { icon: '💬', label: 'WhatsApp', value: siteConfig.whatsapp, href: `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}` },
            { icon: '✉',  label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
            { icon: '🩺', label: 'Medical Enquiry', value: `${siteConfig.doctorName} — ${siteConfig.doctorPhone}` },
            { icon: '📍', label: 'Address', value: `${siteConfig.address}, ${siteConfig.city}`, href: siteConfig.mapUrl },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.9rem 0', borderBottom: '1px solid rgba(45,74,45,0.1)', ...(i === 0 ? { borderTop: '1px solid rgba(45,74,45,0.1)' } : {}) }}>
              <div style={{ width: 36, height: 36, background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.9rem', color: 'var(--cream)' }}>{item.icon}</div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--forest-light)', marginBottom: '0.15rem' }}>{item.label}</strong>
                {item.href
                  ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener" style={{ fontSize: '0.9rem', color: 'var(--text)', textDecoration: 'none' }}>{item.value}</a>
                  : <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{item.value}</span>
                }
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="reveal reveal-delay-2" style={{ background: 'var(--white)', padding: '3rem', boxShadow: '0 2px 24px rgba(26,46,26,0.06)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 300, marginBottom: '0.4rem' }}>Send Us a Message</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>We'll get back to you within 24 hours.</p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={labelStyle} htmlFor="name">Full Name *</label>
                <input id="name" name="name" type="text" required placeholder="Your name" value={form.name} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" placeholder="+91 xxxxxxxxxx" value={form.phone} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle} htmlFor="email">Email Address *</label>
              <input id="email" name="email" type="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle} htmlFor="interest">I'm interested in</label>
              <select id="interest" name="interest" value={form.interest} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                <option value="">— Select a service —</option>
                {['Naturopathy & Yoga', 'Ayurveda & Panchakarma', 'Mental Wellness', 'Holistic Nutrition', 'Physiotherapy', 'Retreat Package', 'Medical Consultation', 'Wellness Tourism'].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle} htmlFor="message">Message</label>
              <textarea
                id="message" name="message" rows={4}
                placeholder="Tell us about your health goals or any questions…"
                value={form.message} onChange={handleChange}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                width: '100%', fontFamily: 'var(--font-body)',
                fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.16em',
                textTransform: 'uppercase', padding: '0.9rem 2rem',
                background: status === 'sending' ? 'var(--forest-light)' : 'var(--forest)',
                color: 'var(--cream)', border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer',
                transition: 'background var(--transition)',
              }}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div style={{ marginTop: '1rem', padding: '0.8rem 1rem', background: '#f0f6f0', color: 'var(--forest)', border: '1px solid var(--forest-light)', fontSize: '0.85rem' }}>
                ✓ Thank you! We'll be in touch within 24 hours.
              </div>
            )}
            {status === 'error' && (
              <div style={{ marginTop: '1rem', padding: '0.8rem 1rem', background: '#fef2f2', color: '#7f1d1d', border: '1px solid #fca5a5', fontSize: '0.85rem' }}>
                Oops! Something went wrong. Please call us directly.
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────
function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <>
      {/* CTA Band */}
      <div style={{ background: 'var(--gold)', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: 'var(--dark)', marginBottom: '0.5rem' }}>
          Begin Your Wellness Journey
        </h2>
        <p style={{ color: 'rgba(26,46,26,0.7)', marginBottom: '2rem' }}>Discover the healing power of nature, Ayurveda, and ancient tradition.</p>
        <button
          onClick={() => scrollTo('#contact')}
          style={{
            fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 500,
            letterSpacing: '0.16em', textTransform: 'uppercase', padding: '0.9rem 2.4rem',
            background: 'var(--dark)', color: 'var(--cream)', border: 'none', cursor: 'pointer',
            transition: 'background var(--transition)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--forest)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--dark)'}
        >
          Book an Appointment
        </button>
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--dark)', padding: '4rem 2rem 2rem' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="footer-grid">
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--cream)', marginBottom: '0.3rem' }}>{siteConfig.name}</h3>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--earth-light)', marginBottom: '1.2rem' }}>{siteConfig.tagline}</p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.85 }}>
              A tropical eco-heritage sanctuary for holistic healing — blending ancient Ayurveda, Naturopathy, Yoga and traditional therapies in the heart of Kerala's Malabar rainforest.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--earth-light)', marginBottom: '1.2rem' }}>Services</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Naturopathy & Yoga', 'Ayurveda', 'Physiotherapy', 'Mental Wellness', 'Diet Therapy', 'Wellness Tourism'].map(s => (
                <li key={s}><a onClick={() => scrollTo('#services')} style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.5)', cursor: 'pointer', transition: 'color var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--cream)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.5)'}>{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--earth-light)', marginBottom: '1.2rem' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[['About Us', '#about'], ['Programs', '#programs'], ['Retreat', '#retreat'], ['Conditions', '#conditions'], ['Contact', '#contact']].map(([label, href]) => (
                <li key={href}><a onClick={() => scrollTo(href)} style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.5)', cursor: 'pointer', transition: 'color var(--transition)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--cream)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.5)'}>{label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--earth-light)', marginBottom: '1.2rem' }}>Contact</h4>
            <address style={{ fontStyle: 'normal', fontSize: '0.82rem', color: 'rgba(245,240,232,0.5)', lineHeight: 2 }}>
              <div>📍 {siteConfig.address}</div>
              <div>{siteConfig.city}</div>
              <div>📞 {siteConfig.phone1}</div>
              <div>💬 {siteConfig.whatsapp}</div>
              <div>✉ <a href={`mailto:${siteConfig.email}`} style={{ color: 'rgba(245,240,232,0.5)' }}>{siteConfig.email}</a></div>
            </address>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '1.8rem auto 0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.3)' }}>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.3)' }}>Narayanamangala, Koipady, Kumble · Kasaragod, Kerala</p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px)  { .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }
      `}</style>
    </>
  )
}

// ── App ────────────────────────────────────────────
export default function App() {
  useReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IntroBand />
        <About />
        <Services />
        <Programs />
        <Conditions />
        <Retreat />
        <Nearby />
        <Team />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
