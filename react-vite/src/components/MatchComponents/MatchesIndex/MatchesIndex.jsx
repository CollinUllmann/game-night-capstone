import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchAllMatches } from "../../../redux/match";
import { MatchTile } from "../MatchTile/MatchTile";
import { AddMatchTile } from "../MatchTile/AddMatchTile";
import { useNavigate } from "react-router-dom";

import './MatchesIndex.css'
import { MatchlistPanel } from "../MatchlistPanel/MatchlistPanel";

export function MatchesIndex() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const matchesObj = useSelector(state => state.matches)
  const matches = Object.values(matchesObj)

  const [selectedMatchId, setSelectedMatchId] = useState(null)

  useEffect(() => {
    dispatch(thunkFetchAllMatches())
  }, [dispatch])

  return (
    <div className="matches-index-div">
      <h1>Matches</h1>
      <div className="match-index-tile-div">
        {matches.map(match => <MatchTile onClick={() => setSelectedMatchId(match.id)} match={match} key={match.id} />)}
        <div className="add-match-button-div" onClick={() => navigate('/matches/new')}>
          <AddMatchTile />
        </div>
      </div>

    </div>
  )
}