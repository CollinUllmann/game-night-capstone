
//Action Types
export const GET_CARDS = 'cards/getCards'

//Action Creators
export const getCards = cards => ({
  type: GET_CARDS,
  payload: cards
})

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