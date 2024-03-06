// import { getCards } from "./card"

//Action Types
export const GET_USERS = 'users/getUsers'
export const GET_USER = 'users/getUser'

//Action Creators
export const getUsers = users => ({
  type: GET_USERS,
  payload: users
})

export const getUser = user => ({
  type: GET_USER,
  payload: user
})

//Thunks
export const thunkFetchAllUsers = () => async dispatch => {
  const res = await fetch('/api/users')

  if (res.ok) {
    const users = await res.json()
    dispatch(getUsers(users.users))
  } else return 'get all users thunk error'
}

export const thunkFetchUserById = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}`)

  if (res.ok) {
    const users = await res.json()
    dispatch(getUsers([users]))
    return users[0]
  } else return 'get user by id thunk error'
}



//Reducer
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS: {
      const newUserState = { ...state }
      action.payload.forEach(user => { newUserState[user.id] = user })
      return newUserState
    }
    case GET_USER: {
      const newUserState = { ...state }
      newUserState[action.payload.id] = action.payload
      return newUserState
    }
    default:
      return state
  }
}

export default userReducer