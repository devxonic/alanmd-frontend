import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const ButtonDisabled = ({props, text}) => {
  return (
    <TouchableOpacity {...props}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonDisabled;
