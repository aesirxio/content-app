import React from 'react';

const ProfileViewModelContext = React.createContext();

export const ProfileViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <ProfileViewModelContext.Provider value={viewModel}>
      {children}
    </ProfileViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useProfileViewModel = () => React.useContext(ProfileViewModelContext);

/* HOC to inject store to any functional or class component */
export const witheProfileViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useProfileViewModel()} />;
};
