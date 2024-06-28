import React from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './navigation/appNavigation';
import { store } from './redux/store';

function App() {
  
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;
