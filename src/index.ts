import { Midi, Track } from '@tonejs/midi'
import Note from './Note'
import TabNote from './TabNote'
import TabLine from './TabLine'
import createTrackFromTabLine from './utils/createTrackFromTabLine'

import * as fs from 'fs'

// create a new midi file
var midi = new Midi()
// add a track
var track1 = midi.addTrack()
// create an E2 note
const noteE2 = new Note(Note.noteNameToMidi('E2'), 0.5)
// create a G1 note
const noteG1 = new Note(Note.noteNameToMidi('G1'), 0.5)
// On crée une TabLine sur la corde E2 avec toutes les notes jusqu'à la note E3

const tabLine = new TabLine(
  noteE2,
  [
    new Note(Note.noteNameToMidi('E2'), 0.5, 0.5),
    new Note(Note.noteNameToMidi('F2'), 0.5, 0.5),
    new Note(Note.noteNameToMidi('G2'), 0.5, 0.5),
    new Note(Note.noteNameToMidi('A2'), 0.5, 0.5),
    new Note(Note.noteNameToMidi('B2'), 0.5, 0.5),
    new Note(Note.noteNameToMidi('C3'), 0.5, 0.5),
    new Note(Note.noteNameToMidi('D3'), 0.5, 0.5),
    new Note(Note.noteNameToMidi('E3'), 0.5, 0.5),
  ],
  12,
  true
)

track1 = createTrackFromTabLine(tabLine, track1)

console.log(tabLine.toString())

// write the output buffer.aloc
fs.writeFileSync('outputs/debugTS/output-1.mid', midi.toArray())
