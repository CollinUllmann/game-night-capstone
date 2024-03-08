import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkFetchAllMatches } from "../../../../redux/match";
import { thunkFetchAllUsers } from "../../../../redux/users";
import { thunkFetchAllDecks } from "../../../../redux/deck";

import './MatchStats.css'



export function MatchStats() {
  const { matchId } = useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkFetchAllMatches())
    dispatch(thunkFetchAllDecks())
    dispatch(thunkFetchAllUsers())
  }, [dispatch])

  // const cardsById = useSelector(state => state.cards)
  const decksById = useSelector(state => state.decks)
  const usersById = useSelector(state => state.users)
  const matchesById = useSelector(state => state.matches)

  const match = matchesById[matchId]


  const matchPlayersObj = {}

  const playerIds = []
  for (const deckId of match.deckIds) {
    playerIds.push(decksById[deckId].userId)
  }
  for (const playerId of playerIds) {
    // const user = usersById[playerId]
    let userWins = 0
    const userMatches = Object.values(matchesById).filter(match => {
      if (match.userIdWinner == playerId) userWins++
      for (const deckId of match.deckIds) {
        if (decksById[deckId].userId == playerId) {
          return true
        }
      }
      return false
    })
    matchPlayersObj[playerId] = Math.floor((userWins / userMatches.length) * 100)
  }
    

  console.log(matchPlayersObj)
  return (
    <div>
      <div className="match-stats-player-tiles-div">
        {Object.keys(matchPlayersObj).map(playerId => {
          return <div key={playerId} className="match-stats-player-tile">
              <p>{usersById[playerId]?.username}</p>
              <p>{matchPlayersObj[playerId]}</p>
          </div>
        })}
      </div>
    </div>
  )
}