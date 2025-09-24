import { useState, useEffect } from 'react'
import type { MouseTrackingState } from '../types/avatar'

export function useMouseTracking(): MouseTrackingState {
  const [trackingState, setTrackingState] = useState<MouseTrackingState>({
    currentPosition: { x: 0, y: 0 },
    targetPosition: { x: 0, y: 0 },
    isTracking: true,
    interpolationSpeed: 0.05
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse coordinates to normalized device coordinates (-1 to 1)
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1

      setTrackingState(prev => ({
        ...prev,
        targetPosition: { x, y }
      }))
    }

    const handleMouseEnter = () => {
      setTrackingState(prev => ({ ...prev, isTracking: true }))
    }

    const handleMouseLeave = () => {
      setTrackingState(prev => ({
        ...prev,
        isTracking: false,
        targetPosition: { x: 0, y: 0 }
      }))
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return trackingState
}