import { useEffect, useState } from 'react'
// import './DeckStats.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchAllCards } from '../../../redux/card';
import { MatchupTile } from './MatchupTile/MatchupTile';
import './PlayerStats.css'


export function PlayerStats() {
  const { userId } = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [selectedMatchupType, setSelectedMatchupType] = useState('player');

  const setMatchupVisibilityClass = (matchupType, baseClassName) => matchupType == selectedMatchupType ? baseClassName : `${baseClassName} hidden`
  
  useEffect(() => {
    dispatch(thunkFetchAllCards())
  }, [dispatch])

  const cardsById = useSelector(state => state.cards)
  const decksById = useSelector(state => state.decks)
  const usersById = useSelector(state => state.users)
  // const user = usersById[userId]
  const matchesById = useSelector(state => state.matches)
  const playerMatches = Object.values(matchesById).filter(match => {
    for (const deckId of match.deckIds) {
      if (decksById[deckId]?.userId == userId) {
        return true
      }
    }
    return false
  })
  const playerWins = playerMatches.filter(match => match.userIdWinner == userId)

  const getPlayerMatchupObj = (matchupType) => {
    if (matchupType == 'deck') {
      const matchCountByMatchupId = {}
      for (const match of playerMatches) {
        const winner = match.userIdWinner == userId
        for (const deckId of match.deckIds) {
          if (decksById[deckId].userId == userId) continue
          if (!matchCountByMatchupId[deckId]) {
            matchCountByMatchupId[deckId] = {
              count: 0,
              wins: 0
            }
          }

          matchCountByMatchupId[deckId].count++;
          if(winner) matchCountByMatchupId[deckId].wins++;
        }
      }
      return matchCountByMatchupId;
    }
    if (matchupType == 'player') {
      const matchCountByPlayerId = {}
      for (const match of playerMatches) {
        const winner = match.userIdWinner == userId
        for (const deckId of match.deckIds) {
          if (decksById[deckId].userId == userId) continue
          const playerId = decksById[deckId].userId
          if (!matchCountByPlayerId[playerId]) {
            matchCountByPlayerId[playerId] = {
              count: 0,
              wins: 0
            }
          }
          
          matchCountByPlayerId[playerId].count++;
          if(winner) matchCountByPlayerId[playerId].wins++;
        }
      }
      return matchCountByPlayerId;
    }
    if (matchupType == 'color') {
      const matchCountByColor = {
        'W': {
          count: 0,
          wins: 0
        },
        'U': {
          count: 0,
          wins: 0
        },
        'B': {
          count: 0,
          wins: 0
        },
        'R': {
          count: 0,
          wins: 0
        },
        'G': {
          count: 0,
          wins: 0
        }
      }
      for (const match of playerMatches) {
        const winner = match.userIdWinner == userId
        for (const deckId of match.deckIds) {
          if(userId == decksById[deckId].userId) continue;
          
          const deckColors = new Set([])
          const tempDeck = decksById[deckId]
          for (const card of tempDeck.cards) {
            const tempCard = cardsById[card.cardId]

            if (tempCard?.colors) {
              const cardColors = tempCard.colors.split('')
              for (const color of cardColors) {
                deckColors.add(color)
              }
            }
          }
          const deckColorsArr = Array.from(deckColors)
          for (const color of deckColorsArr) {
            matchCountByColor[color].count++
            if(winner) matchCountByColor[color].wins++;
          }
        }
      }
      return matchCountByColor;
    }
  }

  const matchEventIds = new Set([])
  for (const match of playerMatches) {
    matchEventIds.add(match.eventId)
  }
  const matchEventIdArr = Array.from(matchEventIds)

  // console.log('matchup object: ', getDeckMatchupObj('color'))

  const playerMatchupObj = getPlayerMatchupObj(selectedMatchupType)
  let key = 0;
  return (
    <>
      <div className="deck-stats-headers">
        <div className="deck-stats-header-div">
          <p className="deck-stats-header-title">Winrate</p>
          <p className="deck-stats-header-stat">{playerMatches.length == 0 ? 0 : Math.floor((playerWins.length / playerMatches.length)*100)}%</p>
        </div>
        <div className="deck-stats-header-div">
          <p className="deck-stats-header-title">Matches</p>
          <p className="deck-stats-header-stat">{playerWins.length} - {playerMatches.length - playerWins.length}</p>
        </div>
        <div className="deck-stats-header-div">
          <p className="deck-stats-header-title">Events</p>
          <p className="deck-stats-header-stat">{matchEventIdArr.length}</p>
        </div>
      </div>
      <div className="deck-stats-content-div">
        <div className="deck-stats-matchups-header">
          <div className="deck-stats-matchups-header-container">
            <div className="deck-stats-matchups-header-title-div">
              <p className="deck-stats-matchups-header-title">Matchups</p>
            </div>
            <div className="deck-stats-matchups-header-filters-div">
              <p className={selectedMatchupType == 'player' ? "deck-stats-matchups-header-filter bold" : "deck-stats-matchups-header-filter"} onClick={() => setSelectedMatchupType('player')}>Player</p>
              <p className={selectedMatchupType == 'deck' ? "deck-stats-matchups-header-filter bold" : "deck-stats-matchups-header-filter"} onClick={() => setSelectedMatchupType('deck')}>Deck</p>
              <p className={selectedMatchupType == 'color' ? "deck-stats-matchups-header-filter bold" : "deck-stats-matchups-header-filter"} onClick={() => setSelectedMatchupType('color')}>Color</p>
            </div>
          </div>
          <div className="deck-stats-matchups-content-div">
            <div className="deck-stats-matchups-content-headers-div">
              <p className="deck-stats-matchups-content-header">Matchup</p>
              <p className="deck-stats-matchups-content-header">Winrate</p>
              <p className="deck-stats-matchups-content-header">Matches</p>
            </div>
            <div className={setMatchupVisibilityClass("player", "deck-stats-matchups-content-matchup-div")}>
              {Object.keys(playerMatchupObj).map(playerId => {
                return <div className='deck-stats-matchup-tile-div' key={playerId} onClick={() => navigate(`/users/${playerId}`)}>
                  <MatchupTile key={playerId} matchup={usersById[playerId]?.username} winrate={Math.floor((playerMatchupObj[playerId].wins / playerMatchupObj[playerId].count)*100)} matches={`${playerMatchupObj[playerId].wins}-${playerMatchupObj[playerId].count - playerMatchupObj[playerId].wins}`} /> 
                </div>
              }
              )}
            </div>
            <div className={setMatchupVisibilityClass("deck", "deck-stats-matchups-content-matchup-div")}>
              {Object.keys(playerMatchupObj).map(deckId => {
                return <div className='deck-stats-matchup-tile-div' key={deckId} onClick={() => navigate(`/decks/${deckId}`)}>
                  <MatchupTile key={deckId} matchup={decksById[deckId]?.name} winrate={Math.floor((playerMatchupObj[deckId].wins / playerMatchupObj[deckId].count)*100)} matches={`${playerMatchupObj[deckId].wins}-${playerMatchupObj[deckId].count - playerMatchupObj[deckId].wins}`} /> 
                </div>
              }
              )}
            </div>
            <div className={setMatchupVisibilityClass("color", "deck-stats-matchups-content-matchup-div")}>
              {Object.keys(playerMatchupObj).map(color => <MatchupTile key={key++} matchup={color} winrate={playerMatchupObj[color].count == 0 ? 0 : Math.floor((playerMatchupObj[color].wins / playerMatchupObj[color].count)*100)} matches={`${playerMatchupObj[color].wins}-${playerMatchupObj[color].count - playerMatchupObj[color].wins}`} /> )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}