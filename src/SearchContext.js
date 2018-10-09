import React from "react";

// create 2 components:
// a provider component (make available everything underneath it)
// and a consumer component, is going to read from the provider.
// is like running data prom a portal, entrance is provider
// and exit is consumer
const SearchContext = React.createContext({
  // methods use for testing purposes
  // not the real implementation of this methods
  // just decribing to react what they look like
  location: "Seattle, WA",
  animal: "",
  breed: "",
  breeds: [],
  // methods for the consumers components to modify the data
  handleAnimalChange() {},
  handleBreedChange() {},
  handleLocationChange() {},
  getBreeds() {}
});

// named exports
export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
