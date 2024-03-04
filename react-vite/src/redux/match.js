import { getDecks } from "./deck"

//Action Types
export const GET_MATCHES = 'matches/getMatches'
export const CREATE_MATCH = 'matches/createMatch'
export const GET_MATCH = 'matches/getMatch'
export const UPDATE_MATCH = 'matches/updateMatch'
export const DELETE_MATCH = 'matches/deleteMatch'

//Action Creators
export const getMatches = matches => ({
  type: GET_MATCHES,
  payload: matches
})

export const getMatch = match => ({
  type: GET_MATCH,
  payload: match
})

export const createMatch = match => ({
  type: CREATE_MATCH,
  payload: match
})

export const updateMatch = match => ({
  type: UPDATE_MATCH,
  payload: match
})

export const deleteMatch = matchId => ({
  type: DELETE_MATCH,
  matchId
})

//Thunks
export const thunkFetchAllMatches = () => async dispatch => {
  const res = await fetch('/api/matches')

  if (res.ok) {
    const { decks, matches } = await res.json()
    dispatch(getMatches(matches))
    dispatch(getDecks(decks))
  } else return 'get all matches thunk error'
}

export const thunkFetchMatchById = matchId => async dispatch => {
  const res = await fetch(`/api/matches/${matchId}`)

  if (res.ok) {
    const { decks, matches } = await res.json()
    dispatch(getMatches(matches))
    dispatch(getDecks(decks))
    return matches[0]
  } else return 'get match by id thunk error'
}

export const thunkCreateMatch = (match) => async dispatch => {
  const res = await fetch('/api/matches/', {
    method: 'POST',
    body: match
  })

  if (res.ok) {
    const newMatch = await res.json()
    dispatch(createMatch(newMatch))
    return newMatch
  } else return 'match create thunk error'
}

export const thunkUpdateMatch = (matchId, match) => async dispatch => {
  const res = await fetch(`/api/matches/${matchId}`, {
    method: 'PUT',
    body: match
  })

  if (res.ok) {
    const updatedMatch = await res.json()
    dispatch(updateMatch(updatedMatch))
    return updatedMatch
  } else return 'match update thunk error'
}

export const thunkDeleteMatch = (matchId) => async dispatch => {
  const res = await fetch(`/api/matches/${matchId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const deleteConfirm = await res.json()
    dispatch(deleteMatch(matchId))
    return deleteConfirm
  } else return "match delete thunk error"
}

//Reducer
const matchReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MATCHES: {
      const newMatchState = { ...state }
      action.payload.forEach(match => { newMatchState[match.id] = match })
      return newMatchState
    }
    case GET_MATCH: {
      const newMatchState = { ...state }
      newMatchState[action.payload.id] = action.payload
      return newMatchState
    }
    case CREATE_MATCH: {
      const newMatchState = { ...state }
      newMatchState[action.payload.id] = action.payload
      return newMatchState
    }
    case DELETE_MATCH: {
      const newMatchState = { ...state }
      delete newMatchState[action.matchId]
      return newMatchState
    }
    default:
      return state
  }
}

export default matchReducer