import React from 'react';

const AppContext = React.createContext({
  adoptedPets: [],
  // dog: [],
  // cat: [],
  handleAdoptCat: () => {},
  handleAdoptDog: () => {}
});

export default AppContext;