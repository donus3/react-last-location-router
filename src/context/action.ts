import { Location } from 'react-router-dom'

export const actions = {
  SET_LAST_LOCATION: 'SET_LAST_LOCATION'
} as const

export interface Actions {
  type: typeof actions.SET_LAST_LOCATION
  payload: Location | null
}
