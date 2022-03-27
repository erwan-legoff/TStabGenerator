import { GenericalScale } from "./GenericalScale";
/**
 * The simplest scale with all notes
 */
export class ChromaticScale extends GenericalScale {
  constructor() {
    super([0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 'Chromatic')
  }
} 