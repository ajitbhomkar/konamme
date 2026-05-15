import { hero } from '../data'
import styles from './Hero.module.css'

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className={styles.hero}>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url('${hero.bgImage}')` }}
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1 className={styles.title}>
          {hero.titleLine1}<br />
          <em className={styles.titleItalic}>{hero.titleLine2}</em>
        </h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>

        <div className={styles.actions}>
          <button
            className={styles.btnPrimary}
            onClick={() => scrollTo(hero.btn1Url)}
          >
            {hero.btn1Text}
          </button>
          <button
            className={styles.btnOutline}
            onClick={() => scrollTo(hero.btn2Url)}
          >
            {hero.btn2Text}
          </button>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </div>
    </section>
  )
}
