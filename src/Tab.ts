import MidiNote from './MidiNote';
import TabLine from './TabLine'
import TabNote from './TabNote';

export interface Tab {
  getName(): string
    getMusic(): TabLine[]
    
    addNote(note: MidiNote, stringNumber: Number): void
    addTabNote(tabNote: TabNote): void
}
