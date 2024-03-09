import { ManaSymbol } from "../../../ManaSymbol/ManaSymbol"



export function MatchupTile({ matchup, winrate, matches }) {
  let matchupDisplay = matchup
  if (matchupDisplay === 'W' || matchupDisplay === 'U' || matchupDisplay === 'B' || matchupDisplay === 'R' || matchupDisplay === 'G') {
    matchupDisplay = <ManaSymbol symbol={matchupDisplay} />
  }

  return (
    <div className="matchup-tile-content-div">
      <p className="matchup-tile-content">vs. {matchupDisplay}</p>
      <p className="matchup-tile-content">{winrate}%</p>
      <p className="matchup-tile-content">{matches}</p>
    </div>
  )
}