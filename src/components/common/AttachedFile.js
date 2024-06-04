import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Platform, PermissionsAndroid, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import RNFS from 'react-native-fs';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');



function AttachedFile({ AttachementFile }) {
  console.log('AttachmentFile', AttachementFile);
 

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download files',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  
  
  
  
  const DownloadFile = async (url, fileName) => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
        return;
      }
    }
  
    const directoryPath = Platform.OS === 'android' ? `${RNFS.ExternalStorageDirectoryPath}/` : RNFS.DocumentDirectoryPath;
    const toFile = `${directoryPath}/${fileName}`;
  
    try {
      const dirExists = await RNFS.exists(directoryPath);
      if (!dirExists) {
        await RNFS.mkdir(directoryPath);
      }
  
      const res = await RNFS.downloadFile({
        fromUrl: url,
        toFile,
      }).promise;
      if (res.statusCode === 200) {
        console.log("Download successful", res);
        Alert.alert('Download Complete', `File downloaded to ${toFile}`);
      } else {
       Alert.alert(`Download failed with status code ${res.statusCode}`);
      }
    } catch (err) {
      console.log("Download failed", err);
      Alert.alert('Download Failed', 'There was an error downloading the file. Please try again.');
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {AttachementFile &&
          AttachementFile.map((x, i) => {
            return (
              <TouchableOpacity onPress={() => DownloadFile(x.url , x.name)} key={i} style={styles.box}>
                <View>
                  <Icon name={x?.filetype?.includes('image') ? "image" : x?.filetype?.includes('pdf') ? "file-pdf" : "file"} size={17} color={'white'} />
                </View>
                <View>
                  <Text numberOfLines={1} ellipsizeMode='middle' style={styles.nametext}>{x.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.15,
    height: width * 0.15,
    backgroundColor: '#116754',
    borderRadius: 10,
    gap: 1,
    margin: 10,
  },
  nametext: {
    color: 'white',
    fontSize: 8,
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 2,
  },
});

export default AttachedFile;
