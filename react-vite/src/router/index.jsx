import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import { DecksIndex } from '../components/DeckComponents/DecksIndex/DecksIndex';
import { DeckFormPage } from '../components/DeckComponents/DeckFormPage/DeckFormPage';
import { MatchesIndex } from '../components/MatchComponents/MatchesIndex/MatchesIndex';
import { MatchFormPage } from '../components/MatchComponents/MatchFormPage/MatchFormPage';
import { EventFormPage } from '../components/EventComponents/EventFormPage/EventFormPage';
import { EventsIndex } from '../components/EventComponents/EventsIndex/EventsIndex';
import { SplashPage } from '../components/SplashPage/SplashPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
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
      },
      {
        path: "/matches/new",
        element: <MatchFormPage formtype="new" />,
      },
      {
        path: "/matches/:matchId/update",
        element: <MatchFormPage formtype="update" />,
      },
      {
        path: "/events/new",
        element: <EventFormPage formtype="new" />,
      },
      {
        path: "/events",
        element: <EventsIndex />,
      }
    ],
  },
]);