import NoteOne from '../src/notes/NoteOne'
import PlayedNote from '../src/notes/PlayedNoteOne'
import TabNote from '../src/TabNote'

describe('tabNote', () => {

  const tabNoteG4E4 = new TabNote(
    PlayedNote.getPlayedNoteFromNoteName('G4'),
    NoteOne.noteNameToNote('E4'),
    12
  )
  const tabNoteG5E4 = new TabNote(
    PlayedNote.getPlayedNoteFromNoteName('G5'),
    NoteOne.noteNameToNote('E4'),
    12
  )
  it('should create a tab with the case 3 for a G4 on E4 string', () => {
    
    expect(tabNoteG4E4.toString()).toBe('3')
  })
  it('should create a tab with the case 3 for a G5 on E4 string', () => {
      
      expect(tabNoteG5E4.toString()).toBe('3')
    })
})
