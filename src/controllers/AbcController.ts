import { Request, Response } from 'express'
import { PlayedNoteMidi } from 'notes/playedNote/PlayedNoteMidi'
import { GPTCompositorOneNote } from '../compositor/GPTCompositorOneNote'
import { GenericalScale } from '../scales/GenericalScale'
import { PentatonicScale } from '../scales/Scales'
import NoteAbc from '../notes/abcNotation/NoteAbc'

export async function apiGetAbc(req: Request, res: Response) {
  try {
    const { midi } = req.query
    if (midi == undefined)
      throw new Error('The midi query parameter is undefined')
    if (typeof midi != 'string')
      throw new Error('The midi query parameter is a string')

    const noteAbc = new NoteAbc(parseInt(midi))
    res.status(200).send(noteAbc)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
