import { DispatchCard } from '@/types'; export const cardsData: DispatchCard[] = 
[
  {
    "id": 1,
    "storyArc": "Random",
    "headline": "Screaming Match on Valencia Street",
    "location": "Mission District",
    "description": "Neighbors report loud argument, possible physical altercation between couple. Female voice heard crying for help.",
    "visual": "Dimly lit apartment building at night, silhouettes in window, concerned neighbor peeking through curtains",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Neighbors handle it themselves"
      },
      "basic": {
        "readiness": -5,
        "capacity": 5,
        "score": 10,
        "outcome": "Officers calm the situation"
      },
      "maximum": {
        "readiness": -32,
        "capacity": 24,
        "score": 50,
        "outcome": "SWAT overwhelms domestic dispute"
      }
    }
  },
  {
    "id": 2,
    "storyArc": "Zodiac",
    "headline": "Shots Fired at Blue Rock Springs",
    "location": "Blue Rock Springs",
    "description": "Panicked teenager reports gunshots near parked cars at lover's lane. Saw figure walking away calmly with flashlight.",
    "visual": "Dark parking area by water, abandoned car with door open, flashlight beam in distance, nervous young caller",
    "hasVoice": true,
    "voiceScript": "911? Oh god, I think someone just got shot! I heard like four gunshots from the parking lot by the water. There's a car here with the door open and... and I saw someone walking away real calm with a flashlight. Should I go check on them?",
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Crime scene goes cold"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers find bodies, evidence lost"
      },
      "maximum": {
        "readiness": -48,
        "capacity": 32,
        "score": 75,
        "outcome": "Full scene secured, K9 units deployed"
      }
    },
    "arcNumber": "Z1"
  },
  {
    "id": 3,
    "storyArc": "Random",
    "headline": "Burglary Alarm on Geary Boulevard",
    "location": "Richmond District",
    "description": "Silent alarm triggered at electronics store. No visual confirmation of intruders. Could be false alarm.",
    "visual": "Storefront with flashing alarm light, empty street, broken glass or open door unclear in shadows",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Store owner finds broken window"
      },
      "basic": {
        "readiness": -6,
        "capacity": 5,
        "score": 10,
        "outcome": "Officers check perimeter, false alarm"
      },
      "maximum": {
        "readiness": -28,
        "capacity": 16,
        "score": 25,
        "outcome": "SWAT surrounds empty store"
      }
    }
  },
  {
    "id": 4,
    "storyArc": "Random",
    "headline": "Man Down on Eddy Street",
    "location": "Tenderloin",
    "description": "Possible overdose outside SRO hotel. Caller reports person unconscious, not responding. Needle visible nearby.",
    "visual": "Gritty street scene, person slumped against building, urban decay, syringe in foreground, concerned passerby calling",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Passerby calls ambulance instead"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 10,
        "outcome": "Officer provides first aid"
      },
      "maximum": {
        "readiness": -24,
        "capacity": 16,
        "score": 50,
        "outcome": "Full hazmat response for overdose"
      }
    }
  },
  {
    "id": 5,
    "storyArc": "Random",
    "headline": "Multi-Car Accident on Lombard",
    "location": "Lombard Street",
    "description": "Three-car collision on famous winding street. Possible injuries, traffic backing up. Tourist area.",
    "visual": "Crooked street with crashed cars, tourists watching, cable car in background, worried drivers exchanging information",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Tourists direct traffic"
      },
      "basic": {
        "readiness": -10,
        "capacity": 10,
        "score": 20,
        "outcome": "Traffic cleared, minor injuries"
      },
      "maximum": {
        "readiness": -40,
        "capacity": 24,
        "score": 75,
        "outcome": "Full emergency response shuts street"
      }
    }
  },
  {
    "id": 6,
    "storyArc": "Random",
    "headline": "Armed Holdup on Grant Avenue",
    "location": "Chinatown",
    "description": "Man with knife robbing tourists near Dragon Gate. Multiple witnesses, suspect fled toward Stockton.",
    "visual": "Busy Chinatown street with pagoda architecture, tourists dropping bags, man in hoodie running, Chinese lanterns overhead",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Robber escapes with cash"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Suspect caught two blocks away"
      },
      "maximum": {
        "readiness": -36,
        "capacity": 32,
        "score": 75,
        "outcome": "Helicopter tracks fleeing suspect"
      }
    }
  },
  {
    "id": 7,
    "storyArc": "Random",
    "headline": "Lost Hiker Near Stow Lake",
    "location": "Golden Gate Park",
    "description": "Elderly man with dementia wandered from family picnic three hours ago. Last seen near Japanese Tea Garden.",
    "visual": "Misty park paths, worried family members, elderly man's photo, dense trees and fog, search flashlights",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Family searches alone in fog"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 30,
        "outcome": "Officers find man by pond"
      },
      "maximum": {
        "readiness": -60,
        "capacity": 48,
        "score": 125,
        "outcome": "Full search with dogs and helicopters"
      }
    }
  },
  {
    "id": 8,
    "storyArc": "Zodiac",
    "headline": "Confession Call Downtown",
    "location": "Downtown Payphone",
    "description": "Calm male voice: \"I want to report a murder - no, two murders. I am the one who did it.\" Line goes dead.",
    "visual": "Phone booth on busy street, shadowy figure walking away, receiver dangling, dispatcher looking concerned",
    "hasVoice": true,
    "voiceScript": "I want to report a murder. No, two murders. I am the one who did it. [pause] They are at Blue Rock Springs. You will find them. [line goes dead]",
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Call logged as prank"
      },
      "basic": {
        "readiness": -6,
        "capacity": 5,
        "score": 10,
        "outcome": "Officer checks payphone area"
      },
      "maximum": {
        "readiness": -32,
        "capacity": 24,
        "score": 75,
        "outcome": "Full investigation team mobilized"
      }
    },
    "arcNumber": "Z2"
  },
  {
    "id": 9,
    "storyArc": "Random",
    "headline": "Brawl Outside The Phoenix",
    "location": "Castro District",
    "description": "Large fight spilled from bar onto Castro Street. Broken bottles, multiple injuries reported.",
    "visual": "Neon-lit bar exterior, people fighting in street, broken glass, rainbow flag visible, bouncer trying to intervene",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Bouncer breaks up fight"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 10,
        "outcome": "Officers arrest instigators"
      },
      "maximum": {
        "readiness": -40,
        "capacity": 32,
        "score": 50,
        "outcome": "Riot squad clears entire block"
      }
    }
  },
  {
    "id": 10,
    "storyArc": "Random",
    "headline": "Heart Attack at Pier 39",
    "location": "Fisherman's Wharf",
    "description": "Tourist collapsed near sea lion viewing area. Wife performing CPR. Paramedics requested.",
    "visual": "Crowded pier with sea lions, person on ground, worried wife, tourists forming circle, Alcatraz in background",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Wife continues CPR alone"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 20,
        "outcome": "Paramedics save tourist's life"
      },
      "maximum": {
        "readiness": -20,
        "capacity": 16,
        "score": 75,
        "outcome": "Life flight helicopter lands on pier"
      }
    }
  },
  {
    "id": 11,
    "storyArc": "Random",
    "headline": "Drive-By on 24th Street",
    "location": "Mission District",
    "description": "Shots fired from moving vehicle near BART station. Two wounded, suspect vehicle description conflicting.",
    "visual": "Urban street with BART entrance, muzzle flashes from car window, people diving for cover, murals on walls",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Bystanders call ambulances"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 20,
        "outcome": "Officers secure scene, aid victims"
      },
      "maximum": {
        "readiness": -56,
        "capacity": 40,
        "score": 100,
        "outcome": "City-wide manhunt initiated"
      }
    }
  },
  {
    "id": 12,
    "storyArc": "Random",
    "headline": "Smoke Reported on Hyde Street",
    "location": "Russian Hill",
    "description": "Apartment building fire alarm, residents evacuating. Unclear if actual fire or false alarm.",
    "visual": "Victorian apartment building, people on fire escapes, uncertain smoke, steep San Francisco street",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Residents wait on street"
      },
      "basic": {
        "readiness": -6,
        "capacity": 5,
        "score": 10,
        "outcome": "Fire chief declares false alarm"
      },
      "maximum": {
        "readiness": -28,
        "capacity": 24,
        "score": 50,
        "outcome": "Full fire response blocks traffic"
      }
    }
  },
  {
    "id": 13,
    "storyArc": "Patty Hearst",
    "headline": "Missing UC Berkeley Student",
    "location": "Berkeley/SF Border",
    "description": "19-year-old newspaper heiress Patricia Hearst reported missing from Berkeley apartment. Signs of struggle, neighbors heard screaming.",
    "visual": "College apartment building, broken door, scattered belongings, worried parents with police, newspaper headlines visible",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Parents hire private investigators"
      },
      "basic": {
        "readiness": -16,
        "capacity": 15,
        "score": 30,
        "outcome": "Missing person report filed"
      },
      "maximum": {
        "readiness": -80,
        "capacity": 48,
        "score": 125,
        "outcome": "FBI takes over investigation"
      }
    },
    "arcNumber": "P1"
  },
  {
    "id": 14,
    "storyArc": "Random",
    "headline": "Strange Man Following Women",
    "location": "Haight-Ashbury",
    "description": "Multiple reports of man following young women. Described as unkempt, muttering to himself. No direct threats.",
    "visual": "Colorful Haight Street with vintage shops, concerned women looking over shoulders, disheveled man in background",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Women avoid the area"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 10,
        "outcome": "Officer talks to man, he leaves"
      },
      "maximum": {
        "readiness": -24,
        "capacity": 16,
        "score": 50,
        "outcome": "Tactical team arrests confused man"
      }
    }
  },
  {
    "id": 15,
    "storyArc": "Zodiac",
    "headline": "Taxi Driver Shot Dead",
    "location": "Presidio Heights",
    "description": "Yellow cab found with driver slumped over wheel. Single gunshot wound. Robbery doesn't appear to be motive.",
    "visual": "Yellow taxi under streetlight, driver's silhouette slumped forward, elegant Presidio Heights homes, blood on window",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Cab company finds body"
      },
      "basic": {
        "readiness": -16,
        "capacity": 15,
        "score": 30,
        "outcome": "Homicide detectives investigate"
      },
      "maximum": {
        "readiness": -72,
        "capacity": 48,
        "score": 125,
        "outcome": "Full forensic team processes scene"
      }
    },
    "arcNumber": "Z3"
  },
  {
    "id": 16,
    "storyArc": "Random",
    "headline": "Mansion Break-In on Broadway",
    "location": "Pacific Heights",
    "description": "High-end home invasion in progress. Suspects inside, homeowners hiding in panic room.",
    "visual": "Elegant mansion with open front door, expensive cars in driveway, silhouettes moving inside",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Burglars escape with valuables"
      },
      "basic": {
        "readiness": -12,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers arrest fleeing suspects"
      },
      "maximum": {
        "readiness": -48,
        "capacity": 32,
        "score": 75,
        "outcome": "SWAT surrounds mansion"
      }
    }
  },
  {
    "id": 17,
    "storyArc": "Zodiac",
    "headline": "Newspaper Receives Death Threat",
    "location": "Chronicle Building",
    "description": "Chronicle editor reports receiving cipher with letter claiming credit for recent murders. Writer threatens school children.",
    "visual": "Newspaper building, editor holding cryptic letter with symbols, printing presses in background, worried staff",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Editor files story anyway"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Detective reviews cipher letter"
      },
      "maximum": {
        "readiness": -60,
        "capacity": 40,
        "score": 150,
        "outcome": "All schools get protection details"
      }
    },
    "arcNumber": "Z4"
  },
  {
    "id": 18,
    "storyArc": "Random",
    "headline": "Man Threatening Suicide",
    "location": "SOMA",
    "description": "Individual on fire escape threatening to jump. Blocking traffic below, crowd gathering.",
    "visual": "Modern building with person on fire escape, concerned crowd below, police negotiator with megaphone",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Crowd talks man down"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Negotiator saves life"
      },
      "maximum": {
        "readiness": -40,
        "capacity": 32,
        "score": 100,
        "outcome": "Net deployment traumatizes man"
      }
    }
  },
  {
    "id": 19,
    "storyArc": "Zodiac",
    "headline": "Witness Correction Call",
    "location": "Presidio Heights",
    "description": "Presidio Heights resident calls back - earlier description was wrong. Saw someone wiping down taxi, walking toward Presidio.",
    "visual": "Same taxi scene, but now showing white male figure walking away, wiping hands with cloth, witness at window",
    "hasVoice": true,
    "voiceScript": "Hi, I called earlier about the taxi? I need to correct something. The person I saw wasn't Black like I said before. It was a white guy, maybe 5'8\", brown hair. He was wiping down the cab with something, then walked toward the Presidio. Sorry for the confusion.",
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Correction goes unnoticed"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 20,
        "outcome": "Detective updates suspect profile"
      },
      "maximum": {
        "readiness": -20,
        "capacity": 16,
        "score": 75,
        "outcome": "Presidio searched by K9 teams"
      }
    },
    "arcNumber": "Z5"
  },
  {
    "id": 20,
    "storyArc": "Random",
    "headline": "Loud Party on Grant Avenue",
    "location": "North Beach",
    "description": "Italian restaurant's private party spilled onto street. Drunk customers, live music too loud.",
    "visual": "Italian restaurant with string lights, people spilling onto sidewalk with wine glasses, accordion player",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Party winds down naturally"
      },
      "basic": {
        "readiness": -2,
        "capacity": 5,
        "score": 10,
        "outcome": "Officer asks them to quiet down"
      },
      "maximum": {
        "readiness": -12,
        "capacity": 8,
        "score": 25,
        "outcome": "SWAT raids Italian dinner party"
      }
    }
  },
  {
    "id": 21,
    "storyArc": "Golden Dragon",
    "headline": "Gang Intelligence Report",
    "location": "Chinatown",
    "description": "Informant reports escalating tension between youth gangs. Mentions planned retaliation at popular restaurant.",
    "visual": "Dark alley in Chinatown, shadowy figure passing envelope to police, gang graffiti on walls, worried shop owners",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Intelligence filed away"
      },
      "basic": {
        "readiness": -6,
        "capacity": 10,
        "score": 20,
        "outcome": "Extra patrols in Chinatown"
      },
      "maximum": {
        "readiness": -28,
        "capacity": 24,
        "score": 75,
        "outcome": "Gang task force mobilized"
      }
    },
    "arcNumber": "G1"
  },
  {
    "id": 22,
    "storyArc": "Random",
    "headline": "Jogger Attacked by the Bay",
    "location": "Marina District",
    "description": "Female runner assaulted near Marina Green. Attacker fled toward yacht harbor. Victim conscious but beaten.",
    "visual": "Marina waterfront with Golden Gate Bridge, injured jogger being helped, concerned dog walkers",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Dog walkers help victim"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers search yacht harbor"
      },
      "maximum": {
        "readiness": -32,
        "capacity": 24,
        "score": 75,
        "outcome": "Coast Guard searches waterfront"
      }
    }
  },
  {
    "id": 23,
    "storyArc": "Patty Hearst",
    "headline": "Ransom Demand Received",
    "location": "Chronicle Building",
    "description": "Hearst family receives audio tape demanding food distribution to poor. Voice claims to be Symbionese Liberation Army.",
    "visual": "Chronicle newsroom, family members listening to tape recorder, FBI agents taking notes, worried editors",
    "hasVoice": true,
    "voiceScript": "This is the Symbionese Liberation Army. We have Patricia Campbell Hearst. She will be released when the fascist Hearst family meets our demands for food distribution to the poor and oppressed people of California.",
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Family negotiates privately"
      },
      "basic": {
        "readiness": -10,
        "capacity": 10,
        "score": 20,
        "outcome": "FBI analyzes voice tape"
      },
      "maximum": {
        "readiness": -48,
        "capacity": 32,
        "score": 100,
        "outcome": "Full federal task force created"
      }
    },
    "arcNumber": "P2"
  },
  {
    "id": 24,
    "storyArc": "Random",
    "headline": "Multi-Vehicle Pileup",
    "location": "Bay Bridge",
    "description": "Chain reaction crash during rush hour. At least 8 vehicles involved, bridge partially blocked.",
    "visual": "Bay Bridge with crashed cars, traffic backed up, helicopter overhead, emergency vehicles, city skyline",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Traffic backs up for hours"
      },
      "basic": {
        "readiness": -16,
        "capacity": 20,
        "score": 30,
        "outcome": "Emergency crews clear bridge"
      },
      "maximum": {
        "readiness": -60,
        "capacity": 48,
        "score": 100,
        "outcome": "Bridge closed, helicopter rescues"
      }
    }
  },
  {
    "id": 25,
    "storyArc": "Zodiac",
    "headline": "School Bus Threat",
    "location": "Presidio Elementary",
    "description": "Man claims to be watching school. Says he has gun and will \"pick off the kiddies as they come bouncing out.\"",
    "visual": "School playground with children, yellow school bus, crosshairs overlay effect, worried teacher ushering kids inside",
    "hasVoice": true,
    "voiceScript": "I am the same person who calls claiming to be the Zodiac. I am now watching a school bus full of little darlings. I am armed with a high-powered rifle with a scope. If you don't want me to pick off the kiddies as they come bouncing out, you will do exactly as I say.",
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "School continues normal dismissal"
      },
      "basic": {
        "readiness": -20,
        "capacity": 20,
        "score": 40,
        "outcome": "School locked down immediately"
      },
      "maximum": {
        "readiness": -120,
        "capacity": 64,
        "score": 200,
        "outcome": "SWAT surrounds entire school"
      }
    },
    "arcNumber": "Z6"
  },
  {
    "id": 26,
    "storyArc": "Random",
    "headline": "Japanese Tea Garden Damaged",
    "location": "Golden Gate Park",
    "description": "Vandals destroyed bonsai trees and stone lanterns. Security camera shows three teenagers.",
    "visual": "Beautiful tea garden with broken lanterns, damaged bonsai, security camera footage inset, upset groundskeeper",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Groundskeeper files insurance claim"
      },
      "basic": {
        "readiness": -6,
        "capacity": 5,
        "score": 10,
        "outcome": "Officer reviews security footage"
      },
      "maximum": {
        "readiness": -24,
        "capacity": 24,
        "score": 75,
        "outcome": "Crime scene team processes garden"
      }
    }
  },
  {
    "id": 27,
    "storyArc": "Marina Gas",
    "headline": "Gas Leak Reported",
    "location": "Marina District",
    "description": "PG&E worker reports strong gas smell near apartment complex. Residents complain of headaches, possible major leak.",
    "visual": "Apartment building with PG&E truck, worker with gas detector, residents being evacuated, worried faces",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "PG&E worker calls fire dept"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Fire chief checks gas levels"
      },
      "maximum": {
        "readiness": -40,
        "capacity": 32,
        "score": 100,
        "outcome": "Hazmat team evacuates building"
      }
    },
    "arcNumber": "M1"
  },
  {
    "id": 28,
    "storyArc": "Random",
    "headline": "Executive Collapses in Office",
    "location": "Financial District",
    "description": "High-stress businessman suffered cardiac event during board meeting. Company requesting discrete response.",
    "visual": "Modern office building, business people in suits looking worried, paramedics arriving, stock ticker visible",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Company calls private ambulance"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 10,
        "outcome": "Discrete medical response"
      },
      "maximum": {
        "readiness": -16,
        "capacity": 16,
        "score": 50,
        "outcome": "Full emergency response disrupts meeting"
      }
    }
  },
  {
    "id": 29,
    "storyArc": "Cable Car",
    "headline": "Brake System Warning",
    "location": "Powell Street",
    "description": "Cable car operator reports brake problems on steep descent. Tourists aboard, approaching busy intersection.",
    "visual": "Cable car on steep hill, worried operator pulling brake lever, tourists looking concerned, busy intersection ahead",
    "hasVoice": true,
    "voiceScript": "Control, this is Car 26 on Powell Street. I've got brake problems coming down toward Market. The brakes are barely holding and I've got a full load of tourists. I need help now!",
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Cable car stops using emergency brake"
      },
      "basic": {
        "readiness": -6,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers block intersection"
      },
      "maximum": {
        "readiness": -32,
        "capacity": 32,
        "score": 100,
        "outcome": "Fire trucks create safety barriers"
      }
    },
    "arcNumber": "C1"
  },
  {
    "id": 30,
    "storyArc": "Random",
    "headline": "Theft at Macy's",
    "location": "Union Square",
    "description": "Store security detained suspected shoplifter. Routine retail theft, no weapons involved.",
    "visual": "Busy department store, security guard with detained person, holiday decorations, shoppers with bags",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Security handles it internally"
      },
      "basic": {
        "readiness": -2,
        "capacity": 5,
        "score": 10,
        "outcome": "Officer takes shoplifter to station"
      },
      "maximum": {
        "readiness": -8,
        "capacity": 8,
        "score": 25,
        "outcome": "SWAT raids department store"
      }
    }
  },
  {
    "id": 31,
    "storyArc": "Moscone-Milk",
    "headline": "City Hall Security Breach",
    "location": "City Hall",
    "description": "Former supervisor Dan White seen entering City Hall through basement window. Had been denied meeting with Mayor Moscone.",
    "visual": "San Francisco City Hall dome, figure climbing through basement window, security guard noticing, political protest signs visible",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Security guard handles alone"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 30,
        "outcome": "Officers escort White out"
      },
      "maximum": {
        "readiness": -56,
        "capacity": 40,
        "score": 125,
        "outcome": "City Hall evacuated and searched"
      }
    },
    "arcNumber": "M1"
  },
  {
    "id": 32,
    "storyArc": "Random",
    "headline": "Late Night House Party",
    "location": "Sunset District",
    "description": "Residential neighborhood complaining about loud music. College students celebrating graduation.",
    "visual": "Suburban house with lights on, music notes floating out, college-age people on porch, annoyed neighbors",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Party ends at sunrise"
      },
      "basic": {
        "readiness": -2,
        "capacity": 5,
        "score": 10,
        "outcome": "Officer asks them to quiet down"
      },
      "maximum": {
        "readiness": -8,
        "capacity": 8,
        "score": 25,
        "outcome": "Noise violation arrests made"
      }
    }
  },
  {
    "id": 33,
    "storyArc": "Random",
    "headline": "Bicycle Theft Ring",
    "location": "Golden Gate Park",
    "description": "Multiple reports of expensive bikes stolen near park entrances. Organized operation suspected.",
    "visual": "Park entrance with bike racks, suspicious van, people loading bikes, cyclists looking around worried",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Thieves escape with bikes"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers arrest bike thieves"
      },
      "maximum": {
        "readiness": -32,
        "capacity": 24,
        "score": 75,
        "outcome": "Full park surrounded by police"
      }
    }
  },
  {
    "id": 34,
    "storyArc": "Golden Dragon",
    "headline": "Restaurant Shooting",
    "location": "Chinatown",
    "description": "Multiple gunshots reported at Golden Dragon restaurant. Several casualties, shooters fled on foot toward Grant Avenue.",
    "visual": "Restaurant with shattered windows, people running in panic, police cars arriving, Chinese lanterns swaying overhead",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Victims bleed while waiting"
      },
      "basic": {
        "readiness": -16,
        "capacity": 20,
        "score": 40,
        "outcome": "Paramedics treat wounded"
      },
      "maximum": {
        "readiness": -80,
        "capacity": 56,
        "score": 150,
        "outcome": "Full emergency response mobilized"
      }
    },
    "arcNumber": "G2"
  },
  {
    "id": 35,
    "storyArc": "Random",
    "headline": "Art Gallery Break-In",
    "location": "SOMA",
    "description": "Thieves targeting expensive paintings. Silent alarm, but suspects may still be inside building.",
    "visual": "Modern art gallery with broken glass, paintings askew, shadowy figures with flashlights, valuable art visible",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Thieves escape with masterpieces"
      },
      "basic": {
        "readiness": -10,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers catch thieves inside"
      },
      "maximum": {
        "readiness": -40,
        "capacity": 24,
        "score": 75,
        "outcome": "SWAT breaches gallery"
      }
    }
  },
  {
    "id": 36,
    "storyArc": "Patty Hearst",
    "headline": "Bank Robbery in Progress",
    "location": "Sunset District",
    "description": "Armed robbery at Hibernia Bank. Witnesses report female suspect resembling missing Hearst heiress among robbers.",
    "visual": "Bank exterior with police cars, shocked witnesses pointing, security camera footage showing armed figures, media arriving",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Robbers escape with money"
      },
      "basic": {
        "readiness": -20,
        "capacity": 20,
        "score": 50,
        "outcome": "Police surround bank"
      },
      "maximum": {
        "readiness": -100,
        "capacity": 64,
        "score": 175,
        "outcome": "FBI takes over bank siege"
      }
    },
    "arcNumber": "P3"
  },
  {
    "id": 37,
    "storyArc": "Random",
    "headline": "Food Truck Fire",
    "location": "Mission District",
    "description": "Propane explosion at taco truck. One injured, fire spreading to nearby building.",
    "visual": "Taco truck engulfed in flames, injured person being helped, fire spreading to adjacent building, crowd backing away",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Fire spreads to building"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Fire contained to truck"
      },
      "maximum": {
        "readiness": -36,
        "capacity": 32,
        "score": 75,
        "outcome": "Full hazmat team responds"
      }
    }
  },
  {
    "id": 38,
    "storyArc": "Zodiac",
    "headline": "Suspicious Activity at Bus Stop",
    "location": "Muni Stop",
    "description": "Transit worker reports man matching Zodiac description loitering near bus stop with children. Taking notes.",
    "visual": "Muni bus stop with children waiting, suspicious figure with notepad partially hidden behind pole, worried transit worker",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Man disappears before bus arrives"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 30,
        "outcome": "Officers question suspicious man"
      },
      "maximum": {
        "readiness": -72,
        "capacity": 48,
        "score": 175,
        "outcome": "All school buses get escorts"
      }
    },
    "arcNumber": "Z7"
  },
  {
    "id": 39,
    "storyArc": "Random",
    "headline": "Chinatown Medicinal Shop Robbery",
    "location": "Chinatown",
    "description": "Armed robbery at traditional medicine shop. Elderly proprietor injured, suspects took rare herbs.",
    "visual": "Traditional shop with hanging herbs, elderly man on floor, overturned jars, worried family members arriving",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Family calls ambulance"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Paramedics treat shop owner"
      },
      "maximum": {
        "readiness": -32,
        "capacity": 24,
        "score": 75,
        "outcome": "Chinatown cordoned off"
      }
    }
  },
  {
    "id": 40,
    "storyArc": "Marina Gas",
    "headline": "Evacuation Orders",
    "location": "Marina District",
    "description": "Gas leak confirmed dangerous. Fire department ordering immediate evacuation of 6-block radius. Potential explosion risk.",
    "visual": "Multiple fire trucks, residents carrying belongings, evacuation barriers, worried families with pets and children",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Fire dept evacuates anyway"
      },
      "basic": {
        "readiness": -16,
        "capacity": 20,
        "score": 40,
        "outcome": "Controlled evacuation proceeds"
      },
      "maximum": {
        "readiness": -80,
        "capacity": 64,
        "score": 150,
        "outcome": "Emergency broadcast, mass exodus"
      }
    },
    "arcNumber": "M2"
  },
  {
    "id": 41,
    "storyArc": "Random",
    "headline": "Pier 39 Pickpocket Ring",
    "location": "Fisherman's Wharf",
    "description": "Coordinated pickpocket operation targeting tourists. Multiple victims, suspects working in teams.",
    "visual": "Crowded pier with tourists, pickpockets working in background, victims checking empty pockets, sea lions visible",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Tourists lose wallets and phones"
      },
      "basic": {
        "readiness": -6,
        "capacity": 10,
        "score": 10,
        "outcome": "Undercover cops arrest ring"
      },
      "maximum": {
        "readiness": -24,
        "capacity": 24,
        "score": 50,
        "outcome": "Full pier shutdown for searches"
      }
    }
  },
  {
    "id": 42,
    "storyArc": "Moscone-Milk",
    "headline": "Shots Fired at City Hall",
    "location": "City Hall",
    "description": "Multiple gunshots reported inside City Hall. Mayor Moscone and Supervisor Milk both shot. Suspect still inside building.",
    "visual": "City Hall interior with police rushing in, paramedics, shocked staff evacuating, political offices in chaos",
    "hasVoice": true,
    "voiceScript": "Shots fired inside City Hall! Multiple shots! The Mayor's been shot! Harvey Milk too! Oh god, there's so much blood. The shooter might still be in here!",
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Gunman escapes in chaos"
      },
      "basic": {
        "readiness": -24,
        "capacity": 25,
        "score": 60,
        "outcome": "Officers secure crime scene"
      },
      "maximum": {
        "readiness": -120,
        "capacity": 80,
        "score": 225,
        "outcome": "Full emergency lockdown activated"
      }
    },
    "arcNumber": "M2"
  },
  {
    "id": 43,
    "storyArc": "Random",
    "headline": "Castro Street Medical Emergency",
    "location": "Castro District",
    "description": "Man collapsed during Pride parade preparation. Possible heat stroke, large crowd gathering.",
    "visual": "Rainbow flags everywhere, collapsed person, parade floats in background, concerned crowd, paramedics arriving",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Parade volunteers help"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 10,
        "outcome": "Paramedics treat heat stroke"
      },
      "maximum": {
        "readiness": -20,
        "capacity": 16,
        "score": 50,
        "outcome": "Life flight disrupts parade prep"
      }
    }
  },
  {
    "id": 44,
    "storyArc": "Cable Car",
    "headline": "Cable Car Collision",
    "location": "Powell & Market",
    "description": "Cable car failed to stop, collided with vehicle at busy intersection. Multiple injuries, cable system damaged.",
    "visual": "Intersection with damaged cable car, crashed car, injured tourists, cable hanging loose, traffic chaos",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Tourists help each other"
      },
      "basic": {
        "readiness": -14,
        "capacity": 15,
        "score": 30,
        "outcome": "Emergency crews treat injured"
      },
      "maximum": {
        "readiness": -60,
        "capacity": 48,
        "score": 125,
        "outcome": "Full system shutdown, massive response"
      }
    },
    "arcNumber": "C2"
  },
  {
    "id": 45,
    "storyArc": "Random",
    "headline": "Lombard Street Tourist Accident",
    "location": "Lombard Street",
    "description": "Tourist fell while taking selfie on famous curved street. Head injury, blocking traffic.",
    "visual": "Crooked street with tourist on ground, phone scattered, worried other tourists, backed up traffic, cable car waiting",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Other tourists call ambulance"
      },
      "basic": {
        "readiness": -6,
        "capacity": 5,
        "score": 10,
        "outcome": "Paramedics treat head injury"
      },
      "maximum": {
        "readiness": -24,
        "capacity": 16,
        "score": 50,
        "outcome": "Life flight blocks famous street"
      }
    }
  },
  {
    "id": 46,
    "storyArc": "Patty Hearst",
    "headline": "SLA Safehouse Raided",
    "location": "Mission District",
    "description": "SWAT team raids suspected SLA hideout. Reports of automatic weapons fire. Hearst may be inside.",
    "visual": "SWAT vehicles surrounding apartment building, officers with shields, smoke, worried neighbors watching from windows",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "FBI conducts raid alone"
      },
      "basic": {
        "readiness": -30,
        "capacity": 30,
        "score": 50,
        "outcome": "SWAT provides backup support"
      },
      "maximum": {
        "readiness": -140,
        "capacity": 96,
        "score": 200,
        "outcome": "Full military-style siege"
      }
    },
    "arcNumber": "P4"
  },
  {
    "id": 47,
    "storyArc": "Random",
    "headline": "Golden Gate Bridge Jumper",
    "location": "Golden Gate Bridge",
    "description": "Person threatening suicide on bridge. Traffic stopped, negotiator en route.",
    "visual": "Golden Gate Bridge with person on edge, stopped cars, police negotiator approaching, coast guard boat below",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Commuters talk person down"
      },
      "basic": {
        "readiness": -16,
        "capacity": 15,
        "score": 30,
        "outcome": "Negotiator saves life"
      },
      "maximum": {
        "readiness": -60,
        "capacity": 40,
        "score": 125,
        "outcome": "Bridge closed, helicopter rescue"
      }
    }
  },
  {
    "id": 48,
    "storyArc": "Golden Dragon",
    "headline": "Community Fear Response",
    "location": "Chinatown",
    "description": "Entire Chinatown community in panic after restaurant shooting. Shop owners closing early, demanding protection.",
    "visual": "Empty Chinatown streets, shops with \"closed\" signs, worried community leaders meeting, police patrol cars",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Community forms own patrols"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 30,
        "outcome": "Extra patrols reassure community"
      },
      "maximum": {
        "readiness": -48,
        "capacity": 48,
        "score": 125,
        "outcome": "Chinatown under police occupation"
      }
    },
    "arcNumber": "G3"
  },
  {
    "id": 49,
    "storyArc": "Random",
    "headline": "Haight Street Drug Deal",
    "location": "Haight-Ashbury",
    "description": "Undercover officer requests backup for drug bust. Multiple suspects, weapons possible.",
    "visual": "Colorful Haight Street, undercover officer signaling, suspicious group exchanging packages, worried shopkeepers",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Undercover officer aborts"
      },
      "basic": {
        "readiness": -10,
        "capacity": 10,
        "score": 20,
        "outcome": "Drug dealers arrested quietly"
      },
      "maximum": {
        "readiness": -40,
        "capacity": 32,
        "score": 75,
        "outcome": "SWAT raids hippie drug deal"
      }
    }
  },
  {
    "id": 50,
    "storyArc": "Zodiac",
    "headline": "Final Taunting Call",
    "location": "Phone Call",
    "description": "Calm voice: \"This is the Zodiac speaking. I am the murderer of the taxi driver. To prove this, here is...\" Line goes dead.",
    "visual": "Phone booth at night, piece of bloody fabric, dispatcher's shocked face, police bulletin board with Zodiac photos",
    "hasVoice": true,
    "voiceScript": "This is the Zodiac speaking. I am the murderer of the taxi driver over by Washington Street and Maple. To prove this, here is a blood-stained piece of his shirt. I am the same person who did in the people in the blue car. And if you don't believe me, I'll do something nasty.",
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Call treated as hoax"
      },
      "basic": {
        "readiness": -10,
        "capacity": 10,
        "score": 40,
        "outcome": "Detectives investigate call"
      },
      "maximum": {
        "readiness": -80,
        "capacity": 64,
        "score": 225,
        "outcome": "City-wide Zodiac task force activated"
      }
    },
    "arcNumber": "Z8"
  },
  {
    "id": 51,
    "storyArc": "Random",
    "headline": "Fisherman's Wharf Brawl",
    "location": "Fisherman's Wharf",
    "description": "Large fight between street performers over territory. Tourists scared, vendors affected.",
    "visual": "Pier with costumed performers fighting, tourists running, overturned merchandise, sea lions barking in background",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Performers sort it out"
      },
      "basic": {
        "readiness": -6,
        "capacity": 10,
        "score": 10,
        "outcome": "Officers separate performers"
      },
      "maximum": {
        "readiness": -28,
        "capacity": 24,
        "score": 50,
        "outcome": "SWAT arrests costumed performers"
      }
    }
  },
  {
    "id": 52,
    "storyArc": "Marina Gas",
    "headline": "Gas Explosion",
    "location": "Marina District",
    "description": "Major gas explosion destroys apartment building. Multiple casualties, fire spreading to adjacent structures.",
    "visual": "Massive explosion with fire and smoke, destroyed building, rescue workers, ambulances, shocked evacuees",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Disaster spreads unchecked"
      },
      "basic": {
        "readiness": -40,
        "capacity": 40,
        "score": 60,
        "outcome": "Emergency crews contain disaster"
      },
      "maximum": {
        "readiness": -200,
        "capacity": 120,
        "score": 250,
        "outcome": "Full disaster response mobilized"
      }
    },
    "arcNumber": "M3"
  },
  {
    "id": 53,
    "storyArc": "Random",
    "headline": "Union Square Flash Mob",
    "location": "Union Square",
    "description": "Large unauthorized gathering disrupting shopping district. No violence but crowd control needed.",
    "visual": "Crowded plaza with dancers, confused shoppers, police trying to manage crowd, department stores in background",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Flash mob disperses naturally"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 10,
        "outcome": "Officers guide crowd flow"
      },
      "maximum": {
        "readiness": -20,
        "capacity": 24,
        "score": 50,
        "outcome": "Riot squad breaks up dancers"
      }
    }
  },
  {
    "id": 54,
    "storyArc": "Cable Car",
    "headline": "System-Wide Cable Failure",
    "location": "Multiple Lines",
    "description": "Cable car system experiencing city-wide failures. Multiple cars stranded with passengers, tourist safety concern.",
    "visual": "Multiple cable cars stopped on hills, worried passengers, tourists with luggage, maintenance crews responding",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Tourists walk down steep hills"
      },
      "basic": {
        "readiness": -20,
        "capacity": 25,
        "score": 40,
        "outcome": "Buses evacuate stranded tourists"
      },
      "maximum": {
        "readiness": -100,
        "capacity": 80,
        "score": 175,
        "outcome": "Helicopters evacuate cable cars"
      }
    },
    "arcNumber": "C3"
  },
  {
    "id": 55,
    "storyArc": "Random",
    "headline": "North Beach Restaurant Fire",
    "location": "North Beach",
    "description": "Kitchen fire spreading through Italian restaurant. Adjacent buildings at risk.",
    "visual": "Italian restaurant with flames visible, worried chef outside, firefighters arriving, neighboring cafes evacuating",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Fire spreads to three buildings"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 30,
        "outcome": "Fire contained to restaurant"
      },
      "maximum": {
        "readiness": -48,
        "capacity": 40,
        "score": 100,
        "outcome": "Full hazmat response for kitchen fire"
      }
    }
  },
  {
    "id": 56,
    "storyArc": "Patty Hearst",
    "headline": "Hearst Arrest",
    "location": "Mission District",
    "description": "Patricia Hearst captured during FBI raid. Found with weapons and SLA propaganda. Major media response.",
    "visual": "FBI agents with arrested woman, media trucks arriving, curious neighbors, evidence bags being carried out",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "FBI handles arrest alone"
      },
      "basic": {
        "readiness": -16,
        "capacity": 15,
        "score": 40,
        "outcome": "Police assist with crowd control"
      },
      "maximum": {
        "readiness": -60,
        "capacity": 48,
        "score": 150,
        "outcome": "Full media circus management"
      }
    },
    "arcNumber": "P5"
  },
  {
    "id": 57,
    "storyArc": "Random",
    "headline": "Richmond District Home Invasion",
    "location": "Richmond District",
    "description": "Family held hostage during home invasion. Suspects armed, negotiator requested.",
    "visual": "Suburban house with police cars, SWAT team positioning, worried neighbors behind barriers, family car in driveway",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Family escapes through window"
      },
      "basic": {
        "readiness": -16,
        "capacity": 15,
        "score": 30,
        "outcome": "Negotiator frees family safely"
      },
      "maximum": {
        "readiness": -72,
        "capacity": 48,
        "score": 125,
        "outcome": "Full SWAT siege of house"
      }
    }
  },
  {
    "id": 58,
    "storyArc": "Moscone-Milk",
    "headline": "Dan White Surrenders",
    "location": "Northern Station",
    "description": "Former supervisor Dan White turns himself in. Confesses to shooting Mayor Moscone and Supervisor Milk.",
    "visual": "Police station with man in custody, lawyers arriving, media gathering outside, shocked police officers",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "White waits at front desk"
      },
      "basic": {
        "readiness": -6,
        "capacity": 10,
        "score": 30,
        "outcome": "Officers process confession"
      },
      "maximum": {
        "readiness": -24,
        "capacity": 24,
        "score": 100,
        "outcome": "Full protective custody protocol"
      }
    },
    "arcNumber": "M3"
  },
  {
    "id": 59,
    "storyArc": "Random",
    "headline": "Crissy Field Dog Attack",
    "location": "Presidio",
    "description": "Large dog attacked jogger near Golden Gate Bridge. Owner fled scene, victim needs medical attention.",
    "visual": "Waterfront with Golden Gate Bridge, injured jogger, concerned dog walkers, large dog visible in distance",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Dog walkers help victim"
      },
      "basic": {
        "readiness": -6,
        "capacity": 5,
        "score": 10,
        "outcome": "Animal control captures dog"
      },
      "maximum": {
        "readiness": -24,
        "capacity": 16,
        "score": 50,
        "outcome": "K9 unit hunts dangerous dog"
      }
    }
  },
  {
    "id": 60,
    "storyArc": "Moscone-Milk",
    "headline": "City Hall Riots Begin",
    "location": "Civic Center",
    "description": "Angry crowds gathering at City Hall demanding justice. Windows broken, police cars overturned.",
    "visual": "Chaotic scene with broken windows, overturned police cars, angry protesters, smoke, riot police forming lines",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Riots spread unchecked"
      },
      "basic": {
        "readiness": -20,
        "capacity": 25,
        "score": 40,
        "outcome": "Riot police contain crowd"
      },
      "maximum": {
        "readiness": -100,
        "capacity": 80,
        "score": 175,
        "outcome": "Full martial law declared"
      }
    },
    "arcNumber": "M4"
  },
  {
    "id": 61,
    "storyArc": "Random",
    "headline": "Telegraph Hill Burglary",
    "location": "Telegraph Hill",
    "description": "Cat burglar targeting expensive homes. Multiple break-ins reported, suspect uses roof access.",
    "visual": "Hillside homes with Coit Tower, figure on rooftop, broken windows, worried homeowners calling police",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Burglar hits six more houses"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers catch cat burglar"
      },
      "maximum": {
        "readiness": -36,
        "capacity": 32,
        "score": 75,
        "outcome": "Helicopter searches all rooftops"
      }
    }
  },
  {
    "id": 62,
    "storyArc": "Random",
    "headline": "Mission Dolores Vandalism",
    "location": "Mission District",
    "description": "Historic church vandalized with graffiti. Community leaders demanding investigation.",
    "visual": "Beautiful old mission church with spray paint, angry community members, priest surveying damage, news crews",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Community cleans graffiti"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 10,
        "outcome": "Officer takes vandalism report"
      },
      "maximum": {
        "readiness": -20,
        "capacity": 16,
        "score": 75,
        "outcome": "Crime scene team dusts church"
      }
    }
  },
  {
    "id": 63,
    "storyArc": "Random",
    "headline": "Alcatraz Tour Boat Emergency",
    "location": "Alcatraz Island",
    "description": "Tourist boat experiencing engine failure near Alcatraz. Coast Guard assistance requested.",
    "visual": "Tour boat listing in choppy water, Alcatraz Island in background, worried tourists in life jackets, Coast Guard approaching",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Coast Guard handles rescue"
      },
      "basic": {
        "readiness": -6,
        "capacity": 5,
        "score": 20,
        "outcome": "Police boat assists Coast Guard"
      },
      "maximum": {
        "readiness": -28,
        "capacity": 24,
        "score": 75,
        "outcome": "Full maritime rescue mobilized"
      }
    }
  },
  {
    "id": 64,
    "storyArc": "Moscone-Milk",
    "headline": "Castro District Violence",
    "location": "Castro District",
    "description": "Riots spread to Castro. Harvey Milk's supporters clashing with police. Multiple fires, extensive property damage.",
    "visual": "Castro Street with overturned cars burning, broken windows, riot police with shields, rainbow flags torn",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Castro burns while police watch"
      },
      "basic": {
        "readiness": -24,
        "capacity": 30,
        "score": 50,
        "outcome": "Riot control restores order"
      },
      "maximum": {
        "readiness": -120,
        "capacity": 96,
        "score": 200,
        "outcome": "Military intervenes in Castro"
      }
    },
    "arcNumber": "M5"
  },
  {
    "id": 65,
    "storyArc": "Random",
    "headline": "Chinatown Elderly Scam",
    "location": "Chinatown",
    "description": "Elderly Chinese woman scammed out of life savings. Suspects targeted language barrier.",
    "visual": "Traditional shop with elderly woman crying, translator helping, concerned family members, police taking notes",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Family handles matter privately"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 10,
        "outcome": "Detective investigates scam"
      },
      "maximum": {
        "readiness": -20,
        "capacity": 16,
        "score": 75,
        "outcome": "Fraud task force mobilized"
      }
    }
  },
  {
    "id": 66,
    "storyArc": "Random",
    "headline": "SOMA Warehouse Rave",
    "location": "SOMA",
    "description": "Illegal rave in abandoned warehouse. Fire hazard, drug use reported, hundreds of people inside.",
    "visual": "Industrial building with loud music, young people streaming out, DJ equipment visible, worried fire inspector",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Rave continues until dawn"
      },
      "basic": {
        "readiness": -10,
        "capacity": 15,
        "score": 20,
        "outcome": "Fire marshal shuts down rave"
      },
      "maximum": {
        "readiness": -48,
        "capacity": 48,
        "score": 100,
        "outcome": "SWAT raids warehouse rave"
      }
    }
  },
  {
    "id": 67,
    "storyArc": "Random",
    "headline": "Golden Gate Park Concert",
    "location": "Golden Gate Park",
    "description": "Unauthorized concert drawing large crowd. No permits, noise complaints from neighborhood.",
    "visual": "Park meadow with makeshift stage, large crowd, musicians performing, nearby residents complaining",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Concert ends peacefully"
      },
      "basic": {
        "readiness": -6,
        "capacity": 10,
        "score": 10,
        "outcome": "Officers ask for permit, dispersal"
      },
      "maximum": {
        "readiness": -32,
        "capacity": 32,
        "score": 75,
        "outcome": "Riot squad breaks up concert"
      }
    }
  },
  {
    "id": 68,
    "storyArc": "Random",
    "headline": "Nob Hill Hotel Robbery",
    "location": "Nob Hill",
    "description": "Armed robbery at luxury hotel. Suspects targeted wealthy guests, hotel staff traumatized.",
    "visual": "Elegant hotel lobby with overturned furniture, frightened guests, security cameras, expensive decor",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Hotel security handles it"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 30,
        "outcome": "Detectives interview witnesses"
      },
      "maximum": {
        "readiness": -48,
        "capacity": 40,
        "score": 100,
        "outcome": "Full forensic team processes hotel"
      }
    }
  },
  {
    "id": 69,
    "storyArc": "Random",
    "headline": "Embarcadero Hit and Run",
    "location": "Embarcadero",
    "description": "Cyclist struck by vehicle near Ferry Building. Driver fled scene, victim critical condition.",
    "visual": "Waterfront with Ferry Building, injured cyclist, damaged bike, witnesses pointing down street",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Witnesses call ambulance"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers search for hit-run driver"
      },
      "maximum": {
        "readiness": -32,
        "capacity": 24,
        "score": 75,
        "outcome": "City-wide BOLO for vehicle"
      }
    }
  },
  {
    "id": 70,
    "storyArc": "Random",
    "headline": "Russian Hill Apartment Fire",
    "location": "Russian Hill",
    "description": "Electrical fire in Victorian apartment building. Residents trapped on upper floors.",
    "visual": "Victorian building with flames visible, people on fire escapes, ladder truck arriving, steep street complicating access",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Residents jump to safety"
      },
      "basic": {
        "readiness": -16,
        "capacity": 20,
        "score": 40,
        "outcome": "Fire department rescues residents"
      },
      "maximum": {
        "readiness": -60,
        "capacity": 56,
        "score": 125,
        "outcome": "Full emergency response mobilized"
      }
    }
  },
  {
    "id": 71,
    "storyArc": "Random",
    "headline": "Pacific Heights Car Chase",
    "location": "Pacific Heights",
    "description": "High-speed pursuit through residential area. Suspect vehicle damaged, endangering pedestrians.",
    "visual": "Expensive neighborhood with damaged sports car, police cars in pursuit, concerned wealthy residents",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Suspect crashes into mansion gate"
      },
      "basic": {
        "readiness": -10,
        "capacity": 15,
        "score": 20,
        "outcome": "Police safely end pursuit"
      },
      "maximum": {
        "readiness": -40,
        "capacity": 40,
        "score": 75,
        "outcome": "Helicopter tracks luxury car chase"
      }
    }
  },
  {
    "id": 72,
    "storyArc": "Random",
    "headline": "Sunset District Block Party",
    "location": "Sunset District",
    "description": "Neighborhood block party got out of hand. Noise complaints, underage drinking, permit issues.",
    "visual": "Residential street with tables set up, families with children, teenagers drinking, annoyed neighbors calling",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Party organizers clean up"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 10,
        "outcome": "Officers check permits, disperse"
      },
      "maximum": {
        "readiness": -16,
        "capacity": 16,
        "score": 50,
        "outcome": "SWAT breaks up block party"
      }
    }
  },
  {
    "id": 73,
    "storyArc": "Random",
    "headline": "Market Street Knife Fight",
    "location": "Market Street",
    "description": "Two homeless men fighting with knives. Multiple witnesses, one seriously injured.",
    "visual": "Busy Market Street with people backing away, two men fighting, blood visible, concerned passersby calling 911",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Bystanders break up fight"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers disarm combatants"
      },
      "maximum": {
        "readiness": -32,
        "capacity": 24,
        "score": 75,
        "outcome": "SWAT responds to knife fight"
      }
    }
  },
  {
    "id": 74,
    "storyArc": "Random",
    "headline": "Japantown Festival Incident",
    "location": "Japantown",
    "description": "Cultural festival disrupted by protesters. Tensions rising, families with children present.",
    "visual": "Traditional Japanese buildings, festival booths, worried families, protesters with signs, police barriers",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Community mediates dispute"
      },
      "basic": {
        "readiness": -6,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers separate groups"
      },
      "maximum": {
        "readiness": -28,
        "capacity": 32,
        "score": 75,
        "outcome": "Riot squad surrounds festival"
      }
    }
  },
  {
    "id": 75,
    "storyArc": "Random",
    "headline": "Twin Peaks Lookout Robbery",
    "location": "Twin Peaks",
    "description": "Tourists robbed at scenic overlook. Suspects escaped down hiking trail, victims injured.",
    "visual": "Scenic overlook with city view, tourists helping injured couple, abandoned camera equipment, trail visible",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Tourists help each other"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers search hiking trails"
      },
      "maximum": {
        "readiness": -32,
        "capacity": 32,
        "score": 75,
        "outcome": "Helicopter searches all trails"
      }
    }
  },
  {
    "id": 76,
    "storyArc": "Random",
    "headline": "Financial District Bomb Threat",
    "location": "Financial District",
    "description": "Anonymous caller threatens to bomb bank building. Evacuation in progress, suspicious package reported.",
    "visual": "Modern bank building, people evacuating with hands up, bomb squad arriving, worried office workers",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Building security handles evacuation"
      },
      "basic": {
        "readiness": -16,
        "capacity": 20,
        "score": 40,
        "outcome": "Bomb squad clears building"
      },
      "maximum": {
        "readiness": -80,
        "capacity": 64,
        "score": 175,
        "outcome": "Full district lockdown initiated"
      }
    }
  },
  {
    "id": 77,
    "storyArc": "Random",
    "headline": "Tenderloin Hotel Fire",
    "location": "Tenderloin",
    "description": "SRO hotel fire, elderly residents need evacuation assistance. Building code violations suspected.",
    "visual": "Run-down hotel with smoke, elderly residents being helped down stairs, fire trucks, social workers arriving",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Residents evacuate themselves"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 30,
        "outcome": "Fire dept assists elderly residents"
      },
      "maximum": {
        "readiness": -60,
        "capacity": 56,
        "score": 125,
        "outcome": "Full hazmat response for SRO fire"
      }
    }
  },
  {
    "id": 78,
    "storyArc": "Random",
    "headline": "Balboa Park Gang Fight",
    "location": "Balboa Park",
    "description": "Large gang fight near high school. Multiple weapons, students running, school lockdown initiated.",
    "visual": "Park near school with teenagers fighting, backpacks scattered, worried parents arriving, school in background",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "School security handles situation"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 30,
        "outcome": "Officers break up gang fight"
      },
      "maximum": {
        "readiness": -56,
        "capacity": 48,
        "score": 125,
        "outcome": "SWAT secures entire school area"
      }
    }
  },
  {
    "id": 79,
    "storyArc": "Random",
    "headline": "Ocean Beach Drowning",
    "location": "Ocean Beach",
    "description": "Swimmer caught in riptide, lifeguards requesting assistance. Rough surf conditions.",
    "visual": "Beach with large waves, lifeguards in water, person struggling, concerned beachgoers, rescue equipment",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Lifeguards attempt rescue alone"
      },
      "basic": {
        "readiness": -6,
        "capacity": 5,
        "score": 20,
        "outcome": "Coast Guard assists rescue"
      },
      "maximum": {
        "readiness": -24,
        "capacity": 24,
        "score": 75,
        "outcome": "Full maritime rescue deployed"
      }
    }
  },
  {
    "id": 80,
    "storyArc": "Random",
    "headline": "Hayes Valley Art Walk",
    "location": "Hayes Valley",
    "description": "Art walk event blocking traffic, no proper permits. Artists and vendors arguing with police.",
    "visual": "Street lined with art booths, artists displaying work, frustrated vendors, police trying to clear street",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Artists pack up voluntarily"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 10,
        "outcome": "Officers negotiate compromise"
      },
      "maximum": {
        "readiness": -20,
        "capacity": 24,
        "score": 50,
        "outcome": "SWAT raids art walk"
      }
    }
  },
  {
    "id": 81,
    "storyArc": "Random",
    "headline": "Fillmore Jazz Club Fight",
    "location": "Fillmore District",
    "description": "Fight breaks out at historic jazz club. Multiple injuries, crowd panicking, venue damage.",
    "visual": "Historic club with overturned tables, people fighting, jazz instruments scattered, worried musicians",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Bouncers restore order"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers arrest instigators"
      },
      "maximum": {
        "readiness": -36,
        "capacity": 32,
        "score": 75,
        "outcome": "SWAT raids jazz club"
      }
    }
  },
  {
    "id": 82,
    "storyArc": "Random",
    "headline": "Presidio Trail Accident",
    "location": "Presidio",
    "description": "Mountain biker seriously injured on trail. Remote location, evacuation difficult.",
    "visual": "Forest trail with injured biker, concerned hikers, rescue team with stretcher, Golden Gate Bridge visible",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Hikers carry out injured biker"
      },
      "basic": {
        "readiness": -10,
        "capacity": 10,
        "score": 20,
        "outcome": "Park rangers assist evacuation"
      },
      "maximum": {
        "readiness": -40,
        "capacity": 32,
        "score": 100,
        "outcome": "Helicopter rescue from trail"
      }
    }
  },
  {
    "id": 83,
    "storyArc": "Random",
    "headline": "Excelsior District Shooting",
    "location": "Excelsior District",
    "description": "Drive-by shooting outside community center. Youth program in session, children present.",
    "visual": "Community center with bullet holes, frightened children, youth counselors protecting kids, police tape",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Community locks down center"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 30,
        "outcome": "Officers secure children"
      },
      "maximum": {
        "readiness": -60,
        "capacity": 48,
        "score": 125,
        "outcome": "SWAT evacuates community center"
      }
    }
  },
  {
    "id": 84,
    "storyArc": "Random",
    "headline": "Richmond Fog Accident",
    "location": "Richmond District",
    "description": "Multi-car pileup in heavy fog. Limited visibility, multiple injuries, traffic chaos.",
    "visual": "Foggy street with crashed cars barely visible, confused drivers, emergency lights cutting through fog",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Drivers help each other"
      },
      "basic": {
        "readiness": -10,
        "capacity": 15,
        "score": 30,
        "outcome": "Officers direct traffic in fog"
      },
      "maximum": {
        "readiness": -48,
        "capacity": 40,
        "score": 100,
        "outcome": "Full fog emergency response"
      }
    }
  },
  {
    "id": 85,
    "storyArc": "Random",
    "headline": "Mission Street Protest",
    "location": "Mission District",
    "description": "Immigration rights protest blocking street. Peaceful but no permits, affecting commute.",
    "visual": "Street filled with protesters holding signs, families with children, police trying to negotiate, buses blocked",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Protest ends naturally"
      },
      "basic": {
        "readiness": -6,
        "capacity": 10,
        "score": 10,
        "outcome": "Officers negotiate route"
      },
      "maximum": {
        "readiness": -24,
        "capacity": 24,
        "score": 75,
        "outcome": "Riot squad breaks up protest"
      }
    }
  },
  {
    "id": 86,
    "storyArc": "Random",
    "headline": "Cow Hollow Boutique Theft",
    "location": "Cow Hollow",
    "description": "High-end boutique robbed, expensive merchandise stolen. Owner threatened, suspects fled in luxury car.",
    "visual": "Upscale boutique with scattered expensive clothes, frightened owner, broken display cases, police taking statements",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Owner calls insurance company"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Detective investigates theft"
      },
      "maximum": {
        "readiness": -32,
        "capacity": 24,
        "score": 75,
        "outcome": "City-wide luxury car search"
      }
    }
  },
  {
    "id": 87,
    "storyArc": "Random",
    "headline": "Glen Park BART Incident",
    "location": "Glen Park",
    "description": "Medical emergency on BART platform. Person collapsed, train service delayed.",
    "visual": "BART platform with person on ground, concerned commuters, paramedics arriving, delayed train announcements",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "BART staff handles emergency"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 10,
        "outcome": "Paramedics treat patient"
      },
      "maximum": {
        "readiness": -20,
        "capacity": 16,
        "score": 50,
        "outcome": "Full station evacuation ordered"
      }
    }
  },
  {
    "id": 88,
    "storyArc": "Random",
    "headline": "Bernal Heights Dog Park",
    "location": "Bernal Heights",
    "description": "Large dog fight at popular dog park. Multiple dogs and owners involved, injuries reported.",
    "visual": "Hilltop dog park with dogs fighting, owners trying to separate them, city skyline background, injured person",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Dog owners break up fight"
      },
      "basic": {
        "readiness": -4,
        "capacity": 5,
        "score": 10,
        "outcome": "Animal control responds"
      },
      "maximum": {
        "readiness": -20,
        "capacity": 16,
        "score": 50,
        "outcome": "K9 unit responds to dog fight"
      }
    }
  },
  {
    "id": 89,
    "storyArc": "Random",
    "headline": "Potrero Hill Food Truck",
    "location": "Potrero Hill",
    "description": "Food truck explosion injures customers. Propane leak suspected, fire spreading to nearby vehicles.",
    "visual": "Food truck engulfed in flames, injured customers, fire spreading to parked cars, worried onlookers",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Fire spreads to three cars"
      },
      "basic": {
        "readiness": -10,
        "capacity": 15,
        "score": 30,
        "outcome": "Fire contained, injuries treated"
      },
      "maximum": {
        "readiness": -48,
        "capacity": 40,
        "score": 100,
        "outcome": "Hazmat team responds to explosion"
      }
    }
  },
  {
    "id": 90,
    "storyArc": "Random",
    "headline": "Visitacion Valley Warehouse",
    "location": "Visitacion Valley",
    "description": "Suspicious activity at abandoned warehouse. Possible drug lab, chemical smells reported.",
    "visual": "Industrial area with warehouse, chemical barrels visible, people in hazmat suits, concerned neighbors",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Neighbors avoid the area"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 30,
        "outcome": "Officers investigate warehouse"
      },
      "maximum": {
        "readiness": -56,
        "capacity": 48,
        "score": 125,
        "outcome": "Full hazmat team raids lab"
      }
    }
  },
  {
    "id": 91,
    "storyArc": "Random",
    "headline": "Outer Richmond Surf Rescue",
    "location": "Outer Richmond",
    "description": "Surfer missing in rough conditions near Ocean Beach. Last seen two hours ago.",
    "visual": "Rocky coastline with large waves, search and rescue boats, worried surfers on beach, helicopter overhead",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Surfer friends organize search"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 30,
        "outcome": "Coast Guard searches water"
      },
      "maximum": {
        "readiness": -60,
        "capacity": 48,
        "score": 125,
        "outcome": "Full maritime search launched"
      }
    }
  },
  {
    "id": 92,
    "storyArc": "Random",
    "headline": "Bayview Community Center",
    "location": "Bayview District",
    "description": "Community center hosting youth event disrupted by gang members. Families with children present.",
    "visual": "Community center with worried families, youth running inside, gang members outside, community leaders intervening",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Community leaders mediate"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers escort gang away"
      },
      "maximum": {
        "readiness": -40,
        "capacity": 40,
        "score": 100,
        "outcome": "SWAT surrounds community center"
      }
    }
  },
  {
    "id": 93,
    "storyArc": "Random",
    "headline": "Outer Mission Garage Fire",
    "location": "Outer Mission",
    "description": "Auto repair shop fire spreading rapidly. Explosions from fuel tanks, nearby businesses threatened.",
    "visual": "Garage with cars on fire, explosions visible, black smoke, firefighters spraying water, adjacent shops evacuating",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Fire spreads to three shops"
      },
      "basic": {
        "readiness": -14,
        "capacity": 20,
        "score": 40,
        "outcome": "Fire contained to garage"
      },
      "maximum": {
        "readiness": -60,
        "capacity": 56,
        "score": 125,
        "outcome": "Full hazmat response deployed"
      }
    }
  },
  {
    "id": 94,
    "storyArc": "Random",
    "headline": "Ingleside Library Incident",
    "location": "Ingleside",
    "description": "Disturbed individual causing disturbance at public library. Threatening staff, families with children present.",
    "visual": "Public library with frightened librarians, worried parents shielding children, books scattered, man gesturing wildly",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Librarian calls security"
      },
      "basic": {
        "readiness": -6,
        "capacity": 10,
        "score": 20,
        "outcome": "Officer de-escalates situation"
      },
      "maximum": {
        "readiness": -28,
        "capacity": 24,
        "score": 75,
        "outcome": "SWAT clears library"
      }
    }
  },
  {
    "id": 95,
    "storyArc": "Random",
    "headline": "Seacliff Mansion Break-In",
    "location": "Seacliff",
    "description": "Ultra-wealthy neighborhood targeted by sophisticated burglars. Multiple mansions hit, high-value art stolen.",
    "visual": "Elegant mansions with ocean views, broken security gates, worried wealthy residents, expensive cars in driveways",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Private security handles it"
      },
      "basic": {
        "readiness": -10,
        "capacity": 10,
        "score": 20,
        "outcome": "Detectives investigate break-ins"
      },
      "maximum": {
        "readiness": -48,
        "capacity": 32,
        "score": 100,
        "outcome": "Full neighborhood lockdown"
      }
    }
  },
  {
    "id": 96,
    "storyArc": "Random",
    "headline": "Forest Hill Hillside Collapse",
    "location": "Forest Hill",
    "description": "Heavy rains cause hillside to collapse onto residential street. Homes threatened, residents evacuated.",
    "visual": "Steep residential street with mud and debris, damaged houses, residents with belongings, rain visible",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Residents evacuate themselves"
      },
      "basic": {
        "readiness": -16,
        "capacity": 20,
        "score": 40,
        "outcome": "Emergency crews assist evacuation"
      },
      "maximum": {
        "readiness": -80,
        "capacity": 64,
        "score": 150,
        "outcome": "Full disaster response mobilized"
      }
    }
  },
  {
    "id": 97,
    "storyArc": "Random",
    "headline": "West Portal Shopping District",
    "location": "West Portal",
    "description": "Elderly driver crashes into storefront during lunch rush. Multiple pedestrians injured.",
    "visual": "Small shopping area with car crashed through window, injured pedestrians, lunch crowd, broken glass everywhere",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Bystanders help injured"
      },
      "basic": {
        "readiness": -10,
        "capacity": 15,
        "score": 30,
        "outcome": "Emergency crews treat injured"
      },
      "maximum": {
        "readiness": -48,
        "capacity": 40,
        "score": 100,
        "outcome": "Full emergency response deployed"
      }
    }
  },
  {
    "id": 98,
    "storyArc": "Random",
    "headline": "Diamond Heights Overlook",
    "location": "Diamond Heights",
    "description": "Tourist bus breaks down on steep hill. Brake failure, rolling backward toward intersection.",
    "visual": "Tour bus sliding backward down steep hill, terrified tourists visible through windows, busy intersection ahead",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Bus driver uses emergency brake"
      },
      "basic": {
        "readiness": -8,
        "capacity": 10,
        "score": 20,
        "outcome": "Officers block intersection"
      },
      "maximum": {
        "readiness": -40,
        "capacity": 32,
        "score": 100,
        "outcome": "Emergency vehicles create barriers"
      }
    }
  },
  {
    "id": 99,
    "storyArc": "Random",
    "headline": "Crocker Amazon Playground",
    "location": "Crocker Amazon",
    "description": "Playground equipment collapse injures multiple children. Parents demanding investigation, media arriving.",
    "visual": "Playground with collapsed swing set, injured children being comforted, angry parents, concerned school officials",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Parents rush children to hospital"
      },
      "basic": {
        "readiness": -12,
        "capacity": 15,
        "score": 30,
        "outcome": "Paramedics treat injured children"
      },
      "maximum": {
        "readiness": -60,
        "capacity": 48,
        "score": 125,
        "outcome": "Full emergency response activated"
      }
    }
  },
  {
    "id": 100,
    "storyArc": "Random",
    "headline": "Portola District Market",
    "location": "Portola District",
    "description": "Corner market held up at gunpoint. Elderly owner shot, suspects fled on foot toward freeway.",
    "visual": "Small corner store with bullet holes, elderly man being treated, worried neighbors, police tape, urban freeway visible",
    "hasVoice": false,
    "responses": {
      "ignore": {
        "readiness": 1,
        "capacity": 0,
        "score": 0,
        "outcome": "Neighbors call ambulance"
      },
      "basic": {
        "readiness": -10,
        "capacity": 15,
        "score": 30,
        "outcome": "Officers search for suspects"
      },
      "maximum": {
        "readiness": -48,
        "capacity": 40,
        "score": 100,
        "outcome": "City-wide manhunt launched"
      }
    }
  },
  {
    "id": 101,
    "storyArc": "Powerup",
    "headline": "Your Daughter Calls - She Got an A!",
    "location": "Dispatch Center",
    "description": "Your 8-year-old calls the dispatch center to tell you she got an A+ on her spelling test and wants to share the good news.",
    "visual": "Excited little girl on phone in kitchen, school papers scattered on table, proud smile, family photo visible",
    "hasVoice": false,
    "isPowerup": true,
    "powerupValue": 25,
    "responses": {
      "accept": {
        "readiness": 25,
        "capacity": 0,
        "score": 0,
        "outcome": "Feeling recharged and ready!"
      }
    }
  },
  {
    "id": 102,
    "storyArc": "Powerup",
    "headline": "Chief Compliments Your Work",
    "location": "Dispatch Center",
    "description": "The Fire Chief stops by dispatch to personally thank you for your excellent coordination during last week's apartment fire.",
    "visual": "Police chief in uniform speaking to dispatcher, commendation letter visible, other dispatchers listening proudly",
    "hasVoice": false,
    "isPowerup": true,
    "powerupValue": 40,
    "responses": {
      "accept": {
        "readiness": 40,
        "capacity": 0,
        "score": 0,
        "outcome": "Feeling recharged and ready!"
      }
    }
  },
  {
    "id": 103,
    "storyArc": "Powerup",
    "headline": "You Got the Promotion!",
    "location": "Dispatch Center",
    "description": "Human Resources calls to inform you that your promotion to Senior Dispatcher has been approved, effective immediately.",
    "visual": "HR representative with paperwork, dispatcher smiling at desk, 'Senior Dispatcher' nameplate, celebratory atmosphere",
    "hasVoice": false,
    "isPowerup": true,
    "powerupValue": 75,
    "responses": {
      "accept": {
        "readiness": 75,
        "capacity": 0,
        "score": 0,
        "outcome": "Feeling recharged and ready!"
      }
    }
  },
  {
    "id": 104,
    "storyArc": "Powerup",
    "headline": "Partner Brings Perfect Coffee",
    "location": "Dispatch Center",
    "description": "Your work partner surprises you with your favorite coffee and a fresh donut from the bakery you love.",
    "visual": "Steaming coffee cup with heart foam art, glazed donut, smiling coworker, morning sunlight through window",
    "hasVoice": false,
    "isPowerup": true,
    "powerupValue": 15,
    "responses": {
      "accept": {
        "readiness": 15,
        "capacity": 0,
        "score": 0,
        "outcome": "Feeling recharged and ready!"
      }
    }
  },
  {
    "id": 105,
    "storyArc": "Powerup",
    "headline": "Family Sends Thank You Card",
    "location": "Dispatch Center",
    "description": "You receive a heartfelt thank you card from a family whose house fire you helped coordinate the response for last month.",
    "visual": "Handwritten thank you card with child's drawing, family photo included, dispatcher reading with tears of joy",
    "hasVoice": false,
    "isPowerup": true,
    "powerupValue": 50,
    "responses": {
      "accept": {
        "readiness": 50,
        "capacity": 0,
        "score": 0,
        "outcome": "Feeling recharged and ready!"
      }
    }
  },
  {
    "id": 106,
    "storyArc": "Powerup",
    "headline": "Found the Perfect Parking Spot",
    "location": "Dispatch Center",
    "description": "After circling the block three times, you find a perfect parking spot right in front of the station.",
    "visual": "Empty parking space with 'DISPATCHER' sign, car pulling in, city street, relieved driver visible through windshield",
    "hasVoice": false,
    "isPowerup": true,
    "powerupValue": 10,
    "responses": {
      "accept": {
        "readiness": 10,
        "capacity": 0,
        "score": 0,
        "outcome": "Feeling recharged and ready!"
      }
    }
  },
  {
    "id": 107,
    "storyArc": "Powerup",
    "headline": "Surprise Birthday Celebration",
    "location": "Dispatch Center",
    "description": "Your dispatch team surprises you with a birthday cake and singing during your break. You completely forgot it was your birthday!",
    "visual": "Birthday cake with candles, surprised dispatcher, coworkers singing, radio equipment in background, balloons",
    "hasVoice": false,
    "isPowerup": true,
    "powerupValue": 60,
    "responses": {
      "accept": {
        "readiness": 60,
        "capacity": 0,
        "score": 0,
        "outcome": "Feeling recharged and ready!"
      }
    }
  },
  {
    "id": 108,
    "storyArc": "Powerup",
    "headline": "New Radio System Installed",
    "location": "Dispatch Center",
    "description": "The new state-of-the-art radio system is finally installed, making communication crystal clear for the first time in years.",
    "visual": "Sleek new radio console, clear displays, dispatcher testing equipment, satisfied expression, improved technology",
    "hasVoice": false,
    "isPowerup": true,
    "powerupValue": 30,
    "responses": {
      "accept": {
        "readiness": 30,
        "capacity": 0,
        "score": 0,
        "outcome": "Feeling recharged and ready!"
      }
    }
  },
  {
    "id": 109,
    "storyArc": "Powerup",
    "headline": "Vacation Request Approved!",
    "location": "Dispatch Center",
    "description": "Your supervisor approves your vacation request for next month. Two weeks in Hawaii with the family - you can finally relax!",
    "visual": "Calendar with vacation dates circled, Hawaii brochure, airplane tickets, family vacation photo, scheduling board",
    "hasVoice": false,
    "isPowerup": true,
    "powerupValue": 85,
    "responses": {
      "accept": {
        "readiness": 85,
        "capacity": 0,
        "score": 0,
        "outcome": "Feeling recharged and ready!"
      }
    }
  },
  {
    "id": 110,
    "storyArc": "Powerup",
    "headline": "You Saved a Life Today",
    "location": "Dispatch Center",
    "description": "The paramedic chief calls to confirm that your quick CPR instructions over the phone saved a heart attack victim's life.",
    "visual": "Paramedic giving thumbs up, medical equipment, dispatcher with proud expression, life-saving award certificate",
    "hasVoice": false,
    "isPowerup": true,
    "powerupValue": 100,
    "responses": {
      "accept": {
        "readiness": 100,
        "capacity": 0,
        "score": 0,
        "outcome": "Feeling recharged and ready!"
      }
    }
  }
];
