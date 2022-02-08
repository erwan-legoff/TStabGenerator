import { Midi } from '@tonejs/midi'
import Note from '../../src/Note'
import TabLine from '../../src/TabLine'
import createTrackFromTabLine from '../../src/utils/createTrackFromTabLine'
var midi = new Midi()
// add a track
var track1 = midi.addTrack()

const tabLine = new TabLine(
  new Note(Note.noteNameToMidi('E2'), 0.5),
  [
    new Note(Note.noteNameToMidi('E2'), 0.5, 0.5),
    new Note(Note.noteNameToMidi('F2'), 0.5, 0.5),
  ],
  12,
  true
)

track1 = createTrackFromTabLine(tabLine, track1)

describe('createTrackFromTabLine', () => {
  it('should create a track with two notes', () => {
    expect(track1.notes.length).toBe(2)
  })
  it('The first note should have a midi number 40', () => {
    expect(track1.notes[0].midi).toBe(40)
  })
})
