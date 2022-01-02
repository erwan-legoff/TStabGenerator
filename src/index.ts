import { Midi, Track } from '@tonejs/midi'
import Note from './Note'
import TabNote from './TabNote'
import TabLine from './TabLine'

import * as fs from 'fs'

// create a new midi file
var midi = new Midi()
// add a track
const track1 = midi.addTrack()
track1
  .addNote({
    midi: 60,
    time: 0,
    duration: 0.2,
  })
  .addNote({
    name: 'C5',
    time: 2,
    duration: 0.1,
  })
  .addCC({
    number: 64,
    value: 127,
    time: 10,
  })
// create an E2 note
const noteE2 = new Note(Note.noteNameToMidi('E2'), 0.5)
// create a G1 note
const noteG1 = new Note(Note.noteNameToMidi('G1'), 0.5)
// test the creation of a tabNote



// a function to create a track from a tabLine
const createTrackFromTabLine = (tabLine: TabLine, track: Track) => {
  tabLine.getMelody().forEach((tabNote: TabNote) => {
    const note = tabNote.getNote()
    track.addNote({
      midi: note.getMidi(),
      time: note.getTime(),
      duration: note.getDuration(),
    })
  })
}




// write the output
fs.writeFileSync('./outputs/output1.mid', new Buffer(midi.toArray()))
