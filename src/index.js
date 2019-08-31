import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes';

if (__DEV__) {
  import('./config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#715c91" />
      <Routes />
    </>
  );
};

export default App;
