// Function to get card audio URL - local first, then fallback to null
export function getCardAudioUrl(card: { id: number; headline: string; audioFile?: string; hasVoice?: boolean }): string | null {
  // If card doesn't have voice, return null
  if (!card.hasVoice) {
    return null
  }
  
  // If we have a local audio file specified, use it
  if (card.audioFile) {
    return `/audio/cards/${encodeURIComponent(card.audioFile)}.mp3`
  }
  
  // Try to match by headline
  const matchedAudio = findAudioByHeadline(card.headline)
  if (matchedAudio) {
    return `/audio/cards/${encodeURIComponent(matchedAudio.replace('.mp3', ''))}.mp3`
  }
  
  // No audio file found
  return null
}

// Function to find audio file that matches card headline
function findAudioByHeadline(headline: string): string | null {
  // List of available audio files (without .mp3 extension)
  const availableAudioFiles = [
    'Confession Call Downtown',
    'Final Taunting Call',
    'Ransom Demand Received',
    'School Bus Threat',
    'Shots Fired at Blue Rock Springs',
    'Witness Correction Call'
  ]
  
  // Try exact match first
  if (availableAudioFiles.includes(headline)) {
    return `${headline}.mp3`
  }
  
  // Try partial matches (case insensitive)
  const normalizedHeadline = headline.toLowerCase()
  for (const audioName of availableAudioFiles) {
    if (audioName.toLowerCase().includes(normalizedHeadline) || 
        normalizedHeadline.includes(audioName.toLowerCase())) {
      return `${audioName}.mp3`
    }
  }
  
  return null
}

// Function to preload audio file
export function preloadAudio(url: string): HTMLAudioElement {
  const audio = new Audio(url)
  audio.preload = 'auto'
  return audio
}

// Function to play audio with error handling
export function playAudio(audio: HTMLAudioElement): Promise<void> {
  return new Promise((resolve, reject) => {
    audio.onended = () => resolve()
    audio.onerror = () => reject(new Error('Audio playback failed'))
    
    audio.play().catch(reject)
  })
}