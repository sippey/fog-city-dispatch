// Simple utility function to generate placeholder images for styling
export function getUnsplashImageUrl(card: { id: number }, width = 400, height = 600): string {
  // Just use Lorem Picsum with card ID for consistency
  return `https://picsum.photos/${width}/${height}?random=${card.id}`
}

// Alternative function with more control (requires Unsplash API key)
export function getUnsplashApiUrl(card: { id: number; location: string }, accessKey?: string): string {
  if (!accessKey) {
    // Fallback to source.unsplash.com
    return getUnsplashImageUrl(card)
  }
  
  // Use Unsplash API for better control (implement later if needed)
  const query = `${card.location} emergency police`
  return `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${accessKey}`
}