'use client'
import { useEffect, useRef } from 'react'

export default function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number
    let scrollY = 0
    let targetScroll = 0
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', () => { targetScroll = window.scrollY })

    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      alpha: Math.random() * 0.4 + 0.05,
    }))

    const orbs = [
      { x: 0.5, y: 0.3, r: 0.4, color: [0, 255, 180], phase: 0 },
      { x: 0.15, y: 0.6, r: 0.35, color: [0, 170, 255], phase: 2 },
      { x: 0.85, y: 0.7, r: 0.38, color: [255, 0, 170], phase: 4 },
      { x: 0.5, y: 1.0, r: 0.4, color: [255, 200, 0], phase: 6 },
    ]

    const draw = () => {
      scrollY += (targetScroll - scrollY) * 0.06
      t += 0.008
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#04040c'
      ctx.fillRect(0, 0, W, H)

      const sp = scrollY / (document.body.scrollHeight - window.innerHeight || 1)

      orbs.forEach((orb, i) => {
        const ox = orb.x * W + Math.sin(t + orb.phase) * W * 0.08
        const oy = (orb.y + sp * 0.3 * (i % 2 === 0 ? -1 : 1)) * H + Math.cos(t * 0.7 + orb.phase) * H * 0.05
        const gr = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r * W)
        gr.addColorStop(0, `rgba(${orb.color.join(',')},0.09)`)
        gr.addColorStop(1, `rgba(${orb.color.join(',')},0)`)
        ctx.fillStyle = gr
        ctx.fillRect(0, 0, W, H)
      })

      const gridOffset = (scrollY * 0.15) % 80
      ctx.strokeStyle = 'rgba(255,255,255,0.02)'
      ctx.lineWidth = 1
      for (let x = 0; x < W + 80; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = -80 + (gridOffset % 80); y < H + 80; y += 80) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x * W, p.y * H - scrollY * 0.02, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,180,${p.alpha})`
        ctx.fill()
      })

      const sweepY = ((t * 60) % (H + 200)) - 100
      const sg = ctx.createLinearGradient(0, sweepY - 2, 0, sweepY + 2)
      sg.addColorStop(0, 'transparent')
      sg.addColorStop(0.5, 'rgba(0,255,180,0.04)')
      sg.addColorStop(1, 'transparent')
      ctx.fillStyle = sg
      ctx.fillRect(0, sweepY - 2, W, 4)

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}
    />
  )
}