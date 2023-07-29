import NoteOne from '../src/notes/noteOnes/NoteOne'
import PlayedNote from '../src/notes/playedNote/playedNoteOnes/PlayedNoteOne'

describe('E2 Note', () => {
  const note = PlayedNote.getPlayedNoteFromNoteName('E2')
  it('should be a midi number 40', () => {
    expect(note.getMidi()).toBe(40)
  })
})

describe('A0 Note', () => {
  const note = PlayedNote.getPlayedNoteFromNoteName('A0')
  it('should be a midi number 21', () => {
    expect(note.getMidi()).toBe(21)
  })
})

describe('40 Midi Number', () => {
  const note = new PlayedNote(new NoteOne(40))
  it('should be an E2 note', () => {
    expect(note.getNote().getName()).toBe('E2')
  })
})
