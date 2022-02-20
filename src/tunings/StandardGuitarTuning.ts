import MidiNote from '../MidiNote'
import { GuitarTuning } from './GuitarTuning'

class StandardGuitarTuning implements GuitarTuning {
  getNotes(): MidiNote[] {
    return [
      MidiNote.fromString('E2'),
      MidiNote.fromString('A2'),
      MidiNote.fromString('D3'),
      MidiNote.fromString('G3'),
      MidiNote.fromString('B3'),
      MidiNote.fromString('E4'),
    ]
  }

  getName(): string {
    return 'Standard Guitar Tuning'
  }
}
