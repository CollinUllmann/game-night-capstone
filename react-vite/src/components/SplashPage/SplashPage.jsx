
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
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </div>
            <div className='splash-page-signup splash-page-button'>
              <OpenModalButton
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
            <p className="splash-page-deck-builder-description">• Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br></br>• Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br></br>• Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div onClick={currentUser ? handleNavigateToDeckAnalysis : null} className="splash-page-deck-builder splash-page-button">
              {currentUser ? <OpenModalButton buttonText="Build the Perfect Deck" modalComponent={<DeckFormModal />} /> : <OpenModalButton buttonText="Build the Perfect Deck" modalComponent={<LoginFormModal />}/>}
            </div>
          </div>
        </div>
        <div className="splash-page-deck-analysis-content-div">
          <div className="splash-page-deck-analysis-description-button-div">
            <p className="splash-page-deck-analysis-title">After the Game</p>
            <p className="splash-page-deck-analysis-title-2">Personalized Statistics</p>
            <p className="splash-page-deck-analysis-description">• Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br></br>• Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br></br>• Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="splash-page-deck-analysis splash-page-button">
              {currentUser ? <div onClick={handleNavigateToDeckAnalysis}>Crunch the Numbers</div> : <OpenModalButton buttonText="Crunch the Numbers" modalComponent={<LoginFormModal />}
              />}
            </div>
          </div>
          <div className="splash-page-deck-analysis-media" style={{backgroundImage: `url('/splash-page-images/media_2.png')`, backgroundPositionX: '20%', backgroundPositionY: '20%', }} />
          
        </div>
      </div>

    </div>
  )



}