



export function MatchupTile({ matchup, winrate, matches }) {








  return (
    <div className="matchup-tile-content-div">
      <p className="matchup-tile-content">{matchup}</p>
      <p className="matchup-tile-content">{winrate}%</p>
      <p className="matchup-tile-content">{matches}</p>
    </div>
  )
}