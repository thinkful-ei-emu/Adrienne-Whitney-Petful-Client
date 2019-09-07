import React from 'react';

const AppContext = React.createContext({
  adoptedPets: [],
  dog: [],
  cat: [],
  handleAdopt: () => {}
});

export default AppContext;