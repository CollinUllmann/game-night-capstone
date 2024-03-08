import { useState } from 'react'
import './DeckStats.css'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


export function DeckStats() {
  const { deckId } = useParams()

  const [selectedMatchupType, setSelectedMatchupType] = useState('player');

  const setMatchupVisibilityClass = (matchupType, baseClassName) => matchupType == selectedMatchupType ? baseClassName : `${baseClassName} hidden`
  

  const decksById = useSelector(state => state.decks)
  const deck = decksById[deckId]
  const matchesById = useSelector(state => state.matches)
  const deckMatches = Object.values(matchesById).filter(match => {
    for (const deckId of match.deckIds) {
      if (deckId == deck.id) {
        return true
      }
    }
    return false
  })

  const getDeckMatchupObj = (matchupType) => {
    if (matchupType == 'deck') {
      const matchCountByMatchupId = {}
      for (const match of deckMatches) {
        const winner = match.userIdWinner == decksById[deck.id].userId ? true : false
        for (const deckId of match.deckIds) {
          if (matchCountByMatchupId[deckId]){
            matchCountByMatchupId[deckId].count++;
            winner ? matchCountByMatchupId[deckId].wins++ : null
          } else {
            matchCountByMatchupId[deckId] = {
              count: 1,
              wins: winner ? 1 : 0
            }
          }
        }
      }
      return matchCountByMatchupId;
    }
    if (matchupType == 'player') {
      const matchCountByPlayerId = {}
      for (const match of deckMatches) {
        const winner = match.userIdWinner == decksById[deck.id].userId ? true : false
        for (const deckId of match.deckIds) {
          const playerId = deckByDeckId[deckId].userId
          if (matchCountByPlayerId[playerId]) {
            matchCountByPlayerId[playerId].count++;
            winner ? matchCountByPlayerId[playerId].wins++ : null
          } else {
            matchCountByPlayerId[playerId] = {
              count: 1,
              wins: winner ? 1 : 0
            }
          }
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
      for (const match of deckMatches) {
        const winner = match.userIdWinner == decksById[deck.id].userId ? true : false
        for (const deckId of match.deckIds) {
          const deckColors = new Set([])
          for (const card of decksById[deckId].cards) {
            const cardColors = card.colors.split('')
            for (const color of cardColors) {
              deckColors.add(color)
            }
          }
          const deckColorsArr = Array.from(deckColors)
          for (const color of deckColorsArr) {
            matchCountByColor[color].count++
            winner ? matchCountByColor[color].wins++ : null
          }
        }
      }
    }
    return matchCountByColor;
  }

  console.log('matchup object: ', getDeckMatchupObj('deck'))

  return (
    <div className="deck-stats-content-div">
      <div className="deck-stats-headers">
        <div className="deck-stats-header-div">
          <p className="deck-stats-header-title">Winrate</p>
          <p className="deck-stats-header-stat">25%</p>
        </div>
        <div className="deck-stats-header-div">
          <p className="deck-stats-header-title">Matches</p>
          <p className="deck-stats-header-stat">4-12</p>
        </div>
        <div className="deck-stats-header-div">
          <p className="deck-stats-header-title">Events</p>
          <p className="deck-stats-header-stat">6</p>
        </div>
      </div>
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
            {/* {playerMatchups.map(matchup => <MatchupTile matchup={matchup}/>)} */}
            <p>Test Player</p>
            <p>Test Player</p>
            <p>Test Player</p>
            <p>Test Player</p>
            <p>Test Player</p>
            <p>Test Player</p>
            <p>Test Player</p>
            <p>Test Player</p>
            <p>Test Player</p>
            <p>Test Player</p>
          </div>
          <div className={setMatchupVisibilityClass("deck", "deck-stats-matchups-content-matchup-div")}>
            {/* {deckMatchups.map(matchup => <MatchupTile matchup={matchup}/>)} */}
            <p>Test Deck</p>
            <p>Test Deck</p>
            <p>Test Deck</p>
            <p>Test Deck</p>
            <p>Test Deck</p>
            <p>Test Deck</p>
            <p>Test Deck</p>
            <p>Test Deck</p>
            <p>Test Deck</p>
            <p>Test Deck</p>
            <p>Test Deck</p>
            <p>Test Deck</p>
            <p>Test Deck</p>
          </div>
          <div className={setMatchupVisibilityClass("color", "deck-stats-matchups-content-matchup-div")}>
            {/* {colorMatchups.map(matchup => <MatchupTile matchup={matchup}/>)} */}
            <p>Test Color</p>
            <p>Test Color</p>
            <p>Test Color</p>
            <p>Test Color</p>
            <p>Test Color</p>
          </div>
        </div>
      </div>
    </div>
  )
}