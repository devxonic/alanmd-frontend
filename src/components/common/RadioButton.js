import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const RadioButton = ({selected, onPress, label}) => (
  <TouchableOpacity onPress={onPress} style={styles.radioContainer}>
    <View style={styles.radioCircle}>
      {selected && <View style={styles.selectedRb} />}
    </View>
    <Text style={styles.radioText}>{label}</Text>
  </TouchableOpacity>
);

export default RadioButton;

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  radioCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2b7a78',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2b7a78',
  },
  radioText: {
    marginLeft: 10,
    fontSize: 10,
    color: '#2b7a78',
  },
});
