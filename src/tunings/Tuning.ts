import MidiNote from "../MidiNote";

export interface Tuning {
  getNotes(): MidiNote[]
  getName(): string
}
