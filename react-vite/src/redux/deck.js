
//Action Types
export const GET_DECKS = 'decks/getDecks'

//Action Creators
export const getDecks = decks => ({
  type: GET_DECKS,
  payload: decks
})

//Thunks
export const thunkFetchAllDecks = () => async dispatch => {
  const res = await fetch('/api/decks')

  if (res.ok) {
    const decks = await res.json()
    dispatch(getDecks(decks))
  } else return 'get all decks thunk error'
}

//Reducer
const deckReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DECKS: {
      const newDeckState = { ...state }
      action.payload.decks.forEach(deck => { newDeckState[deck.id] = deck })
      return newDeckState
    }
    default:
      return state
  }
}

export default deckReducer