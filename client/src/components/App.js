import React, { Component } from "react";
import Landing from "./landing/landing";
import Navbar from "./navbar/navbar";
import Drinker from "./drinker/drinker";
import NotFound from "./notfound/notfound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/drinker" component={Drinker} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
