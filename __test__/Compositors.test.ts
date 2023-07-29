import { RandomSimpleCompositor } from '../src/compositor/RandomSimpleCompositor'
import { SimpleDownArpegeCompositor } from '../src/compositor/SimpleDownArpegeCompositor'
import NoteOne from '../src/notes/noteOnes/NoteOne'
import { TrackOne } from '../src/notes/TrackOne'
import { ChromaticScale } from '../src/scales/Scales'

describe('Simple Down Arpege Compositor', async () => {
  const compositor = new SimpleDownArpegeCompositor()
  const scale = new ChromaticScale()
  const key = NoteOne.noteNameToNote('C4')
  const music = await compositor.getMusic(12, 120, scale, key)
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

  it('should return played notes with the same time in between', () => {
    const playedNotes = music.getPlayedNotes()
    for (let i = 0; i < playedNotes.length - 1; i++) {
      const playedNote = playedNotes[i]
      const nextPlayedNote = playedNotes[i + 1]
      expect(playedNote.getTimeBeforeStart()).toBe(
        nextPlayedNote.getTimeBeforeStart()
      )
    }
  })

  it('should return notes that can go higher than an octave', async () => {
    const notesCount = 24
    const music = await compositor.getMusic(notesCount)
    const D4 = NoteOne.noteNameToNote('D4')
    const C5 = NoteOne.noteNameToNote('C5')
    const playedNotes = music.getPlayedNotes()
    const find = playedNotes.find((playedNote) => {
      const note = playedNote.getNote()
      return note.getMidi() === C5.getMidi()
    })
    expect(find).toBeDefined()
  })
})

describe('Simple Random Compositor', async () => {
  const compositor = new RandomSimpleCompositor()
  const scale = new ChromaticScale()
  const key = NoteOne.noteNameToNote('C4')
  const music = await compositor.getMusic(12, 120, scale, key)
  it('should return a TrackOne', () => {
    expect(music).toBeInstanceOf(TrackOne)
  })
  it('should return a TrackOne with 12 notes', async () => {
    expect(await music.getPlayedNotes().length).toBe(12)
  })
})
