import NoteOne from '../notes/NoteOne';
import TabLine from '../tabLines/TabLine'
import TabNote from './TabNote';

export interface Tab {
  getName(): string
    getMusic(): TabLine[]
    
    addNote(note: NoteOne, stringNumber: number): void
    addTabNote(tabNote: TabNote): void
}
