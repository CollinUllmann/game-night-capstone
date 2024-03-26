
//Action Types
export const GET_CARDS = 'cards/getCards'

//Action Creators
export const getCards = cards => ({
  type: GET_CARDS,
  payload: cards
})

//Thunks
export const thunkFetchAllCards = () => async dispatch => {
  const res = await fetch('/api/cards')

  if (res.ok) {
    const { cards } = await res.json()
    dispatch(getCards(cards))
  } else return 'get all cards thunk error'
}
export const thunkFetchCardById = cardId => async dispatch => {
  const res = await fetch(`/api/cards/${cardId}`)

  if (res.ok) {
    const { cards } = await res.json()
    dispatch(getCards(cards))
  } else return 'get all cards thunk error'
}

//Reducer
const cardReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CARDS: {
      const newCardState = { ...state }
      action.payload.forEach(card => { newCardState[card.id] = card })
      return newCardState
    }
    default:
      return state
  }
}

export default cardReducer