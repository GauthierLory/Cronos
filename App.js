import React from 'react';
import { StyleSheet, View } from 'react-native';
import Cronos from './components/Cronos.tsx';

const App = () => {

  return (
    <View style={styles.container}>
      <Cronos />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default App;
