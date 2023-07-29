import PlayedNote from '../src/notes/playedNote/playedNoteOnes/PlayedNoteOne'
import { TrackOne } from '../src/notes/TrackOne'
import { Midi, Track } from '@tonejs/midi'

describe('From TrackOne to Track', () => {
  const playedNotes: PlayedNote[] = [
    PlayedNote.getPlayedNoteFromNoteName('E2', 0, 1),
    PlayedNote.getPlayedNoteFromNoteName('A0', 1, 2),
  ]
  const bpm = 60
  const trackOne = new TrackOne(playedNotes, bpm)
  const midiTrackOne = trackOne.getMidiTrack()
  const midi = new Midi()
  const track = midi.addTrack()
  track.addNote({
    midi: playedNotes[0].getMidi(),
    time: 0,
    duration: 1,
  })
  track.addNote({
    midi: playedNotes[1].getMidi(),
    time: 2,
    duration: 2,
  })
  it('should have playedNotes', () => {
    expect(trackOne.playedNotes).toBe(playedNotes)
  })
  it('should have a midiTrack', () => {
    expect(midiTrackOne).toBeInstanceOf(Track)
  })
  it('should have a midiTrack with the same duration', () => {
    expect(midiTrackOne.notes[0].duration).toEqual(track.notes[0].duration)
  })
  it('should have a midiTrack with the same notes', () => {
    expect(midiTrackOne.notes[0].midi).toEqual(track.notes[0].midi)
  })
  it('should have a midiTrack with the same time', () => {
    expect(midiTrackOne.notes[1].time).toEqual(track.notes[1].time)
  })
})
