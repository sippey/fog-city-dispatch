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
    'Alcatraz Tour Boat Emergency',
    'Armed Holdup on Grant Avenue',
    'Art Gallery Break-In',
    'Balboa Park Gang Fight',
    'Bank Robbery in Progress',
    'Bayview Community Center',
    'Bernal Heights Dog Park',
    'Bicycle Theft Ring',
    'Brake System Warning',
    'Brawl Outside The Phoenix',
    'Burglary Alarm on Geary Boulevard',
    'Cable Car Collision',
    'Castro District Violence',
    'Castro Street Medical Emergency',
    'Chinatown Elderly Scam',
    'Chinatown Medicinal Shop Robbery',
    'City Hall Riots Begin',
    'City Hall Security Breach',
    'Community Fear Response',
    'Confession Call Downtown',
    'Cow Hollow Boutique Theft',
    'Crissy Field Dog Attack',
    'Crocker Amazon Playground',
    'Dan White Surrenders',
    'Diamond Heights Overlook',
    'Drive-By on 24th Street',
    'Embarcadero Hit and Run',
    'Evacuation Orders',
    'Excelsior District Shooting',
    'Executive Collapses in Office',
    'Fillmore Jazz Club Fight',
    'Final Taunting Call',
    'Financial District Bomb Threat',
    'Fisherman_s Wharf Brawl',
    'Food Truck Fire',
    'Forest Hill Hillside Collapse',
    'Gang Intelligence Report',
    'Gas Explosion',
    'Gas Leak Reported',
    'Glen Park BART Incident',
    'Golden Gate Bridge Jumper',
    'Golden Gate Park Concert',
    'Haight Street Drug Deal',
    'Hayes Valley Art Walk',
    'Hearst Arrest',
    'Heart Attack at Pier 39',
    'Ingleside Library Incident',
    'Japanese Tea Garden Damaged',
    'Japantown Festival Incident',
    'Jogger Attacked by the Bay',
    'Late Night House Party',
    'Lombard Street Tourist Accident',
    'Lost Hiker Near Stow Lake',
    'Loud Party on Grant Avenue',
    'Man Down on Eddy Street',
    'Man Threatening Suicide',
    'Mansion Break-In on Broadway',
    'Market Street Knife Fight',
    'Missing UC Berkeley Student',
    'Mission Dolores Vandalism',
    'Mission Street Protest',
    'Multi-Car Accident on Lombard',
    'Multi-Vehicle Pileup',
    'Newspaper Receives Death Threat',
    'Nob Hill Hotel Robbery',
    'North Beach Restaurant Fire',
    'Ocean Beach Drowning',
    'Outer Mission Garage Fire',
    'Outer Richmond Surf Rescue',
    'Pacific Heights Car Chase',
    'Pier 39 Pickpocket Ring',
    'Portola District Market',
    'Potrero Hill Food Truck',
    'Presidio Trail Accident',
    'Ransom Demand Received',
    'Restaurant Shooting',
    'Richmond District Home Invasion',
    'Richmond Fog Accident',
    'Russian Hill Apartment Fire',
    'SLA Safehouse Raided',
    'SOMA Warehouse Rave',
    'School Bus Threat',
    'Screaming Match on Valencia Street',
    'Seacliff Mansion Break-In',
    'Shots Fired at Blue Rock Springs',
    'Shots Fired at City Hall',
    'Smoke Reported on Hyde Street',
    'Strange Man Following Women',
    'Sunset District Block Party',
    'Suspicious Activity at Bus Stop',
    'System-Wide Cable Failure',
    'Taxi Driver Shot Dead',
    'Telegraph Hill Burglary',
    'Tenderloin Hotel Fire',
    'Theft at Macys',
    'Twin Peaks Lookout Robbery',
    'Union Square Flash Mob',
    'Visitacion Valley Warehouse',
    'West Portal Shopping District',
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