import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import pf from "petfinder-client";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
import { Provider } from "./SearchContext";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

// the context is gonna read from the app state
// and sending that into the portal(the provider)
// and at the end is gonna reading them from the consumer

class App extends React.Component {
  //move the state to App
  constructor(props) {
    super(props);

    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }
  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };
  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value
        // breed: ""
      },
      this.getBreeds
    );
  };
  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
        .list({ animal: this.state.animal })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed
            });
          } else {
            this.setState({
              breeds: []
            });
          }
        })
        .catch(console.error);
    } else {
      this.setState({ breeds: [] });
    }
  }
  // so now anything is inside the Provider
  // i can access this context using the consumer
  // that i exported in SearchContext,
  // anywhere i instanciate the consumer, the "this state"
  // is gonna be available
  // * here is presented only one provider
  // * but you can have multiple contexts,
  // * you can have multiple providers wrapped together
  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
          <Link to="search-params">
            <span aria-label="search" role="img">
              🔍
            </span>
          </Link>
        </header>
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
