import PlayedNote from "./PlayedNoteOne";

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
}