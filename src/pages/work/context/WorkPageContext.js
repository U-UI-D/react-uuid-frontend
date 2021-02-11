import React from 'react';

let action = {
  updateName: () => {},
  setIsFollow: () => {}
}

export const WorkPageContext = React.createContext({
  ...action
});
