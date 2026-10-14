import { useEffect, useRef } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4'

const FADE_SECONDS = 0.5
const RESTART_DELAY_MS = 100

/**
 * Fullscreen background video with a custom seamless loop:
 * - requestAnimationFrame continuously monitors currentTime / duration
 * - Fades in over 0.5s at the start (opacity 0 → 1)
 * - Fades out over 0.5s before the end (opacity 1 → 0)
 * - On `ended`: opacity 0, wait 100ms, reset currentTime = 0, play() again
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let rafId = 0
    let restartTimer: ReturnType<typeof setTimeout> | undefined

    const updateOpacity = () => {
      const { currentTime, duration } = video
      if (Number.isFinite(duration) && duration > 0) {
        let opacity = 1
        if (currentTime < FADE_SECONDS) {
          // Fade in at the start
          opacity = currentTime / FADE_SECONDS
        } else if (currentTime > duration - FADE_SECONDS) {
          // Fade out before the end
          opacity = Math.max(0, (duration - currentTime) / FADE_SECONDS)
        }
        video.style.opacity = String(opacity)
      }
      rafId = requestAnimationFrame(updateOpacity)
    }

    const handleEnded = () => {
      video.style.opacity = '0'
      restartTimer = setTimeout(() => {
        video.currentTime = 0
        void video.play().catch(() => {})
      }, RESTART_DELAY_MS)
    }

    rafId = requestAnimationFrame(updateOpacity)
    video.addEventListener('ended', handleEnded)

    return () => {
      cancelAnimationFrame(rafId)
      if (restartTimer) clearTimeout(restartTimer)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="absolute z-0 h-full w-full object-cover"
      style={{ top: '300px', inset: 'auto 0 0 0', opacity: 0 }}
      src={VIDEO_URL}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  )
}
