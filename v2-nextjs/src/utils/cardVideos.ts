// Function to get card video URL for powerup cards
export function getCardVideoUrl(card: { id: number; headline: string; videoFile?: string }): string | null {
  // If we have a specific video file specified, use it
  if (card.videoFile) {
    return `/video/cards/${encodeURIComponent(card.videoFile)}.mp4`
  }
  
  // Try to match by headline
  const matchedVideo = findVideoByHeadline(card.headline)
  if (matchedVideo) {
    return `/video/cards/${encodeURIComponent(matchedVideo.replace('.mp4', ''))}.mp4`
  }
  
  // No video found - caller should fall back to image
  return null
}

// Function to find video file that matches card headline
function findVideoByHeadline(headline: string): string | null {
  // List of available video files (without .mp4 extension)
  const availableVideos = [
    'Chief Compliments Your Work',
    'Family Sends Thank You Card',
    'Found the Perfect Parking Spot',
    'New Radio System Installed',
    'Partner Brings Perfect Coffee',
    'Surprise Birthday Celebration',
    'Vacation Request Approved!',
    'You Got the Promotion!',
    'You Saved a Life Today',
    'Your Daughter Calls - She Got an A!'
  ]
  
  // Try exact match first
  if (availableVideos.includes(headline)) {
    return `${headline}.mp4`
  }
  
  // Try partial matches (case insensitive)
  const normalizedHeadline = headline.toLowerCase()
  for (const videoName of availableVideos) {
    if (videoName.toLowerCase().includes(normalizedHeadline) || 
        normalizedHeadline.includes(videoName.toLowerCase())) {
      return `${videoName}.mp4`
    }
  }
  
  return null
}