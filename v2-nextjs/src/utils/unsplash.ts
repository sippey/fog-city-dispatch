// Function to get card image - local first, then fallback to placeholder
export function getCardImageUrl(card: { id: number; headline: string; imageFile?: string }): string {
  // If we have a local image file specified, use it
  if (card.imageFile) {
    return `/images/cards/${encodeURIComponent(card.imageFile)}.png`
  }
  
  // Try to match by headline
  const matchedImage = findImageByHeadline(card.headline)
  if (matchedImage) {
    return `/images/cards/${encodeURIComponent(matchedImage.replace('.png', ''))}.png`
  }
  
  // Fallback to placeholder image
  return `/images/cards/placeholder.png`
}

// Function to find image file that matches card headline
function findImageByHeadline(headline: string): string | null {
  // List of available image files (without .png extension)
  const availableImages = [
    'Armed Holdup on Grant Avenue',
    'Art Gallery Break-In',
    'Bank Robbery in Progress',
    'Bicycle Theft Ring',
    'Brake System Warning',
    'Brawl Outside The Phoenix',
    'Burglary Alarm on Geary Boulevard',
    'Cable Car Collision',
    'Castro Street Medical Emergency',
    'Chinatown Medicinal Shop Robbery',
    'City Hall Security Breach',
    'Confession Call Downtown',
    'Drive-By on 24th Street',
    'Evacuation Orders',
    'Executive Collapses in Office',
    'Food Truck Fire',
    'Gang Intelligence Report',
    'Gas Leak Reported',
    'Heart Attack at Pier 39',
    'Japanese Tea Garden Damaged',
    'Jogger Attacked by the Bay',
    'Late Night House Party',
    'Lost Hiker Near Stow Lake',
    'Loud Party on Grant Avenue',
    'Man Down on Eddy Street',
    'Man Threatening Suicide',
    'Mansion Break-In on Broadway',
    'Missing UC Berkeley Student',
    'Multi-Car Accident on Lombard',
    'Multi-Vehicle Pileup',
    'Newspaper Receives Death Threat',
    'Pier 39 Pickpocket Ring',
    'Ransom Demand Received',
    'Restaurant Shooting',
    'School Bus Threat',
    'Screaming Match on Valencia Street',
    'Shots Fired at Blue Rock Springs',
    'Shots Fired at City Hall',
    'Smoke Reported on Hyde Street',
    'Strange Man Following Women',
    'Suspicious Activity at Bus Stop',
    'Taxi Driver Shot Dead',
    'Theft at Macy_s',
    'Witness Correction Call'
  ]
  
  // Try exact match first
  if (availableImages.includes(headline)) {
    return `${headline}.png`
  }
  
  // Try partial matches (case insensitive)
  const normalizedHeadline = headline.toLowerCase()
  for (const imageName of availableImages) {
    if (imageName.toLowerCase().includes(normalizedHeadline) || 
        normalizedHeadline.includes(imageName.toLowerCase())) {
      return `${imageName}.png`
    }
  }
  
  return null
}

// Legacy function for backward compatibility
export function getUnsplashImageUrl(card: { id: number; headline: string; imageFile?: string }): string {
  return getCardImageUrl(card)
}