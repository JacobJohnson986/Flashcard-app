import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom"
import Home from "./Home";
import CreateDeck from "./Decks/CreateDeck";
import ViewDeck from "./Decks/ViewDeck";
import EditCard from "./Cards/EditCard";
import EditDeck from "./Decks/EditDeck";
import StudyDeck from "./Decks/StudyDeck";
import AddCards from "./Cards/AddCard";


function Layout() {

  return (
    <div>
      <Header />
      <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/decks/:deckId/study">
          <StudyDeck /> 
        </Route>
        <Route path="/decks/new">
          <CreateDeck /> 
        </Route>
        <Route exact path="/decks/:deckId">
          <ViewDeck />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route exact path="/decks/:deckId/cards/new">
          <AddCards />
        </Route>
        <Route >
          <NotFound />
        </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;