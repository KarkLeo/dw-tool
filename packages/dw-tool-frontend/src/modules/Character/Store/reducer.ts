import { ABILITIES, ICharacterData } from 'dw-tool-meta'
import { initState } from 'src/modules/Character/Store/initState'
import * as actions from './actions'

type ActionsName = keyof typeof actions
type Action = ReturnType<typeof actions[ActionsName]>

export const reducer = (
  state: ICharacterData = initState,
  action: Action
): ICharacterData => {
  switch (action.type) {
    case 'SET_CHARACTER_NAME':
      return { ...state, name: action.payload }
    case 'SET_CHARACTER_LOOKS':
      return {
        ...state,
        looks: { ...state.looks, [action.payload.index]: action.payload.value },
      }
    case 'SET_CHARACTER_CLASS':
      return { ...initState, name: state.name, class: action.payload }
    case 'SET_CHARACTER_RACE':
      return { ...state, race: action.payload }
    case 'SET_CHARACTER_ALIGNMENT':
      return { ...state, alignment: action.payload }
    case 'SET_CHARACTER_ABILITY':
      return {
        ...state,
        abilities: {
          ...state.abilities,
          [action.payload.ability]: action.payload.value,
        } as Record<ABILITIES, number>,
      }
    default:
      return state
  }
}
