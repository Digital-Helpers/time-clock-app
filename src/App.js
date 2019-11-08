// src/App.js

import React from "react";
import NavBar from "./components/NavBar";

// New - import the React Router components, and the Profile page component
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import OnboardUser from "./components/OnboardUser"

function App(props) {
  return (
    <div className="App">
      {/* New - use BrowserRouter to provide access to /profile */}
      <BrowserRouter>
        <header>
         <Route path="/" component={NavBar} />
        </header>
        <Switch>
          <Route path="/" exact />
          <Route path="/profile" component={Profile} />
          <Route path="/onboarduser" component={OnboardUser} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;