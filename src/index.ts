import { Midi, Track } from '@tonejs/midi'
import MidiNote from './MidiNote'
import TabNote from './TabNote'
import TabLine from './TabLine'
import createTrackFromTabLine from './utils/createTrackFromTabLine'

import * as fs from 'fs'
// Todo: Réfléchir à comment gérer les notes qui n'ont pas de temps (note tout court lol), ces notes étant une tonique ou autre, mais pas une note réellement jouée. Par contre la midiNote doit avoir une Note, un temps avant de sonner, ainsi qu'une durée.
// create a new midi file
var midi = new Midi()
// add a track
var track1 = midi.addTrack()
// create an E2 note
const noteE2 = new MidiNote(MidiNote.noteNameToMidi('E2'), 0.5)
// create a G1 note
const noteG1 = new MidiNote(MidiNote.noteNameToMidi('G1'), 0.5)
// On crée une TabLine sur la corde E2 avec toutes les notes jusqu'à la note E3

const tabLine = new TabLine(
  noteE2,
  [
    new MidiNote(MidiNote.noteNameToMidi('E2'), 0.5, 0.5),
    new MidiNote(MidiNote.noteNameToMidi('F2'), 0.5, 0.5),
    new MidiNote(MidiNote.noteNameToMidi('G2'), 0.5, 0.5),
    new MidiNote(MidiNote.noteNameToMidi('A2'), 0.5, 0.5),
    new MidiNote(MidiNote.noteNameToMidi('B2'), 0.5, 0.5),
    new MidiNote(MidiNote.noteNameToMidi('C3'), 0.5, 0.5),
    new MidiNote(MidiNote.noteNameToMidi('D3'), 0.5, 0.5),
    new MidiNote(MidiNote.noteNameToMidi('E3'), 0.5, 0.5),
  ],
  12,
  true
)

track1 = createTrackFromTabLine(tabLine, track1)

console.log(tabLine.toString())

// write the output buffer.aloc
fs.writeFileSync('outputs/debugTS/output-1.mid', midi.toArray())
