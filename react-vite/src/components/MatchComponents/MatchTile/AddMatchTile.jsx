
// import { useSelector } from "react-redux";

import './MatchTile.css'


export function AddMatchTile() {

  // const matchObj = useSelector(state => state.matches[match?.id])
  // console.log('matchObj: ', matchObj)

  return (
    <div className="match-tile-div add">
      <p className="add-match-tile-plus">+</p>
    </div>
  )
}