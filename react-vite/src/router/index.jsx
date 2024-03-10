import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { SplashPage } from '../components/SplashPage/SplashPage';
import { PlayerProfilePage } from '../components/PlayerProfilePage/PlayerProfilePage';
import { DeckDetailsPage } from '../components/DeckComponents/DeckDetailsPage/DeckDetailsPage';
import { MatchDetailsPage } from '../components/MatchComponents/MatchDetailsPage/MatchDetailsPage';
import { EventDetailsPage } from '../components/EventComponents/EventDetailsPage/EventDetailsPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "/users/:userId",
        element: <PlayerProfilePage />,
      },
      {
        path: "/decks/:deckId",
        element: <DeckDetailsPage />,
      },
      {
        path: "/matches/:matchId",
        element: <MatchDetailsPage />,
      },
      {
        path: "/events/:eventId",
        element: <EventDetailsPage />,
      }
    ],
  },
]);