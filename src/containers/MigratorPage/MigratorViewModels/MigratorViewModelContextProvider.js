import React from 'react';

const MigratorViewModelContext = React.createContext();

export const MigratorViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <MigratorViewModelContext.Provider value={viewModel}>
      {children}
    </MigratorViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useMigratorViewModel = () => React.useContext(MigratorViewModelContext);

/* HOC to inject store to any functional or class component */
export const withMigratorViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useMigratorViewModel()} />;
};
