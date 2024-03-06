import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkFetchAllDecks } from "../../../redux/deck";
import { thunkFetchAllMatches } from "../../../redux/match";
import { DecklistPanel } from "../DecklistPanel/DecklistPanel";
import { MatchTile } from "../../MatchComponents/MatchTile/MatchTile";


import './DeckDetailsPage.css'


export function DeckDetailsPage() {
  const {deckId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const sessionUser = useSelector((state) => state.session.user);
  const deckById = useSelector(state => state.decks)
  const matchesById = useSelector(state => state.matches)
  const deck = deckById[deckId]
  const deckMatches = Object.values(matchesById).filter(match => {
    for (const matchDeckId of match.deckIds) {
      if (matchDeckId == deckId) {
       return true
      }
   }
   return false
  })

  
  useEffect(() => {
    dispatch(thunkFetchAllDecks())
    dispatch(thunkFetchAllMatches())
  }, [dispatch])


  
  // if (sessionUser?.id != deck?.userId) return <Navigate to="/" replace={true} />;
  
  let key = 1;
  return (
    <div>
      <p className="deck-details-title">{deck?.name} Details</p>
      <div className="deck-details-div">
        <div className="deck-details-decklist-sidepanel-div">
          <p className="deck-details-decklist-title">DeckList</p>
          <DecklistPanel className="deck-details-decklist-panel" deckId={deck?.id} />
        </div>
        <div className="deck-details-stats-matches-div">
          <div className="deck-details-deck-stats-div"></div>
          <p className="deck-details-deck-matches-title">Matches</p>
          <div className="deck-details-deck-matches-div">
            {deckMatches.map(match => {
              return <div className="deck-details-match-tile-div" key={key++}>
                <MatchTile className="deck-details-match-tile" match={match} onClick={() => navigate(`/matches/${match.id}`)} matchNum={key}/>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}