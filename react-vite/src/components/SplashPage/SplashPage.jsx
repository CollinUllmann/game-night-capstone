
import { useNavigate } from 'react-router-dom'
import './SplashPage.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAuthenticate } from '../../redux/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import { DeckFormModal } from '../DeckComponents/DeckFormModal/DeckFormModal';

export function SplashPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(thunkAuthenticate())
  }, [dispatch])

  function handleNavigateToDeckAnalysis() {
    if (currentUser) {
      navigate(`/users/${currentUser.id}`)
    }
  }

  return (
    <div className="splash-page-root-div">
      <div className="splash-page-div">
        <div className={currentUser ? "hidden" : "splash-page-title-signup-login-div"}>
          <p className="splash-page-title">Knowledge is Power</p>
          <p className="splash-page-title-blurb">Know more, win more. Powered by data, not opinions.</p>
          <div className="splash-page-signup-login-div">
            <div className='splash-page-signup splash-page-button'>
              <OpenModalButton
                classNameButton="block"
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </div>
            <div className='splash-page-signup splash-page-button'>
              <OpenModalButton
                classNameButton="block"
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </div>
          </div>
        </div>
        <div className="splash-page-deck-builder-content-div">
          <div className="splash-page-deck-builder-media" style={{backgroundImage: `url('/splash-page-images/media_1.png')`, backgroundPositionX: '38%', backgroundPositionY: '25%', }} />
          <div className="splash-page-deck-builder-description-button-div">
            <p className="splash-page-deck-builder-title">Before the Game</p>
            <p className="splash-page-deck-builder-title-2">MTG&apos;s Massive Catalogue</p>
            <p className="splash-page-deck-builder-description">• View detailed statistics on the composition of your decks. <br></br>• Identify weaknesses in your deck construction to optimize card selection.<br></br>• Experiment with different card combinations to improve performance.</p>
            <div onClick={currentUser ? handleNavigateToDeckAnalysis : null} className="splash-page-deck-builder splash-page-button">
              <OpenModalButton classNameButton="block" buttonText="Build the Perfect Deck" modalComponent={currentUser ? <DeckFormModal /> : <LoginFormModal />} />
            </div>
          </div>
        </div>
        <div className="splash-page-deck-analysis-content-div">
          <div className="splash-page-deck-analysis-description-button-div">
            <p className="splash-page-deck-analysis-title">After the Game</p>
            <p className="splash-page-deck-analysis-title-2">Personalized Statistics</p>
            <p className="splash-page-deck-analysis-description">• Track win rates and performance metrics for each of your decks. <br></br>• Identify trends and patterns in your gameplay to improve your strategy.<br></br>• Analyze specific matchups to prepare for future matches.</p>
            <div className="splash-page-deck-analysis splash-page-button">
              {currentUser ? <button className='block' onClick={handleNavigateToDeckAnalysis}>Crunch the Numbers</button> : <OpenModalButton classNameButton="block" buttonText="Crunch the Numbers" modalComponent={<LoginFormModal />}
              />}
            </div>
          </div>
          <div className="splash-page-deck-analysis-media" style={{backgroundImage: `url('/splash-page-images/media_2.png')`, backgroundPositionX: '20%', backgroundPositionY: '20%', }} />
          
        </div>
      </div>

    </div>
  )



}