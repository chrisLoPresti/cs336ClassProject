import React, { Component } from "react";
import Navbar from "./navbar/navbar";
import Landing from "./landing/landing";
import Bar from "./bar/bar";
import Bartender from "./bartender/bartender";
import Brand from "./brand/brand";
import Beer from "./beer/beer";
import Drinker from "./drinker/drinker";
import RandomQuery from "./randomquery/randomQuery";
import Modification from "./modification/modification";
import NotFound from "./notfound/notfound";
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
              <Route exact path="/bars" component={Bar} />
              <Route exact path="/bartenders" component={Bartender} />
              <Route exact path="/brands" component={Brand} />
              <Route exact path="/beers" component={Beer} />
              <Route exact path="/drinkers" component={Drinker} />
              <Route exact path="/randomQuerys" component={RandomQuery} />
              <Route exact path="/modifications" component={Modification} />
              <Route path="*" component={NotFound} />
            </Switch>
            <div
              style={{
                height: "50px",
                width: "100%",
                backgroundColor: "#303030"
              }}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
