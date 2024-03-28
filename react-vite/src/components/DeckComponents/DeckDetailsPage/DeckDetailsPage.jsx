import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkFetchAllDecks, thunkFetchDeckById } from "../../../redux/deck";
import { thunkFetchAllMatches } from "../../../redux/match";
import { DecklistPanel } from "../DecklistPanel/DecklistPanel";
import { MatchTile } from "../../MatchComponents/MatchTile/MatchTile";
import { DeckStats } from "./DeckStats/DeckStats";
import { DeckConstruction } from "./DeckStats/DeckConstruction/DeckConstruction";
import OpenModalUpdateIcon from "../DeckTile/OpenUpdateIconModal";
import { DeckFormModal } from "../DeckFormModal/DeckFormModal";
import OpenModalDeleteIcon from "../DeckTile/OpenDeleteIconModal";
import { DeleteDeckConfirmationModal } from "../DeckTile/DeleteDeckConfirmationModal";


import './DeckDetailsPage.css'
import { thunkFetchAllUsers } from "../../../redux/users";
import { thunkFetchAllCards, thunkFetchCardById } from "../../../redux/card";


export function DeckDetailsPage() {
  const {deckId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [statsPage, setStatsPage] = useState('performance');

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
  const userById = useSelector(state => state.users)
  const deckOwner = userById[deck?.userId]

  
  useEffect(() => {
    dispatch(thunkFetchAllMatches())
    dispatch(thunkFetchAllUsers())

    dispatch(thunkFetchDeckById(deckId)).then(returnDeck => {
      returnDeck.cards.forEach(card => dispatch(thunkFetchCardById(card.cardId)))
    })
  }, [deckId, dispatch])

  function handleNavigateUserProfile() {
    navigate(`/users/${deck.userId}`)
  }

  const setStatsPageSelectionClass = (thisStatsPage, baseClassName) => statsPage == thisStatsPage ? `${baseClassName}-selected` : `${baseClassName}`

  
  // if (sessionUser?.id != deck?.userId) return <Navigate to="/" replace={true} />;
  
  let key = 1;
  return (
    <div>
      <p className="deck-details-title"><span className="breadcrumb-link" onClick={() => navigate(`/users/${deckOwner.id}`)}>{deckOwner?.username} / </span><span className="page-title">{deck?.name}</span> Deck Details</p>
      <div className="deck-details-div">
        <div className="deck-details-decklist-sidepanel-div top-level-section">
          <div style={{display:'flex', alignItems:'center', height:'1vh', margin:'1.5vh 0'}}>
            <p className="deck-details-decklist-title">{deck?.name} Decklist</p>
            <div className="deck-tile-update icon">
              <OpenModalUpdateIcon modalComponent={<DeckFormModal deckId={deck?.id} formtype={'update'}/>}/>
            </div>
            <div className="deck-tile-delete icon">
              <OpenModalDeleteIcon modalComponent={<DeleteDeckConfirmationModal deckId={deck?.id}/>}/>
            </div>
          </div>
          <DecklistPanel className="deck-details-decklist-panel" deckId={deck?.id} />
        </div>
        <div className="deck-details-stats-matches-div">
          <div className="deck-details-deck-stats-div top-level-section">
            <div className="deck-details-deck-stats-selection-div">
              <p className={setStatsPageSelectionClass('performance', 'deck-details-deck-stats-page-selector')} onClick={() => setStatsPage('performance')}>Performance</p>
              <p className={setStatsPageSelectionClass('construction', 'deck-details-deck-stats-page-selector')} onClick={() => setStatsPage('construction')}>Construction</p>
              <p onClick={handleNavigateUserProfile}></p>
            </div>
            {statsPage == 'performance' && (deckMatches.length ? <DeckStats /> : <div className="no-data">No Data</div>)}
            {statsPage == 'construction' && <DeckConstruction />}
          </div>
          {deckMatches.length ? <p className="deck-details-deck-matches-title">Matches</p> : undefined}
          <div className="deck-details-deck-matches-div">
            {deckMatches.map(match => {
              return <div className="deck-details-match-tile-div top-level-section" key={key++}>
                <MatchTile className="deck-details-match-tile" match={match} onClick={() => navigate(`/matches/${match.id}`)} matchNum={key}/>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}