import { GenericalScale } from './GenericalScale'
/**
 ** The classical rock scale
 */
export class PentatonicScale extends GenericalScale {
  constructor() {
    super([0, 3, 5, 7, 10], 'Pentatonic')
  }
}
export class MajorPentatonicScale extends GenericalScale {
  constructor() {
    super([0, 2, 4, 7, 9], 'Major Pentatonic')
  }
}

export class ChromaticScale extends GenericalScale {
  constructor() {
    super([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 'Chromatic')
  }
}
export class MajorScale extends GenericalScale {
  constructor() {
    super([0, 2, 4, 5, 7, 9, 11], 'Major Natural')
  }
}
/**
 * Also named aeolian
 */
export class MinorNaturalScale extends GenericalScale {
  constructor() {
    super([0, 2, 3, 5, 7, 8, 10], 'Minor Natural')
  }
}
export class MinorHarmonicScale extends GenericalScale {
  constructor() {
    super([0, 2, 3, 5, 7, 8, 11], 'Minor Harmonic')
  }
}
export class MinorMelodicScale extends GenericalScale {
  constructor() {
    super([0, 2, 3, 5, 7, 8, 9], 'Minor Melodic')
  }
}
export class AlgerianScale extends GenericalScale {
  constructor() {
    super([0, 2, 3, 6, 7, 9, 11], 'Algerian')
  }
}
export class AlteredScale extends GenericalScale {
  constructor() {
    super([0, 1, 3, 4, 6, 8, 10], 'Altered')
  }
}
export class AugmentedScale extends GenericalScale {
  constructor() {
    super([0, 3, 4, 7, 8, 11], 'Augmented')
  }
}

export class BebopDominantScale extends GenericalScale {
  constructor() {
    super([0, 2, 4, 5, 7, 9, 10, 11], 'Bebop Dominant')
  }
}
export class BluesScale extends GenericalScale {
  constructor() {
    super([0, 3, 5, 6, 7, 10], 'Blues')
  }
}

export class DorianScale extends GenericalScale {
  constructor() {
    super([0, 2, 3, 5, 7, 9, 10], 'Dorian')
  }
}

export class DoubleHarmonicScale extends GenericalScale {
  constructor() {
    super([0, 1, 4, 5, 7, 8, 10], 'Double Harmonic')
  }
}

export class EnigmaticScale extends GenericalScale {
  constructor() {
    super([0, 1, 4, 6, 8, 10, 11], 'Enigmatic')
  }
}

export class FlamencoScale extends GenericalScale {
  constructor() {
    super([0, 1, 4, 5, 7, 8, 11], 'Flamenco')
  }
}

export class GypsyScale extends GenericalScale {
  constructor() {
    super([0, 2, 3, 6, 7, 8, 10], 'Gypsy')
  }
}

export class HalfDiminishedScale extends GenericalScale {
  constructor() {
    super([0, 2, 3, 5, 6, 8, 10], 'Half Diminished')
  }
}

export class HarmonicMajorScale extends GenericalScale {
  constructor() {
    super([0, 2, 4, 5, 7, 8, 11], 'Harmonic Major')
  }
}

export class HungarianMinorScale extends GenericalScale {
  constructor() {
    super([0, 2, 3, 6, 7, 8, 11], 'Hungarian Minor')
  }
}

export class HungarianMajorScale extends GenericalScale {
  constructor() {
    super([0, 3, 4, 6, 7, 9, 10], 'Hungarian Major')
  }
}

export class InScale extends GenericalScale {
  constructor() {
    super([0, 1, 5, 7, 8], 'In')
  }
}

export class InSenScale extends GenericalScale {
  constructor() {
    super([0, 1, 5, 7, 10], 'In Sen')
  }
}

export class IstrianScale extends GenericalScale {
  constructor() {
    super([0, 1, 3, 4, 6, 7], 'Istrian')
  }
}

export class IwatoScale extends GenericalScale {
  constructor() {
    super([0, 1, 5, 6, 10], 'Iwato')
  }
}

export class LocrianScale extends GenericalScale {
  constructor() {
    super([0, 1, 3, 5, 6, 8, 10], 'Locrian')
  }
}

export class LocrianMajorScale extends GenericalScale {
  constructor() {
    super([0, 2, 4, 5, 6, 8, 10], 'Locrian Major')
  }
}

export class LydianScale extends GenericalScale {
  constructor() {
    super([0, 2, 4, 6, 7, 9, 11], 'Lydian')
  }
}

export class LydianAugmentedScale extends GenericalScale {
  constructor() {
    super([0, 2, 4, 6, 8, 9, 11], 'Lydian Augmented')
  }
}

export class BebopMajorScale extends GenericalScale {
  constructor() {
    super([0, 2, 4, 5, 7, 8, 9, 11], 'Bebop Major')
  }
}
export class MixolydianScale extends GenericalScale {
  constructor() {
    super([0, 2, 4, 5, 7, 9, 10], 'Mixolydian')
  }
}

export class PersianScale extends GenericalScale {
  constructor() {
    super([0, 1, 4, 5, 6, 8, 11], 'Persian')
  }
}

export class PhrygianDominantScale extends GenericalScale {
  constructor() {
    super([0, 1, 4, 5, 7, 8, 10], 'Phrygian Dominant')
  }
}

export class PhrygianScale extends GenericalScale {
  constructor() {
    super([0, 1, 3, 5, 7, 8, 10], 'Phrygian')
  }
}

export class TritoneScale extends GenericalScale {
  constructor() {
    super([0, 1, 4, 6, 7, 10], 'Tritone')
  }
}

export class UkrainianDorianScale extends GenericalScale {
  constructor() {
    super([0, 2, 3, 6, 7, 9, 10], 'Ukrainian Dorian')
  }
}


