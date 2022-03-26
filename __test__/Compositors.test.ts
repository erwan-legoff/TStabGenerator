import { SimpleDownArpegeCompositor } from '../src/compositor/SimpleDownArpegeCompositor'
import NoteOne from '../src/notes/NoteOne'
import { TrackOne } from '../src/notes/TrackOne'
import { ChromaticScale } from '../src/scales/ChromaticScale'

describe('Simple Down Arpege Compositor', () => {
  const compositor = new SimpleDownArpegeCompositor()
  const scale = new ChromaticScale()
  const key = NoteOne.noteNameToNote('C4')
  const music = compositor.getMusic(
    12,
    120,
    scale,
    key
  )
  it('should return a TrackOne', () => {
    expect(music).toBeInstanceOf(TrackOne)
  })
  it('should return a TrackOne with 12 notes', () => {
    expect(music.getPlayedNotes().length).toBe(12)
  })
  
  it('should return a TrackOne with the right notes', () => {
    const chromaticNotes = new ChromaticScale().getNotes(key)
    const playedNotes = music.getPlayedNotes()
    for (let i = 0; i < playedNotes.length; i++) {
      const playedNote = playedNotes[i]
      const chromaticNote = chromaticNotes[i]
      expect(playedNote.getNote().getMidi()).toBe(chromaticNote.getMidi())
    }
  })

  
})
