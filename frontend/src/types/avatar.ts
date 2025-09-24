export interface AvatarState {
  isLoaded: boolean
  animationState: {
    currentAnimation: 'idle' | 'speaking' | 'listening'
    transitionProgress: number
  }
  emotionalState: {
    mood: 'neutral' | 'happy' | 'thinking' | 'excited'
    intensity: number
  }
}

export interface MousePosition {
  x: number
  y: number
}

export interface MouseTrackingState {
  currentPosition: MousePosition
  targetPosition: MousePosition
  isTracking: boolean
  interpolationSpeed: number
}

export function createDefaultAvatarState(): AvatarState {
  return {
    isLoaded: false,
    animationState: {
      currentAnimation: 'idle',
      transitionProgress: 0
    },
    emotionalState: {
      mood: 'neutral',
      intensity: 0.5
    }
  }
}