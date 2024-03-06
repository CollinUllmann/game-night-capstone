
import { useNavigate } from 'react-router-dom'
import './SplashPage.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAuthenticate } from '../../redux/session';

export function SplashPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(thunkAuthenticate())
  }, [dispatch])

  function handleNavigateToDeckBuild() {
    if (currentUser) {
      navigate('/decks/new')
    } else {
      navigate('/login')
    }
  }

  function handleNavigateToDeckAnalysis() {
    if (currentUser) {
      navigate(`/users/${currentUser.id}`)
    } else {
      navigate('/login')
    }
  }


  return (
    <div className="splash-page-root-div">
      <div className="splash-page-div">
        <div className="splash-page-title-signup-login-div">
          <p className="splash-page-title">Knowledge is Power</p>
          <p className="splash-page-title-blurb">Know more, win more. Powered by data, not opinions.</p>
          <div className="splash-page-signup-login-div">
            <div className="splash-page-signup splash-page-button" onClick={() => navigate('/signup')}>Sign Up</div>
            <div className="splash-page-login splash-page-button" onClick={() => navigate('/login')}>Login</div>
          </div>
        </div>
        <div className="splash-page-deck-builder-content-div">
          <div className="splash-page-deck-builder-media"></div>
          <div className="splash-page-deck-builder-description-button-div">
            <p className="splash-page-deck-builder-title">Before the Game</p>
            <p className="splash-page-deck-builder-title-2">MTG&apos;s Massive Catalogue</p>
            <p className="splash-page-deck-builder-description">• Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br></br>• Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br></br>• Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="splash-page-deck-builder splash-page-button" onClick={handleNavigateToDeckBuild}>Build the Perfect Deck</div>
          </div>
        </div>
        <div className="splash-page-deck-analysis-content-div">
          <div className="splash-page-deck-analysis-description-button-div">
            <p className="splash-page-deck-analysis-title">After the Game</p>
            <p className="splash-page-deck-analysis-title-2">Personalized Statistics</p>
            <p className="splash-page-deck-analysis-description">• Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br></br>• Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br></br>• Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="splash-page-deck-analysis splash-page-button" onClick={handleNavigateToDeckAnalysis}>Crunch the Numbers</div>
          </div>
          <div className="splash-page-deck-analysis-media"></div>
        </div>
      </div>

    </div>
  )



}