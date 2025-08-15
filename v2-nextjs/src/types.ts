export interface ResponseOption {
  readiness: number;  // Change in readiness (-X or +1 for ignore)
  capacity: number;   // Change in capacity (+/- X)
  score: number;      // Points earned (0 for ignore)
  outcome: string;    // Short outcome message (<50 chars)
}

export interface DispatchCard {
  id: number;
  storyArc: string;
  arcNumber?: string;
  headline: string;
  location: string;
  description: string;
  visual: string;
  hasVoice: boolean;
  voiceScript?: string;
  isPowerup?: boolean;
  powerupValue?: number;  // Readiness points gained for powerup cards
  imageFile?: string;  // Local image filename (without extension)
  audioFile?: string;  // Local audio filename (without extension)
  videoFile?: string;  // Local video filename (without extension)
  responses: {
    ignore?: ResponseOption;
    basic?: ResponseOption;
    maximum?: ResponseOption;
    accept?: ResponseOption;  // For powerup cards
  };
}