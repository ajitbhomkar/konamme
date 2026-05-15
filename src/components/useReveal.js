import { useEffect, useRef } from 'react'

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )
      els.forEach((el) => observer.observe(el))
      return () => observer.disconnect()
    } else {
      els.forEach((el) => el.classList.add('visible'))
    }
  })
}

export function useRevealRef() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('visible')
            observer.unobserve(el)
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    } else {
      el.classList.add('visible')
    }
  }, [])

  return ref
}
