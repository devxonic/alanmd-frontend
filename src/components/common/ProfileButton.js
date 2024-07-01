import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {Fonts} from '../style';

const ProfileButton = ({title, onPress, background, text}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, background]}>
        <Text style={[styles.buttonText, text]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ProfileButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: Dimensions.get('window').width / 2 - 20,
    borderRadius: 5,
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontFamily: Fonts.REGULAR,
    fontSize: 14,
  },
});
