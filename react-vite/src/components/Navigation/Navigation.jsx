import { useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.session.user)

  function handleHomeNav(e) {
    e.stopPropagation();
    navigate('/')
  }

  function handleProfileNav(e) {
    e.stopPropagation();
    navigate(`/users/${currentUser.id}`)
  }

  return (
    <div className="nav-bar-div">
      <div className="nav-bar-inner-div">
      <div className="nav-bar-home-profile-div">
        <div className="nav-bar-home-icon-div"  onClick={handleHomeNav}>
          <div className="nav-bar-home-icon">
            <img src="/logo.svg" className="logo"/>
          </div>
        </div>
      </div>

      <div className="nav-bar-profile-section">
        <div className={currentUser ? "nav-bar-profile-div": "hidden"} onClick={handleProfileNav}>
          <div>Profile</div>
        </div>
        <ProfileButton />
      </div>
      </div>
    </div>
  );
}

export default Navigation;
