import { getMatches } from "./match"

//Action Types
export const GET_EVENTS = 'events/getEvents'
export const CREATE_EVENT = 'events/createEvent'
export const GET_EVENT = 'events/getEvent'
export const UPDATE_EVENT = 'events/updateEvent'
export const DELETE_EVENT = 'events/deleteEvent'

//Action Creators
export const getEvents = events => ({
  type: GET_EVENTS,
  payload: events
})

export const getEvent = event => ({
  type: GET_EVENT,
  payload: event
})

export const createEvent = event => ({
  type: CREATE_EVENT,
  payload: event
})

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  payload: event
})

export const deleteEvent = eventId => ({
  type: DELETE_EVENT,
  eventId
})

//Thunks
export const thunkFetchAllEvents = () => async dispatch => {
  const res = await fetch('/api/events')

  if (res.ok) {
    const { events, matches } = await res.json()
    dispatch(getEvents(events))
    dispatch(getMatches(matches))
  } else return 'get all events thunk error'
}

export const thunkFetchEventById = eventId => async dispatch => {
  const res = await fetch(`/api/events/${eventId}`)

  if (res.ok) {
    const { events, matches } = await res.json()
    dispatch(getEvents(events))
    dispatch(getMatches(matches))
    return events[0]
  } else return 'get event by id thunk error'
}

export const thunkCreateEvent = (event) => async dispatch => {
  const res = await fetch('/api/events/', {
    method: 'POST',
    body: event
  })

  if (res.ok) {
    const newEvent = await res.json()
    dispatch(createEvent(newEvent))
    return newEvent
  } else return 'event create thunk error'
}

export const thunkUpdateEvent = (eventId, event) => async dispatch => {
  const res = await fetch(`/api/events/${eventId}`, {
    method: 'PUT',
    body: event
  })

  if (res.ok) {
    const updatedEvent = await res.json()
    dispatch(updateEvent(updatedEvent))
    return updatedEvent
  } else return 'event update thunk error'
}

export const thunkDeleteEvent = (eventId) => async dispatch => {
  const res = await fetch(`/api/events/${eventId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const deleteConfirm = await res.json()
    dispatch(deleteEvent(eventId))
    return deleteConfirm
  } else return "event delete thunk error"
}

//Reducer
const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENTS: {
      const newEventState = { ...state }
      action.payload.forEach(event => { newEventState[event.id] = event })
      return newEventState
    }
    case GET_EVENT: {
      const newEventState = { ...state }
      newEventState[action.payload.id] = action.payload
      return newEventState
    }
    case CREATE_EVENT: {
      const newEventState = { ...state }
      newEventState[action.payload.id] = action.payload
      return newEventState
    }
    case DELETE_EVENT: {
      const newEventState = { ...state }
      delete newEventState[action.eventId]
      return newEventState
    }
    default:
      return state
  }
}

export default eventReducer