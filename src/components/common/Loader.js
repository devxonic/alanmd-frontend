import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
function Loader() {
  return (
    <>
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#116754" />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  
});

export default Loader;
