import NoteOne from '../src/notes/NoteOne'
import PlayedNote from '../src/notes/PlayedNoteOne'
import { TrackOne } from '../src/notes/TrackOne'
import { TabGuitar } from '../src/tabs/TabGuitar'

describe('TabGuitar Creation', () => {
  const playedNotes = [
    new PlayedNote(NoteOne.noteNameToNote('E2')),
    new PlayedNote(NoteOne.noteNameToNote('A2')),
  ]
  const tabGuitar = new TabGuitar('Test', new TrackOne(playedNotes))
  it('should create a new TabGuitar', () => {
    expect(tabGuitar).toBeDefined()
  })

  it('should have a first string with the tonic note E2', () => {
    expect(tabGuitar.getMusic()[0].getTonic().getName()).toBe('E2')
  })

  it('should have a name', () => {
    expect(tabGuitar.getName()).toEqual('Test')
  })

  it('should have a music', () => {
    expect(tabGuitar.getMusic()[0].getMelody()).toHaveLength(1)
  })

  it('should have a 0 tabNote at the first string and at the second string', () => {
    expect(tabGuitar.getMusic()[0].getMelody()[0].toString()).toEqual('0')
    expect(tabGuitar.getMusic()[1].getMelody()[0].toString()).toEqual('0')
  })
})
