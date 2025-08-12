# Fog City Dispatch

A mobile card-swiping game where players take on the role of a 911 dispatcher in 1970s San Francisco. Players must quickly triage emergency calls by swiping cards while managing their readiness and uncovering interconnected crime storylines.

## Game Features

- **Card Swiping Mechanics**: Swipe left (ignore), right (basic response), or up (maximum response)
- **Resource Management**: Manage readiness and capacity under time pressure
- **Story Arcs**: Uncover interconnected storylines including the Zodiac Killer, Patty Hearst kidnapping, and more
- **Powerup Cards**: Restore readiness with positive dispatcher moments
- **Score Multipliers**: Complete story arcs for bonus points

## Development

### Getting Started

```bash
npm install
npm run dev
```

### Routes

- `/` - Main game interface
- `/browse-cards` - Card browser and content management tool

### Card Data

The game includes 110 cards:
- 100 emergency dispatch scenarios
- 10 powerup cards for readiness restoration
- 27 story arc cards across 6 major storylines
- 73 random emergency situations

### Tech Stack

- React + TypeScript
- Vite for build tooling
- CSS3 animations for smooth mobile experience
- Touch gesture recognition for swipe mechanics

## Story Arcs

- **Zodiac Killer** (8 cards) - 3.0x completion multiplier
- **Patty Hearst Kidnapping** (5 cards) - 2.0x completion multiplier  
- **Moscone-Milk Assassinations** (5 cards) - 2.0x completion multiplier
- **Golden Dragon Massacre** (3 cards) - 1.5x completion multiplier
- **Marina Gas Explosion** (3 cards) - 1.5x completion multiplier
- **Cable Car Runaway** (3 cards) - 1.5x completion multiplier

## Contributing

This project represents emergency scenarios from 1970s San Francisco for educational and entertainment purposes.