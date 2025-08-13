# Fog City Dispatch - Product Requirements Document

## Game Overview
Fog City Dispatch is a mobile card-swiping game where players take on the role of a 911 dispatcher in San Francisco. Players must quickly triage emergency calls by swiping cards in different directions while managing their readiness (energy) and uncovering interconnected crime storylines.

## Core Game Loop
1. **Card Presentation**: Emergency call card appears in center of screen
2. **Player Decision**: 
   - Emergency cards: Swipe left (ignore), right (basic response), or up (maximum response)
   - Powerup cards: Tap "Accept" button
3. **Outcome Display**: Show result message for 1 second with elegant transition
4. **Resource Management**: Readiness decreases/increases based on response choice
5. **Story Progression**: Actions contribute to uncovering story arcs
6. **Time Pressure**: 5-minute countdown creates urgency
7. **Next Card**: New card slides in immediately after outcome

## Starting Game State
- **Readiness**: 100/200 (increases +1 every second automatically)
- **Capacity**: 200 (increases only when resolving cards)
- **Score**: 0
- **Timer**: 5:00

## User Interface Specifications

### Screen Layout (Mobile Portrait)
```
┌─────────────────────────────────┐
│  Timer: 4:32  Ready: 85/220     │
│  Score: 1,240  Cap: 220         │
├─────────────────────────────────┤
│                                 │
│    ┌─────────────────────┐     │
│    │                     │     │
│    │    EMERGENCY        │     │
│    │      CALL           │     │
│    │     CARD            │     │
│    │                     │     │
│    └─────────────────────┘     │
│                                 │
│  [Swipe hints if first play]   │
│                                 │
├─────────────────────────────────┤
│  Low readiness warning area     │
└─────────────────────────────────┘
```

### Top Status Bar
- **Timer**: MM:SS countdown from 5:00
- **Readiness**: Current/Maximum (e.g., "85/220")
- **Score**: Current points accumulated
- **Capacity**: Current maximum readiness

### Emergency Card Display
- **Position**: Floating in center 70% of screen
- **Content**: 
  - Headline (large, bold)
  - Location (small, with map pin icon)
  - Description (medium text, 2-3 lines)
  - Basic Response: Points & Readiness cost (highlighted)
- **Visual State**: Story cards have golden border/glow
- **Animation**: Smooth swipe animations with card exit/enter

### Powerup Card Display
- **Position**: Same as emergency cards
- **Content**:
  - "POWERUP" label (large, colorful)
  - Powerup type/benefit description
  - Large "Accept" button (primary CTA style)
- **Visual Theme**: Blue/purple gradient
- **Interaction**: Single button tap, no swiping

### Swipe Gestures & Interactions

#### Emergency Cards Tutorial (First 3 Cards)
- Left arrow: "Swipe LEFT to IGNORE" 
- Right arrow: "Swipe RIGHT for BASIC response"
- Up arrow: "Swipe UP for MAXIMUM response"

#### Gesture Effects
- **Swipe Left (Ignore)**: +1 readiness, 0 points, no capacity gain
- **Swipe Right (Basic)**: -X readiness, +Y points, +Z capacity
- **Swipe Up (Maximum)**: -5X readiness, +5Y points, +5Z capacity
- **Tap Accept (Powerup)**: Apply powerup effect immediately

### Outcome Message Display
**Timing**: 1 second between card action and next card

**Animation Sequence**:
1. **Card Exit** (200ms): Swiped card animates off screen
2. **Outcome Show** (600ms): Fade in outcome message in center
3. **Outcome Exit** (200ms): Fade out outcome message  
4. **Next Card Enter** (immediate): New card slides in from right

**Example Outcome Messages**:
- **Ignore**: "Call ignored. +1 readiness recovered."
- **Basic Response**: "Units dispatched. -8 readiness, +15 points"
- **Maximum Response**: "Full response sent. -40 readiness, +75 points" 
- **Powerup**: "Energy boost received! +25 readiness"

### Visual Feedback System

#### Readiness States
- **Healthy** (70-100%): Green readiness bar
- **Warning** (30-69%): Yellow readiness bar  
- **Critical** (<30%): Red readiness bar + pulsing border

#### Blocked Actions
- If readiness < required cost: Show "⚠️ Not enough readiness" on swipe attempt
- Gray out unavailable swipe directions
- Only allow "Ignore" option when insufficient readiness

#### Success Feedback
- **Points earned**: +Y floating animation
- **Readiness spent**: -X floating animation
- **Capacity gained**: Subtle +Z near capacity display

## Game Mechanics

### Resource System
**Automatic Progression**:
- Readiness increases by +1 every second (up to current capacity maximum)
- Timer decreases by 1 second every second
- Capacity increases only when resolving cards (via basic/maximum responses)

### Card Deck System
**Total Cards**: 100 emergency cards + ~10 powerup cards
**Composition**:
- 27 Story cards (across 6 storylines)
- 73 Random emergency cards
- ~10 Powerup cards (mixed randomly every 8-12 cards)

**Card Queue**: 
- Pre-shuffle all 100 cards at game start
- Mix in powerup cards randomly
- Present cards in queue order
- No card repetition within single game

### Story Arc Tracking (Behind the Scenes)

**Story Arcs & Completion Multipliers**:
- **Major Story** (Zodiac - 8 cards): 3.0x multiplier if completed
- **Medium Stories** (5 cards each): 2.0x multiplier if completed
  - Patty Hearst Kidnapping
  - Moscone-Milk Assassinations  
- **Minor Stories** (3 cards each): 1.5x multiplier if completed
  - Golden Dragon Massacre
  - Marina Gas Explosion
  - Cable Car Runaway

**Completion Criteria**:
- Must take "Basic Response" or "Maximum Response" on 80%+ of story cards
- Ignoring story cards removes them from completion tracking
- Partial completion = no multiplier

### Powerup Cards
**Types**:
- **Energy Boost**: +25 Readiness
- **Capacity Upgrade**: +50 Maximum Capacity  
- **Score Multiplier**: Next 3 cards give 2x points
- **Time Freeze**: Pause timer for 10 seconds

**Interaction**: 
- Single "Accept" button (no swiping)
- Immediate effect application
- Cannot be declined/ignored

## End Game Experience

### Game Over Trigger
- Timer reaches 0:00
- Automatic transition to results screen

### Results Screen Layout
```
┌─────────────────────────────────┐
│         SHIFT COMPLETE          │
├─────────────────────────────────┤
│  Final Score: 3,847             │
│  Cards Handled: 67              │
│  Stories Discovered: 4          │
├─────────────────────────────────┤
│  STORY ARCS UNCOVERED:          │
│                                 │
│  ✅ Zodiac Killer (8/8) 3.0x    │
│  ✅ Golden Dragon (3/3) 1.5x    │
│  🔶 Patty Hearst (3/5) --       │
│  ❌ Moscone-Milk (1/5) --       │
│                                 │
│  Story Bonus: +5,770            │
│  TOTAL SCORE: 9,617             │
├─────────────────────────────────┤
│       [PLAY AGAIN]              │
│       [SHARE SCORE]             │
└─────────────────────────────────┘
```

### Score Calculation
1. **Base Score**: Sum of all points from card responses
2. **Story Multipliers**: Applied to base score for each completed arc
3. **Final Score**: Base + (Base × Story Multipliers)

**Example**:
- Base Score: 3,000
- Completed Zodiac (3.0x): +9,000
- Completed Golden Dragon (1.5x): +4,500  
- Total: 16,500

## Technical Requirements

### Performance Targets
- **Card Swipe Response**: <50ms
- **Smooth Animations**: 60fps
- **Memory Usage**: <100MB on mobile
- **Battery Efficient**: Minimal background processing

### Animation Specifications
- **Card Transitions**: 200ms ease-out
- **Outcome Display**: 600ms with fade in/out
- **Swipe Feedback**: Immediate visual response
- **Status Updates**: Smooth number counting animations

### Mobile Responsiveness
- **Portrait Orientation**: Primary focus
- **Touch Targets**: Minimum 44px for accessibility
- **Gesture Recognition**: Reliable swipe detection
- **Performance**: Optimized for mid-range mobile devices

---

*End of PRD - Ready for Claude Code development*