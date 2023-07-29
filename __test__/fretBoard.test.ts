import { FretBoardGuitar } from '../src/instruments/fretBoards/FretBoardGuitar'
import NoteOne from '../src/notes/noteOnes/NoteOne'
import PlayedNote from '../src/notes/playedNote/playedNoteOnes/PlayedNoteOne'

describe('fretboardfilling', () => {
  it('should add E2 to the string number one (the A string)', () => {
    const fretboard = new FretBoardGuitar()
    fretboard.addPlayedNote(new PlayedNote(NoteOne.noteNameToNote('E2')), 1)
    expect(
      fretboard.getMusicTabLines()[1].getMelody()[0].toString()
    ).toBeDefined()
  })
})

describe('fretboard, string with the more notes', () => {
  it(' should return the number 0 string as the longest', () => {
    const fretboard = new FretBoardGuitar()
    fretboard.addPlayedNote(new PlayedNote(NoteOne.noteNameToNote('E2')), 0)
    fretboard.addPlayedNote(new PlayedNote(NoteOne.noteNameToNote('A2')), 0)
    expect(fretboard.getLongestTabLine()).toBe(0)
  })

  it(' should return the number 1 string as the longest', () => {
    const fretboard = new FretBoardGuitar()
    fretboard.addPlayedNote(new PlayedNote(NoteOne.noteNameToNote('E2')), 0)
    fretboard.addPlayedNote(new PlayedNote(NoteOne.noteNameToNote('E2')), 1)
    fretboard.addPlayedNote(new PlayedNote(NoteOne.noteNameToNote('A2')), 1)
    expect(fretboard.getLongestTabLine()).toBe(1)
  })
})
