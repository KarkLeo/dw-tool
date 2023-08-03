import { CLASSES, RACES } from 'dw-tool-meta'

export interface CharacterListResponseInterface {
  id: number
  name: string
  class: CLASSES
  race: RACES
  alignment: string
  createdAt: Date
  updatedAt: Date
}
