import type { DispatchCard } from '@/types'

// Tutorial cards with modified descriptions for teaching
export const tutorialCards: DispatchCard[] = [
  // Card 1: Loud Party (Teach Ignore - Swipe Left)
  {
    "id": 20,
    "storyArc": "Random",
    "headline": "Loud Party on Grant Avenue",
    "location": "North Beach",
    "description": "This is a low-priority call. Swipe LEFT to ignore it and save your resources for more important emergencies.",
    "visual": "Italian restaurant with string lights, people spilling onto sidewalk with wine glasses, accordion player",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": -10,
        "capacity": 0,
        "score": 0,
        "outcome": "Good! You ignored a low-priority call. Notice you still lost some readiness from the stress."
      },
      "basic": {
        "readiness": -15,
        "capacity": 5,
        "score": 10,
        "outcome": "Officers respond to noise complaint"
      },
      "maximum": {
        "readiness": -25,
        "capacity": 15,
        "score": 25,
        "outcome": "Heavy response to party"
      }
    }
  },
  // Card 2: Theft at Macy's (Teach Dispatch - Swipe Right)
  {
    "id": 30,
    "storyArc": "Random", 
    "headline": "Theft at Macys",
    "location": "Union Square",
    "description": "This requires police response. Swipe RIGHT to dispatch a unit. Notice how this costs readiness.",
    "visual": "Busy department store, security guard with detained person, holiday decorations, shoppers with bags",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 0,
        "capacity": 0,
        "score": 0,
        "outcome": "Store security handles it alone"
      },
      "basic": {
        "readiness": -15,
        "capacity": 5,
        "score": 50,
        "outcome": "Well done! You dispatched a unit, earned 50 points, and used 15 readiness."
      },
      "maximum": {
        "readiness": -25,
        "capacity": 15,
        "score": 30,
        "outcome": "Heavy police response to shoplifting"
      }
    }
  },
  // Card 3: Gas Explosion (Teach Priority Dispatch - Swipe Up)
  {
    "id": 999, // Tutorial-only card
    "storyArc": "Random",
    "headline": "Gas Explosion",
    "location": "Mission District", 
    "description": "This is an emergency! Swipe UP for priority dispatch - it costs more readiness but handles critical situations.",
    "visual": "Major gas explosion destroys apartment building. Multiple casualties, fire spreading to adjacent structures.",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 0,
        "capacity": 0,
        "score": 0,
        "outcome": "Emergency goes unaddressed"
      },
      "basic": {
        "readiness": -20,
        "capacity": 10,
        "score": 25,
        "outcome": "Standard response to major emergency"
      },
      "maximum": {
        "readiness": -30,
        "capacity": 25,
        "score": 100,
        "outcome": "Excellent! Priority dispatch earned you 100 points but cost 30 readiness."
      }
    }
  },
  // Card 4: Powerup (Teach Powerups - Tap to Accept)
  {
    "id": 108,
    "storyArc": "Random",
    "headline": "Boost your readiness",
    "location": "Downtown",
    "description": "Occasionally you'll be able to boost your readiness, letting you handle bigger challenges for more points. Tap to accept!",
    "visual": "Coffee shop during morning rush, baristas working frantically, customers in business attire with phones",
    "videoFile": "Partner Brings Perfect Coffee",
    "isPowerup": true,
    "hasVoice": false,
    "responses": {
      "accept": {
        "readiness": 25,
        "capacity": 0,
        "score": 0,
        "outcome": "Great! You gained 25 readiness to handle more calls."
      }
    }
  }
]

// Tutorial state management
export const isTutorialCompleted = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('tutorialCompleted') === 'true'
}

export const markTutorialCompleted = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tutorialCompleted', 'true')
  }
}

export const resetTutorial = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('tutorialCompleted')
  }
}

// Tutorial progression helpers
export const getTutorialCardIndex = (phase: string): number => {
  switch (phase) {
    case 'card1': return 0
    case 'card2': return 1  
    case 'card3': return 2
    case 'powerup': return 3
    default: return -1
  }
}

export const getNextTutorialPhase = (currentPhase: string): string => {
  switch (currentPhase) {
    case 'intro': return 'card1'
    case 'card1': return 'card2'
    case 'card2': return 'card3'
    case 'card3': return 'powerup'
    case 'powerup': return 'ready'
    case 'ready': return 'complete'
    default: return 'intro'
  }
}