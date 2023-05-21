//Ici on crée une classe qui permet de se connecter à l'API GPTone en envoyant une requête HTTP

import { GPToneRequest } from './Types/GPToneRequest'
import fetch from 'node-fetch'

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
    const response = await fetch(this.apiURL + '/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        pseudo,
        randomness,
        richness,
        aiPersonality,
        isNewConversation,
      }),
    })
    const json = await response.json()
    return json
  }
}
