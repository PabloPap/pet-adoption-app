import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

// make data from App available through Consumer.
// use the 'function as child' pattern and
// create a function inside consumer that returns markup
// but with context for its scope
//* take advantage the fact that any function that
//* returns markup is a component
class SearchBox extends React.Component {
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };
  render() {
    return (
      <Consumer>
        {context => (
          <div className="search-params">
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="location">
                Location
                <input
                  id="location"
                  onChange={context.handleLocationChange}
                  value={context.location}
                  placeholder="Location"
                />
              </label>
              <label htmlFor="animal">
                Animal
                <select
                  id="animal"
                  value={context.animal}
                  onChange={context.handleAnimalChange}
                  onBlur={context.handleAnimalChange}
                >
                  <option />
                  {ANIMALS.map(animal => (
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="breed">
                Breed
                <select
                  disabled={!context.breeds.length}
                  id="breed"
                  value={context.breed}
                  onChange={context.handleBreedChange}
                  onBlur={context.handleBreedChange}
                >
                  <option />
                  {context.breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
              <button>Submit</button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;

// if you only have to reference context inside of the render
// you can do it like here, but if you want to do it inside lifecycle methods
// like you have to do it like in Results.js ( we need it on props so that we
// can reference it inside of search and componentdidmount)
