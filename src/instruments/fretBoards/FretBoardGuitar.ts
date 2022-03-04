import { StandardGuitarTuning } from '../../tunings/StandardGuitarTuning'
import { FretBoard } from './FretBoard'

export class FretBoardGuitar extends FretBoard {
  constructor() {
    super(new StandardGuitarTuning(), 24)
  }
}
