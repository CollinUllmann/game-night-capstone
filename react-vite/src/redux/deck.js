
//Action Types
export const GET_DECKS = 'decks/getDecks'
export const CREATE_DECK = 'decks/createDeck'
export const GET_DECK = 'decks/getDeck'
export const UPDATE_DECK = 'decks/updateDeck'
export const DELETE_DECK = 'decks/deleteDeck'

//Action Creators
export const getDecks = decks => ({
  type: GET_DECKS,
  payload: decks
})

export const getDeck = deck => ({
  type: GET_DECK,
  payload: deck
})

export const createDeck = deck => ({
  type: CREATE_DECK,
  payload: deck
})

export const updateDeck = deck => ({
  type: UPDATE_DECK,
  payload: deck
})

export const deleteDeck = deckId => ({
  type: DELETE_DECK,
  deckId
})

//Thunks
export const thunkFetchAllDecks = () => async dispatch => {
  const res = await fetch('/api/decks')

  if (res.ok) {
    const decks = await res.json()
    dispatch(getDecks(decks))
  } else return 'get all decks thunk error'
}

export const thunkFetchDeckById = deckId => async dispatch => {
  const res = await fetch(`/api/decks/${deckId}`)

  if (res.ok) {
    const deck = await res.json()
    dispatch(getDeck(deck))
    return deck
  } else return 'get deck by id thunk error'
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

export const thunkUpdateDeck = (deckId, deck) => async dispatch => {
  const res = await fetch(`/api/decks/${deckId}`, {
    method: 'PUT',
    body: deck
  })

  if (res.ok) {
    const updatedDeck = await res.json()
    dispatch(updateDeck(updatedDeck))
    return updatedDeck
  } else return 'deck update thunk error'
}

export const thunkDeleteDeck = (deckId) => async dispatch => {
  const res = await fetch(`/api/decks/${deckId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const deleteConfirm = await res.json()
    dispatch(deleteDeck(deckId))
    return deleteConfirm
  } else return "deck delete thunk error"
}

//Reducer
const deckReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DECKS: {
      const newDeckState = { ...state }
      action.payload.decks.forEach(deck => { newDeckState[deck.id] = deck })
      return newDeckState
    }
    case GET_DECK: {
      const newDeckState = { ...state }
      newDeckState[action.payload.id] = action.payload
      return newDeckState
    }
    case CREATE_DECK: {
      const newDeckState = { ...state }
      newDeckState[action.payload.id] = action.payload
      return newDeckState
    }
    case DELETE_DECK: {
      const newDeckState = { ...state }
      delete newDeckState[action.deckId]
      return newDeckState
    }
    default:
      return state
  }
}

export default deckReducer