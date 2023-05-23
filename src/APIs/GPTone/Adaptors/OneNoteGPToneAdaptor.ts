import NoteOne from '../../../notes/NoteOne'
import { GenericalScale } from '../../../scales/GenericalScale'
import { GPToneConnector } from '../GPToneConnector'
import PromptEnum from '../Types/Enums/PromptEnum'
import SystemEnum from '../Types/Enums/SystemEnum'
import { IOneNoteAdaptor } from './IOneNoteAdaptor'

export class OneNoteGPToneAdaptor implements IOneNoteAdaptor {
  gptone: GPToneConnector = new GPToneConnector('http://localhost:3000')

  async getOneNote(scale: GenericalScale): Promise<NoteOne> {
    try {
      const prompt = PromptEnum.ROCK_V0
      const pseudo = 'Pseudo'
      const randomness = 0.5
      const richness = 0.5
      //const aiPersonality = SystemEnum.COMPOSITOR_V1
      const aiPersonalityStart = SystemEnum.COMPOSITOR_V0_0
      const aiPersonalityMiddle = SystemEnum.COMPOSITOR_V0_1
      const aiPersonalityEnd = SystemEnum.COMPOSITOR_V0_END
      const SCALE_NAME = scale.getName()
      const ROOT = NoteOne.noteNameToNote('C4')
      const SCALE_NOTES = scale.getNotes(ROOT)
      const SCALE_NOTES_NAMES = SCALE_NOTES.map((note) => note.getName())
      const SCALE_NOTES_NAMES_STRING = SCALE_NOTES_NAMES.join('-')
      const aiPersonalityLimit = `${aiPersonalityMiddle} 0 and ${
        SCALE_NOTES.length - 1
      }`
      const aiPersonality = `${aiPersonalityStart} ${SCALE_NAME} : ${SCALE_NOTES_NAMES_STRING} ${aiPersonalityLimit} ${aiPersonalityEnd}`

      console.log('aiPersonality', aiPersonality)
      console.log('SCALE_NOTES_NAMES_STRING', SCALE_NOTES_NAMES_STRING)
      console.log('SCALE_NOTES_NAMES', SCALE_NOTES_NAMES)
      console.log('SCALE_NOTES', SCALE_NOTES)
      console.log('PROMPT', prompt)
      const GPT_ONE_URL = process.env.GPT_ONE_URL || 'http://localhost:3000'

      const isNewConversation = true

      const connector = new GPToneConnector(GPT_ONE_URL)

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
      console.log('errorResponseToGPTone', errorResponseToGPTone)
      console.log('initialResponse', initialResponse)
      console.log('answer', answer)

      while (errorResponseToGPTone !== '') {
        console.log('errorResponseToGPTone', errorResponseToGPTone)
        console.log('initialResponse', initialResponse)
        console.log('answer', answer)
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
    } catch (error) {
      console.error(error)
      throw error
    }
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
