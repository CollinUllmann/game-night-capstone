import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkFetchAllMatches } from "../../../../redux/match";
import { thunkFetchAllUsers } from "../../../../redux/users";
import { thunkFetchAllDecks } from "../../../../redux/deck";
import { Pie } from "react-chartjs-2";

import './EventStats.css'



export function EventStats() {
  const { eventId } = useParams()
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
  const cardsById = useSelector(state => state.cards)
  // const eventsById = useSelector(state => state.events)
  // const event = eventsById[eventId]

  const eventMatches = Object.values(matchesById).filter(match => match.eventId == eventId)

  const matchPlayersObj = {}
  const playerIds = []
  for (const match of eventMatches) {
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
  }

  const matchDecksObj = {}
  for (const match of eventMatches) {
    const deckIds = match.deckIds
    for (const deckId of deckIds) {
      let deckWins = 0;
      const deckMatches = Object.values(matchesById).filter(match => {
        const matchDeckIds = match.deckIds
        for (const matchDeckId of matchDeckIds) {
          if (matchDeckId == deckId) {
            if (match.userIdWinner == decksById[deckId].userId) deckWins++
            return true
          }
        }
        return false
      })
      matchDecksObj[deckId] = Math.floor((deckWins / deckMatches.length)*100)
    }
  }
    
  const deckColorDataObj = {
    'white': 0,
    'blue': 0,
    'black': 0,
    'red': 0,
    'green': 0
  }
  for (const match of eventMatches) {
    for (const deckId of match.deckIds) {
      const deck = decksById[deckId]
      const deckColors = new Set([])
      for (const card of deck.cards) {
        const cardObj = cardsById[card.cardId]
        const cardColors = cardObj?.colors.split('')
        if (!cardObj) continue
        for (const color of cardColors) {
          deckColors.add(color)
        }
      }
      const deckColorsArr = Array.from(deckColors)
      for (const color of deckColorsArr) {
        if (color == 'W') {
          deckColorDataObj['white']++
        } else if (color == 'U') {
          deckColorDataObj['blue']++
        } else if (color == 'B') {
          deckColorDataObj['black']++
        } else if (color == 'R') {
          deckColorDataObj['red']++
        } else if (color == 'G') {
          deckColorDataObj['green']++
        }
      }
    }
  }

  
  
  const matchColorsData = {
    labels: ['White', 'Blue', 'Black', 'Red', 'Green'],
    datasets: [
      {
        label: 'Deck Color Breakdown',
        data: [deckColorDataObj['white'], deckColorDataObj['blue'], deckColorDataObj['black'], deckColorDataObj['red'], deckColorDataObj['green'] ],
        backgroundColor: [
          'rgba(255, 251, 122, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 83, 0.2)',
        ],
        borderColor: [
          'rgba(255, 251, 122, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 83, 1)',
        ],
        borderWidth: 1,
      }
    ]
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position:'right'
      },
      title: {
        display: true,
        text: 'Decks Color Breakdown',
        position: 'top'
      }
    }
  }


  return (
    <div className="match-stats-body">
      <div className="match-stats-matchup-divs-div">
        <div className="match-stats-player-tiles-div">
          <div className="match-stats-matchups-content-headers-div">
            <p className="match-stats-matchups-content-header">Players</p>
            <p className="match-stats-matchups-content-header">Winrate</p>
          </div>
          {Object.keys(matchPlayersObj).map(playerId => {
            return <div key={playerId} className="match-stats-player-tile">
                <p>{usersById[playerId]?.username}</p>
                <p>{matchPlayersObj[playerId]}%</p>
            </div>
          })}
        </div>
        <div className="match-stats-player-tiles-div">
          <div className="match-stats-matchups-content-headers-div">
            <p className="match-stats-matchups-content-header">Decks</p>
            <p className="match-stats-matchups-content-header">Winrate</p>
          </div>
          {Object.keys(matchDecksObj).map(deckId => {
            return <div key={deckId} className="match-stats-deck-tile">
                <p>{decksById[deckId]?.name}</p>
                <p>{matchDecksObj[deckId]}%</p>
            </div>
          })}
        </div>
      </div>
      <div className="match-stats-pie-chart-div">
        <Pie data={matchColorsData} options={options} />
      </div>
    </div>
  )
}