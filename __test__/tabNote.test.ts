import NoteOne from '../src/notes/NoteOne'
import PlayedNote from '../src/notes/PlayedNoteOne'
import { ChooseFretNumberStrategySimple } from '../src/tabs/ChooseFretNumberStrategy/ChooseFretNumberStrategySimple'
import TabNote from '../src/tabs/TabNote'

describe('tabNote', () => {
  const tabNoteG4E4 = new TabNote(
    new PlayedNote(NoteOne.noteNameToNote('G4')),
    NoteOne.noteNameToNote('E4'),
    24,
    new ChooseFretNumberStrategySimple()
  )
  const tabNoteG5E4 = new TabNote(
    new PlayedNote(NoteOne.noteNameToNote('G5')),
    NoteOne.noteNameToNote('E4'),
    24,
    new ChooseFretNumberStrategySimple()
  )
  it('should create a tab with the case 3 for a G4 on E4 string', () => {
    expect(tabNoteG4E4.toString()).toBe('3')
  })
  it('should create a tab with the case 15 for a G5 on E4 string', () => {
    expect(tabNoteG5E4.toString()).toBe('15')
  })
})
