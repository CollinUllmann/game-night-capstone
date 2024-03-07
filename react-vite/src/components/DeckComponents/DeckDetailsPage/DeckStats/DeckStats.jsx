import './DeckStats.css'


export function DeckStats() {


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
            <p className="deck-stats-matchups-header-filter">Player</p>
            <p className="deck-stats-matchups-header-filter">Deck</p>
            <p className="deck-stats-matchups-header-filter">Color</p>
          </div>
        </div>
        <div className="deck-stats-matchups-content-div">
          <div className="deck-stats-matchups-content-headers-div">
            <p className="deck-stats-matchups-content-header">Matchup</p>
            <p className="deck-stats-matchups-content-header">Winrate</p>
            <p className="deck-stats-matchups-content-header">Matches</p>
          </div>
          <div className="deck-stats-matchups-content-player-matchup-div">
            {/* {playerMatchups.map(matchup => <MatchupTile matchup={matchup}/>)} */}
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
          </div>
          <div className="deck-stats-matchups-content-deck-matchup-div">
            {/* {deckMatchups.map(matchup => <MatchupTile matchup={matchup}/>)} */}
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
          </div>
          <div className="deck-stats-matchups-content-color-matchup-div">
            {/* {colorMatchups.map(matchup => <MatchupTile matchup={matchup}/>)} */}
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
          </div>
        </div>
      </div>
    </div>
  )
}