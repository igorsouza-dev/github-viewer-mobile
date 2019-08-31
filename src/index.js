import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

if (__DEV__) {
  import('./config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

const App = () => {
  return (
    <SafeAreaView>
      <Text>Hello Worldds!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
