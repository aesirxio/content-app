import React from 'react';
const SettingViewModelContext = React.createContext();

export const SettingViewModelContextProvider = ({ children, viewModel }) => {
  return (
    <SettingViewModelContext.Provider value={viewModel}>
      {children}
    </SettingViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useSettingViewModel = () => React.useContext(SettingViewModelContext);

/* HOC to inject store to any functional or class component */
export const withSettingViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useSettingViewModel()} />;
};
