import React from 'react';

let action = {
  updateName: () => {},
  setIsFollow: () => {}
}

export const WorkDetailContext = React.createContext({
  ...action
});
