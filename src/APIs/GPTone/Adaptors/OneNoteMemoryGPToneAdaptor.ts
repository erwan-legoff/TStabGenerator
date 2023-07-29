import { log } from 'console'
import NoteOne from '../../../notes/noteOnes/NoteOne'
import { GenericalScale } from '../../../scales/GenericalScale'
import { GPToneConnector } from '../GPToneConnector'
import PromptEnum from '../Types/Enums/PromptEnum'
import SystemEnum from '../Types/Enums/SystemEnum'
import { IOneNoteAdaptor } from './IOneNoteAdaptor'
/**
 * This class should use GPTone to get a note from a scale while using the memory of the previous notes
 */
export class OneNoteMemoryGPToneAdaptor implements IOneNoteAdaptor {
  gptone: GPToneConnector = new GPToneConnector('http://localhost:3000')
  memory: NoteOne[] = []

  AI_PERSONALITY_START = SystemEnum.COMPOSITOR_V0_0
  AI_PERSONALITY_MIDDLE = SystemEnum.COMPOSITOR_V0_1
  AI_PERSONALITY_END = SystemEnum.COMPOSITOR_V0_END

  async getOneNote(scale: GenericalScale): Promise<NoteOne> {
    try {
      const prompt = PromptEnum.ROCK_V0
      const pseudo = 'Musician'
      const randomness = 0.3
      const richness = 0.2
      const ROOT = NoteOne.noteNameToNote('C4')
      const SCALE_NOTES = scale.getNotes(ROOT)
      //const aiPersonality = SystemEnum.COMPOSITOR_V1
      const aiPersonality = this.getAIPersonality(scale, SCALE_NOTES)

      // console.log('aiPersonality', aiPersonality)
      // console.log('SCALE_NOTES_NAMES_STRING', SCALE_NOTES_NAMES_STRING)
      // console.log('SCALE_NOTES_NAMES', SCALE_NOTES_NAMES)
      // console.log('SCALE_NOTES', SCALE_NOTES)
      console.log('PROMPT', prompt)
      const GPT_ONE_URL = process.env.GPT_ONE_URL || 'http://localhost:3000'

      const isNewConversation = true

      const connector = new GPToneConnector(GPT_ONE_URL)
      const note = await this.getOneNoteUtil(
        connector,
        prompt,
        pseudo,
        randomness,
        richness,
        aiPersonality,
        isNewConversation,
        SCALE_NOTES
      )

      this.memory.push(note)
      return note
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private getAIPersonality(scale: GenericalScale, SCALE_NOTES: NoteOne[]) {
    const SCALE_NAME = scale.getName()
    const SCALE_NOTES_NAMES = SCALE_NOTES.map(
      (note, i) => `{noteIndex:${i}, noteName:${note.getName()}}`
    )
    const SCALE_NOTES_NAMES_STRING = SCALE_NOTES_NAMES.join(',')
    const AI_PERSONNALITY_LIMIT = `${this.AI_PERSONALITY_MIDDLE} ${
      SCALE_NOTES.length - 1
    }`
    // On présente la mémoire de la même manière que les notes de la gamme, pour qu'il retrouve l'index dans le tableau
    const parsedOldNotes = this.getMemory(SCALE_NOTES)

    const memory = 'Start of the melody to complete : ' + parsedOldNotes
    const aiPersonality = `${this.AI_PERSONALITY_START} ${SCALE_NAME} : ${SCALE_NOTES_NAMES_STRING} ${AI_PERSONNALITY_LIMIT} ${this.AI_PERSONALITY_END} \n ${memory}`

    log('aiPersonality', aiPersonality)
    return aiPersonality
  }

  private getMemory(SCALE_NOTES: NoteOne[]) {
    return this.memory
      .map((note) => {
        // On récupère l'index de la note dans la gamme
        const index = SCALE_NOTES.findIndex(
          (scaleNote) => scaleNote.getName() === note.getName()
        )
        return `{noteIndex:${index}, noteName:${note.getName()}}`
      })
      .join(',')
  }

  private async getOneNoteUtil(
    connector: GPToneConnector,
    prompt: string,
    pseudo: string,
    randomness: number,
    richness: number,
    aiPersonality: string,
    isNewConversation: boolean,
    SCALE_NOTES: NoteOne[]
  ) {
    const initialResponse = await connector.fetchAPI({
      prompt,
      pseudo,
      randomness,
      richness,
      aiPersonality,
      isNewConversation,
    })
    let answer = initialResponse.response
    let parsedNoteScaleNumber = parseInt(answer)

    let errorResponseToGPTone = getError(parsedNoteScaleNumber, SCALE_NOTES)
    // console.log('errorResponseToGPTone', errorResponseToGPTone)
    // console.log('initialResponse', initialResponse)
    // console.log('answer', answer)

    while (errorResponseToGPTone !== '') {
      // console.log('errorResponseToGPTone', errorResponseToGPTone)
      // console.log('initialResponse', initialResponse)
      // console.log('answer', answer)
      const response = await connector.fetchAPI({
        prompt: answer + errorResponseToGPTone,
        pseudo,
        randomness,
        richness,
        aiPersonality,
        conversationId: initialResponse.conversationId,
      })
      answer = response.response
      parsedNoteScaleNumber = parseInt(answer)
      errorResponseToGPTone = getError(parsedNoteScaleNumber, SCALE_NOTES)
    }

    const playedNote = SCALE_NOTES[parsedNoteScaleNumber]
    console.log('playedNote', playedNote)

    return playedNote
  }
}
function getError(parsedNoteScaleNumber: number, SCALE_NOTES: NoteOne[]) {
  let errorResponseToGPTone = ''

  if (isNaN(parsedNoteScaleNumber)) {
    errorResponseToGPTone += 'is not a number, please try again'
  } else if (parsedNoteScaleNumber < 0) {
    errorResponseToGPTone += 'is negative, please try again'
  } else if (parsedNoteScaleNumber >= SCALE_NOTES.length) {
    errorResponseToGPTone +=
      'is above ' + (SCALE_NOTES.length - 1) + ', please try again'
  }
  return errorResponseToGPTone
}
