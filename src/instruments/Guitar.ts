import { Instrument } from './Instrument'
import { Tuning } from '../tunings/Tuning'
import { GuitarTuning } from '../tunings/GuitarTuning'
class Guitar implements Instrument {
  readonly name: string
  readonly tuning: Tuning
  capo: number

  constructor(tuning: GuitarTuning, capo: number) {
    this.name = 'Guitar'
    this.tuning = tuning
    this.capo = capo
  }

  setCapo(capo: number): void {
    this.capo = capo
  }

  getTuning(): Tuning {
    return this.tuning
  }

  getName(): string {
    return this.name
  }

  getNumberOfStrings(): number {
    return this.tuning.getNotes().length
  }

  getCapo(): number {
    return this.capo
  }
}
