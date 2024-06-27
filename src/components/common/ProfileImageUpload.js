import React, {useState, useEffect} from 'react';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
export default function UploadImage({onUploadClick, image}) {
  return (
    <View style={imageUploaderStyles.container}>
      {image ? (
        <Image source={{uri: image}} style={{width: 200, height: 200}} />
      ) : (
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/008/957/225/non_2x/female-doctor-avatar-clipart-icon-in-flat-design-vector.jpg',
          }}
          style={{width: 200, height: 200}}
        />
      )}
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={onUploadClick}
          style={imageUploaderStyles.uploadBtn}>
          <Icon name="camera-retro" size={25} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const imageUploaderStyles = StyleSheet.create({
  imageContainer: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});
