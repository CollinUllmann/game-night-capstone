import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import deckReducer from "./deck";
import cardReducer from "./card";
import matchReducer from "./match"
import userReducer from "./users";
import eventReducer from "./event";

const rootReducer = combineReducers({
  session: sessionReducer,
  cards: cardReducer,
  decks: deckReducer,
  matches: matchReducer,
  users: userReducer,
  events: eventReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
