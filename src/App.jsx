import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import {
  siteConfig, introBand, about, services,
  programs, conditions, retreat, gallery, nearby, team,
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
  const [imgHovered, setImgHovered] = useState(false)
  return (
    <section id="about" style={{ padding: '6rem 2rem', background: 'var(--cream-light)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="about-grid">
        {/* Image */}
        <div className="reveal" style={{ position: 'relative', paddingTop: '2rem', paddingLeft: '2rem' }}>
          {/* Diagonal forest green accent */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'var(--forest)',
            clipPath: 'polygon(0 0, 62% 0, 100% 100%, 0 100%)',
            zIndex: 0,
            transition: 'opacity 0.4s ease',
            opacity: imgHovered ? 0.75 : 1,
          }} />

          {/* Gold corner bracket — top left */}
          <div style={{
            position: 'absolute', top: '0.4rem', left: '0.4rem',
            width: 36, height: 36,
            borderTop: '2px solid var(--gold)',
            borderLeft: '2px solid var(--gold)',
            zIndex: 3,
            opacity: imgHovered ? 1 : 0.35,
            transform: imgHovered ? 'scale(1.15)' : 'scale(1)',
            transition: 'all 0.4s ease',
          }} />

          {/* Image wrapper — overflow hidden for zoom */}
          <div
            style={{ position: 'relative', zIndex: 1, overflow: 'hidden', cursor: 'default' }}
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
          >
            <img
              src={about.image1}
              alt="Konamme Wellness retreat"
              loading="lazy"
              style={{
                width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block',
                transform: imgHovered ? 'scale(1.07)' : 'scale(1)',
                transition: 'transform 0.7s ease',
              }}
            />

            {/* Hover overlay — quote slides up */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(20,40,20,0.93) 0%, rgba(20,40,20,0.55) 45%, transparent 72%)',
              opacity: imgHovered ? 1 : 0,
              transition: 'opacity 0.45s ease',
              display: 'flex', alignItems: 'flex-end',
              padding: '2rem',
              pointerEvents: 'none',
            }}>
              <div style={{
                transform: imgHovered ? 'translateY(0)' : 'translateY(18px)',
                transition: 'transform 0.5s ease',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.15rem',
                  color: 'var(--cream)', lineHeight: 1.65, fontStyle: 'italic',
                  marginBottom: '0.75rem',
                }}>
                  "Where ancient wisdom<br />meets modern healing"
                </p>
                <div style={{ width: 40, height: 2, background: 'var(--gold)' }} />
              </div>
            </div>
          </div>

          {/* Floating location badge */}
          <div style={{
            position: 'absolute', bottom: '1.8rem', right: '-1rem',
            background: 'var(--cream-light)',
            color: 'var(--forest)',
            padding: '0.65rem 1.3rem',
            fontSize: '0.63rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 600,
            zIndex: 2,
            boxShadow: imgHovered ? '0 8px 32px rgba(0,0,0,0.2)' : '0 4px 24px rgba(0,0,0,0.12)',
            borderLeft: '3px solid var(--gold)',
            transform: imgHovered ? 'translateX(-5px)' : 'translateX(0)',
            transition: 'all 0.35s ease',
          }}>
            Kasaragod · Kerala
          </div>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem', marginTop: '2.8rem' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {programs.map((p, i) => (
            <ProgramCard key={i} prog={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ prog, index }) {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#fff' : 'var(--cream-light)',
        padding: '0',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hovered ? '0 20px 48px rgba(26,46,26,0.13)' : '0 2px 12px rgba(26,46,26,0.05)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s ease',
      }}
    >
      {/* Gold top bar */}
      <div style={{
        height: 4,
        background: hovered
          ? 'linear-gradient(to right, var(--forest), var(--gold))'
          : 'linear-gradient(to right, var(--gold), var(--earth-light))',
        transition: 'background 0.35s ease',
      }} />

      <div style={{ padding: '1.8rem 1.8rem 1.6rem' }}>
        {/* Faded number */}
        <span style={{
          position: 'absolute', top: '1rem', right: '1.4rem',
          fontFamily: 'var(--font-display)', fontSize: '3.8rem', fontWeight: 300,
          color: 'rgba(45,74,45,0.07)', lineHeight: 1, userSelect: 'none',
          pointerEvents: 'none',
        }}>{num}</span>

        {/* Title */}
        <h3 style={{
          fontSize: '1.12rem', fontFamily: 'var(--font-display)',
          fontWeight: 500, color: 'var(--dark)',
          marginBottom: '1rem', lineHeight: 1.3,
          paddingRight: '2rem',
        }}>{prog.title}</h3>

        {/* Divider */}
        <div style={{ width: 32, height: 2, background: 'var(--gold)', marginBottom: '1rem' }} />

        {/* Description — clamped or expanded */}
        <p style={{
          fontSize: '0.87rem',
          color: 'var(--text-muted)',
          lineHeight: 1.82,
          fontStyle: 'italic',
          margin: 0,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: expanded ? 'unset' : 4,
          overflow: expanded ? 'visible' : 'hidden',
        }}>{prog.desc}</p>

        {/* Read more / less */}
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            marginTop: '0.9rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem', fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--forest-light)',
            background: 'none', border: 'none',
            cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            transition: 'color var(--transition)',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--forest)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--forest-light)'}
        >
          {expanded ? '↑ Read less' : 'Read more →'}
        </button>
      </div>
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
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', marginTop: '0.8rem', fontStyle: 'italic' }}>
            A multidisciplinary team of healers, doctors & specialists
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}>
          {team.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false)
  const initials = member.name.split(' ').filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('')

  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '3/4',
        cursor: 'default',
        background: '#1a2e1a',
      }}
    >
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
            display: 'block',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
      ) : (
        <div style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(135deg, #1e3d1e 0%, #2d5a2d 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 300,
            color: 'rgba(196,168,130,0.4)',
          }}>{initials}</span>
        </div>
      )}

      {/* Always-visible bottom strip */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(20,40,20,0.97) 0%, rgba(20,40,20,0.85) 60%, transparent 100%)'
          : 'linear-gradient(to top, rgba(10,24,10,0.88) 0%, rgba(10,24,10,0.4) 60%, transparent 100%)',
        padding: hovered ? '2.2rem 1.4rem 1.4rem' : '1.6rem 1.4rem 1.2rem',
        transition: 'all 0.35s ease',
      }}>
        <h4 style={{
          fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: '1.05rem', color: '#fff', marginBottom: '0.3rem', lineHeight: 1.2,
        }}>{member.name}</h4>
        <span style={{
          fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--earth-light)',
        }}>{member.role}</span>
      </div>

      {/* Gold top accent on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3,
        background: 'linear-gradient(to right, var(--forest), var(--gold))',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s ease',
      }} />
    </div>
  )
}

// ── Contact ────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(
        `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            interest: form.interest,
            message: form.message,
            _subject: `New enquiry from ${form.name} — Konamme Wellness`,
            _replyto: form.email,
            _cc: 'ajitbhomkar@gmail.com',
          }),
        }
      )
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', interest: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
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
            { icon: '📞', label: 'Phone', value: siteConfig.phone2 ? `${siteConfig.phone1} · ${siteConfig.phone2}` : siteConfig.phone1 },
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

// ── Gallery ────────────────────────────────────────
function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" style={{ padding: '6rem 2rem', background: 'var(--dark)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <span className="section-label" style={{ color: 'var(--earth-light)' }}>Life at Konamme</span>
          <h2 style={{ color: 'var(--cream)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Wellness in Every Moment</h2>
          <div className="divider" />
          <p style={{ color: 'rgba(245,240,232,0.6)', maxWidth: '50ch', lineHeight: 1.85 }}>
            From ancient herbal preparations to nourishing meals and therapeutic rituals — a glimpse into the healing world of Konamme Wellness.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '220px',
          gap: '6px',
        }} className="gallery-grid">
          {gallery.map((img, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${Math.min(i % 4 + 1, 4)}`}
              onClick={() => setActive(img)}
              style={{
                gridColumn: i === 0 || i === 4 ? 'span 2' : 'span 1',
                gridRow: i === 0 || i === 4 ? 'span 2' : 'span 1',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  display: 'block',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(26,46,26,0.5) 0%, transparent 60%)',
                pointerEvents: 'none',
              }} />
              <span style={{
                position: 'absolute', bottom: '0.8rem', left: '0.9rem',
                fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.75)', pointerEvents: 'none',
              }}>{img.alt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <img
            src={active.src}
            alt={active.alt}
            style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain' }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setActive(null)}
            aria-label="Close"
            style={{
              position: 'fixed', top: '1.5rem', right: '1.5rem',
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: '#fff', fontSize: '1.2rem', cursor: 'pointer',
            }}
          >✕</button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 500px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
          .gallery-grid > div { grid-column: span 1 !important; grid-row: span 1 !important; }
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
        <Gallery />
        <Nearby />
        <Team />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
