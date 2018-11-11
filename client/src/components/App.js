import React, { Component } from "react";
import Landing from "./landing/landing";
import Navbar from "./navbar/navbar";
import Drinker from "./drinker/drinker";
import RandomQuery from "./randomquery/randomQuery";
import NotFound from "./notfound/notfound";
import Bar from "./bar/bar";
import Beer from "./beer/beer";
import Brand from "./brand/brand";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";
import "./App.css";

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
              <Route exact path="/randomQuery" component={RandomQuery} />
              <Route exact path="/bars" component={Bar} />
              <Route exact path="/beers" component={Beer} />
              <Route exact path="/brand" component={Brand} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
