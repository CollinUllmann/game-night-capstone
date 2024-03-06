import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkFetchAllUsers } from "../../redux/users";
import { thunkFetchAllDecks } from "../../redux/deck";




export function PlayerProfilePage() {
  const {userId} = useParams();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const userById = useSelector(state => state.users)
  const deckById = useSelector(state => state.decks)
  const user = userById[userId]
  const userDecks = Object.values(deckById).filter(deck => deck.userId == userId)
  
  useEffect(() => {
    dispatch(thunkFetchAllUsers())
    dispatch(thunkFetchAllDecks())
  }, [dispatch])
  
  if (sessionUser.id != userId) return <Navigate to="/" replace={true} />;
  
  console.log('userDecks: ', userDecks)
  console.log(user)
  if (!user) return


  return (
    <div>

    </div>
  )
}