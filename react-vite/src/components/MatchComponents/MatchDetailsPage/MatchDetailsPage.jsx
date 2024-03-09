import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkFetchAllMatches } from "../../../redux/match";
import { DeckTile } from "../../DeckComponents/DeckTile/DeckTile";
import { thunkFetchAllDecks } from "../../../redux/deck";
import { DecklistPanel } from "../../DeckComponents/DecklistPanel/DecklistPanel";
import { MatchStats } from "./MatchStats/MatchStats";


import './MatchDetailsPage.css'


export function MatchDetailsPage() {
  const {matchId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const sessionUser = useSelector((state) => state.session.user);
  const matchById = useSelector(state => state.matches)
  const decksById = useSelector(state => state.decks)
  const match = matchById[matchId]
  const matchDecks = Object.values(decksById).filter(deck => {
    if (!match) return
    for (const deckId of match.deckIds) {
      if (deck.id == deckId) {
       return true
      }
   }
   return false
  })

  let winningDeckId
  if (match) {
    winningDeckId = Object.values(match.deckIds).filter(deckId => decksById[deckId].userId == match?.userIdWinner)
  } 

  
  useEffect(() => {
    dispatch(thunkFetchAllMatches())
    dispatch(thunkFetchAllDecks())
  }, [dispatch])



  if (!winningDeckId) return
  // if (sessionUser?.id != match?.userId) return <Navigate to="/" replace={true} />;
  
  let key = 1;
  return (
    <div>
      <p className="match-details-title">Match Details</p>
      <div className="match-details-div">
        <div className="match-details-decklist-sidepanel-div">
          <p className="match-details-decklist-title">Winning Decklist</p>
          <DecklistPanel className="match-details-decklist-panel" deckId={winningDeckId} />
        </div>
        <div className="match-details-stats-decks-div">
          <div className="match-details-match-stats-div">
            <MatchStats />
          </div>
          <p className="match-details-match-decks-title">Decks</p>
          <div className="match-details-match-decks-div">
            {matchDecks.map(deck => <div key={key++} onClick={() => navigate(`/decks/${deck.id}`)} className="match-details-decktile-div"><DeckTile deck={deck} key={key++} /></div>)}

          </div>
        </div>
      </div>
    </div>
  )
}