
//Action Types
export const GET_DECKS = 'decks/getDecks'
export const CREATE_DECK = 'decks/createDeck'

//Action Creators
export const getDecks = decks => ({
  type: GET_DECKS,
  payload: decks
})

export const createDeck = deck => ({
  type: CREATE_DECK,
  payload: deck
})

//Thunks
export const thunkFetchAllDecks = () => async dispatch => {
  const res = await fetch('/api/decks')

  if (res.ok) {
    const decks = await res.json()
    dispatch(getDecks(decks))
  } else return 'get all decks thunk error'
}

export const thunkCreateDeck = (deck) => async dispatch => {
  const res = await fetch('/api/decks/', {
    method: 'POST',
    body: deck
  })

  if (res.ok) {
    const newDeck = await res.json()
    dispatch(createDeck(newDeck))
    return newDeck
  } else return 'deck create thunk error'
}

//Reducer
const deckReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DECKS: {
      const newDeckState = { ...state }
      action.payload.decks.forEach(deck => { newDeckState[deck.id] = deck })
      return newDeckState
    }
    case CREATE_DECK: {
      const newDeckState = { ...state }
      newDeckState[action.payload.id] = action.payload
      return newDeckState
    }
    default:
      return state
  }
}

export default deckReducer