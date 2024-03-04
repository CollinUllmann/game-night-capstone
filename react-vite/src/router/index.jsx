import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import { DecksIndex } from '../components/DeckComponents/DecksIndex/DecksIndex';
import { DeckFormPage } from '../components/DeckComponents/DeckFormPage/DeckFormPage';
import { MatchesIndex } from '../components/MatchComponents/MatchesIndex/MatchesIndex';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/decks",
        element: <DecksIndex />,
      },
      {
        path: "/decks/new",
        element: <DeckFormPage formtype="new" />,
      },
      {
        path: "/decks/:deckId/update",
        element: <DeckFormPage formtype="update" />,
      },
      {
        path: "/matches",
        element: <MatchesIndex />,
      }
    ],
  },
]);