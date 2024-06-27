import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import DocumentPicker from 'react-native-document-picker';

const UploadImage = () => {
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
      }
    }
  };
  return (
    <TouchableOpacity style={styles.button} onPress={selectDoc}>
      <Image source={require('../../images/plus.png')} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default UploadImage;
const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DBDBDB',
    borderRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#AAAAAA',
  },
});
