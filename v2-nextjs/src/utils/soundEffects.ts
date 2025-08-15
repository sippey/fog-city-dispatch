// Sound effects using Web Audio API and HTML5 Audio

let audioContext: AudioContext | null = null

// Preloaded audio files for swipe sounds
const swipeSounds: { [key: string]: HTMLAudioElement } = {}

// Initialize audio context (handles browser autoplay policies)
const getAudioContext = (): AudioContext | null => {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    } catch (error) {
      console.log('Web Audio API not supported:', error)
      return null
    }
  }
  
  // Handle suspended context (autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume().catch(error => {
      console.log('Could not resume audio context:', error)
    })
  }
  
  return audioContext
}

// Generate a deep "click" sound effect
export const playTapSound = (): void => {
  const ctx = getAudioContext()
  if (!ctx) return
  
  try {
    // Create multiple oscillators for a richer, deeper click
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gainNode = ctx.createGain()
    const filterNode = ctx.createBiquadFilter()
    
    // Connect audio nodes
    osc1.connect(gainNode)
    osc2.connect(gainNode)
    gainNode.connect(filterNode)
    filterNode.connect(ctx.destination)
    
    // Configure the click sound - bumped up an octave
    // Main frequency - mid-range and percussive
    osc1.frequency.setValueAtTime(300, ctx.currentTime) // Mid-range bass (doubled from 150)
    osc1.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.05) // Quick drop (doubled from 80)
    osc1.type = 'square' // More percussive than sine wave
    
    // Harmonic frequency for richness
    osc2.frequency.setValueAtTime(600, ctx.currentTime) // Higher harmonic (doubled from 300)
    osc2.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.03) // Even quicker drop (doubled from 120)
    osc2.type = 'triangle' // Softer harmonic
    
    // Low-pass filter for warmth (removes harsh high frequencies)
    filterNode.type = 'lowpass'
    filterNode.frequency.setValueAtTime(800, ctx.currentTime)
    filterNode.Q.setValueAtTime(1, ctx.currentTime)
    
    // Volume envelope - very quick attack, quick decay for "click" effect
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.005) // Very quick attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08) // Quick decay
    
    // Play the sound
    osc1.start(ctx.currentTime)
    osc2.start(ctx.currentTime)
    osc1.stop(ctx.currentTime + 0.08)
    osc2.stop(ctx.currentTime + 0.08)
    
    // Clean up
    osc1.onended = () => {
      osc1.disconnect()
      osc2.disconnect()
      gainNode.disconnect()
      filterNode.disconnect()
    }
  } catch (error) {
    console.log('Could not play tap sound:', error)
  }
}

// Note: Old generated swipe sound removed - now using MP3 files

// Preload swipe sound files for instant playback
export const preloadSwipeSounds = async (): Promise<void> => {
  const soundFiles = {
    ignore: '/audio/swipes/ignore.mp3',
    basic: '/audio/swipes/basic.mp3',
    maximum: '/audio/swipes/maximum.mp3',
    powerup: '/audio/swipes/powerup.mp3'
  }
  
  // Preload each sound file
  for (const [key, url] of Object.entries(soundFiles)) {
    try {
      const audio = new Audio(url)
      audio.preload = 'auto'
      audio.volume = 0.7 // Set reasonable volume
      
      // Wait for the audio to be ready
      await new Promise<void>((resolve, reject) => {
        audio.addEventListener('canplaythrough', () => resolve(), { once: true })
        audio.addEventListener('error', () => reject(new Error(`Failed to load ${url}`)), { once: true })
        audio.load()
      })
      
      swipeSounds[key] = audio
      console.log(`Preloaded swipe sound: ${key}`)
    } catch (error) {
      console.log(`Could not preload swipe sound ${key}:`, error)
    }
  }
}

// Play swipe sound based on action type (MP3 files)
export const playSwipeSound = (type: 'ignore' | 'basic' | 'maximum' | 'powerup'): void => {
  const audio = swipeSounds[type]
  if (!audio) {
    console.log(`Swipe sound not loaded: ${type}`)
    return
  }
  
  try {
    // Reset to beginning in case it was played recently
    audio.currentTime = 0
    audio.play().catch(error => {
      console.log(`Could not play swipe sound ${type}:`, error)
    })
  } catch (error) {
    console.log(`Error playing swipe sound ${type}:`, error)
  }
}