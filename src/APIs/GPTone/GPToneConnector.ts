//Ici on crée une classe qui permet de se connecter à l'API GPTone en envoyant une requête HTTP

import { GPToneRequest } from './Types/GPToneRequest'
import axios from 'axios'

//On utilise la librairie Axios pour envoyer la requête HTTP
export class GPToneConnector {
  apiURL: string
  constructor(apiURL: string) {
    this.apiURL = apiURL
  }
  async fetchAPI({
    prompt,
    pseudo,
    randomness,
    richness,
    aiPersonality,
    isNewConversation,
  }: GPToneRequest) {
    const response = await axios.post(
      this.apiURL + '/generate',
      {
        prompt,
        pseudo,
        randomness,
        richness,
        aiPersonality,
        isNewConversation,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data
  }
}