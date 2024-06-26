import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DecklistPanel } from "../DecklistPanel/DecklistPanel";
import { MatchTile } from "../../MatchComponents/MatchTile/MatchTile";
import { DeckStats } from "./DeckStats/DeckStats";
import { DeckConstruction } from "./DeckStats/DeckConstruction/DeckConstruction";
import OpenModalUpdateIcon from "../DeckTile/OpenUpdateIconModal";
import { DeckFormModal } from "../DeckFormModal/DeckFormModal";
import OpenModalDeleteIcon from "../DeckTile/OpenDeleteIconModal";
import { DeleteDeckConfirmationModal } from "../DeckTile/DeleteDeckConfirmationModal";

import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TbCardsFilled } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";




import './DeckDetailsPage.css'
import { thunkFetchAllUsers } from "../../../redux/users";
import { thunkFetchAllEvents } from "../../../redux/event";
import { thunkFetchDeckById } from "../../../redux/deck";


export function DeckDetailsPage() {
  const {deckId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [statsPage, setStatsPage] = useState('performance');

  const [matchPageNum, setMatchPageNum] = useState(1);

  // const sessionUser = useSelector((state) => state.session.user);
  const deckById = useSelector(state => state.decks)
  const matchesById = useSelector(state => state.matches)
  const currentUser = useSelector(state => state.session.user)
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
    dispatch(thunkFetchAllEvents())
    dispatch(thunkFetchAllUsers())
    dispatch(thunkFetchDeckById(deckId))

    // dispatch(thunkFetchDeckById(deckId)).then(returnDeck => {
    //   returnDeck.cards.forEach(card => dispatch(thunkFetchCardById(card.cardId)))
    // })
  }, [ dispatch])

  function handleNavigateUserProfile() {
    navigate(`/users/${deck.userId}`)
  }

  const setStatsPageSelectionClass = (thisStatsPage, baseClassName) => statsPage == thisStatsPage ? `${baseClassName}-selected` : `${baseClassName}`

  
  // if (sessionUser?.id != deck?.userId) return <Navigate to="/" replace={true} />;
  
  //pagination
  // const deckMatchesTimeOrder = deckMatches.reverse()
  // function getMatchesSlice(pageNum) {
  //   if (pageNum == 1) return deckMatchesTimeOrder.slice(0, 9)
  //   return deckMatchesTimeOrder.slice(((((pageNum - 1) * 10) - 1), (pageNum * 10) - 2))
  // }

  function getMatchesSlice(pageNum) {
    return deckMatches.reverse().slice(((pageNum - 1) * 10), (pageNum * 10))
  }

  const matchList = getMatchesSlice(matchPageNum)

  const matchPageNumMax = deckMatches.length % 10 == 0 ? (deckMatches.length / 10) + 1 : Math.ceil(deckMatches.length / 10)


  let key = deckMatches.length - ((matchPageNum - 1) * 10);
  return (
    <div>
      <p className="deck-details-title"><FaUser style={{height: '15px'}}/><span className="breadcrumb-link" onClick={() => navigate(`/users/${deckOwner.id}`)}>{deckOwner?.username}  </span><IoIosArrowForward /><TbCardsFilled style={{height: '20px'}}/><span className="page-title">{deck?.name}</span> Deck Details</p>
      <div className="deck-details-div">
        <div className="deck-details-decklist-sidepanel-div top-level-section">
          <div style={{display:'flex', alignItems:'center'}}>
            <p className="deck-details-decklist-title">{deck?.name} Decklist</p>
            <div style={{display: currentUser.id == deck?.userId ? 'flex' : 'none'}} className="deck-tile-update icon">
              <OpenModalUpdateIcon modalComponent={<DeckFormModal deckId={deck?.id} formtype={'update'}/>}/>
            </div>
            <div style={{display: currentUser.id == deck?.userId ? 'flex' : 'none'}} className="deck-tile-delete icon">
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
          {deckMatches.length ? <p className="deck-details-deck-matches-title"> <MdNavigateBefore onClick={() => matchPageNum == 1 ? null : setMatchPageNum(matchPageNum - 1)} style={{cursor:'pointer'}} /> Matches <MdNavigateNext onClick={() => matchPageNum < matchPageNumMax ? setMatchPageNum(matchPageNum + 1) : null} style={{cursor:'pointer'}}/></p> : undefined}
          <div className="deck-details-deck-matches-div">
            {matchList.map(match => {
              return <div className="deck-details-match-tile-div top-level-section" key={key--}>
                <MatchTile className="deck-details-match-tile" match={match} onClick={() => navigate(`/matches/${match.id}`)} matchNum={key}/>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}