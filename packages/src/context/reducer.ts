import { Actions, actions } from './action'
import { LastLocationType } from './lastLocation'

export const reducer = (state: LastLocationType, action: Actions): LastLocationType => {
  switch (action.type) {
    case actions.SET_LAST_LOCATION:
      return action.payload
    default:
      return state
  }
}
