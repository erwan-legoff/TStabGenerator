import { Midi } from '@tonejs/midi'
import * as fs from 'fs'
import { RandomSimpleCompositor } from './compositor/RandomSimpleCompositor'
import { SimpleDownArpegeCompositor } from './compositor/SimpleDownArpegeCompositor'
import NoteOne from './notes/NoteOne'
import { PentatonicScale, AlgerianScale, MinorNaturalScale } from './scales/Scales'
import { TabGuitar } from './tabs/TabGuitar'
// ?IDEA: Faire un système de rythme quantifié avec des subdivisions.
// ?IDEA: On peut imaginer un objet "mesure" qui contient un nombre donné de temps.
// ?IDEA: En se concentrant sur une mesure à 4 temps, on peut imaginer qu'on peut définir un nombre de mesures, de demi-mesures, de quarts de mesure, etc.
// ?IDEA: On peut imaginer un objet "mesure" qui contient un nombre donné d'objets temps, qui possèdent un nombre donné de demi-temps,
// ?IDEA: Ou alors trouver une façon algorithmique pour s'assurer qu'une note est jouée sur le temps ou autre
// ?IDEA: On pourrait simplement diviser la mesure par 16, et faire un algorithme qui s'occupe de récupérer/ajouter les notes dans le bon temps/subdivision.


// This is the object that will create our music
const compositor = new RandomSimpleCompositor()
// We choose different parameters for the music composition
const music = compositor.getMusic(
  10,
  undefined,
  new MinorNaturalScale(),
  NoteOne.noteNameToNote('C4')
)

// Only to see the note of the music
console.log(music.toString())
const tabGuitar = new TabGuitar('Super musique !', music)
console.log(tabGuitar.toString())

// If we want to listen to the music, we have to add the track to a Midi Object
const midi = new Midi()
midi.tracks.push(music.getMidiTrack())

// write the output in a mid file wich can directly be played 
fs.writeFileSync(
  'outputs/debugTS/randomSimpleMinorNaturalScale5.mid',
  midi.toArray()
)
