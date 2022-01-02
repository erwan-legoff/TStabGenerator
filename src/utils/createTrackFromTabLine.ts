import TabNote from '../TabNote'
import Note from '../Note'
import TabLine from '../TabLine'
import { Track } from '@tonejs/midi'

export default (tabLine: TabLine, track: Track): Track => {
  tabLine.getMelody().forEach((tabNote: TabNote) => {
    const note = tabNote.getNote()
    track.addNote({
      midi: note.getMidi(),
      time: note.getTime(),
      duration: note.getDuration(),
    })
  })
  return track
}
