import { GenericalScale } from './GenericalScale'
/**
 ** The classical rock scale
 */
export class PentatonicScale extends GenericalScale {
  constructor() {
    super([0, 3, 5, 7, 10], 'Pentatonic')
  }
}
