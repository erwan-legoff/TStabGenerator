import PlayedNote from "./PlayedNoteOne";
import { Track, Midi } from "@tonejs/midi";

export class TrackOne {
  playedNotes: PlayedNote[] = []
  readonly beatLength: number = 1 // in seconds
  constructor(
    playedNotes: PlayedNote[],
    beatPerMinute: number = 120,
  ) {
    this.playedNotes = playedNotes
    if(beatPerMinute <= 0) throw new Error('beatPerMinute must be greater than 0')
    this.beatLength = 60 / beatPerMinute
  }

  addPlayedNote(playedNote: PlayedNote) {
    this.playedNotes.push(playedNote)
  }

  getMidiTrack(): Track {
    let timeSpent : number = 0
    const midiFile = new Midi()
    const track = midiFile.addTrack()

    this.playedNotes.forEach(playedNote => {
      const midi = playedNote.getMidi()
      const time = timeSpent + playedNote.getTimeBeforeStart() * this.beatLength
      const duration = playedNote.getDuration() * this.beatLength

      track.addNote({
        midi,
        time,
        duration,
      })
      timeSpent += duration + playedNote.getTimeBeforeStart()
    })
    return track
  }

  getPlayedNotes(): PlayedNote[] {
    return this.playedNotes
  }

}