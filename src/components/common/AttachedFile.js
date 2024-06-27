import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import RNFetchBlob from 'rn-fetch-blob';

const {width} = Dimensions.get('window');

function AttachedFile({AttachementFile}) {
  console.log('AttachmentFile', AttachementFile);

  const getStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'This app needs access to your storage to download and save files',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Storage permission is required to save files',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadFile = async (url, fileName) => {
    await getStoragePermission();
    if (!url || !fileName) return Alert.alert('Make sure did you pass a URL');
    const DesPath =
      Platform.OS === 'ios'
        ? RNFetchBlob.fs.dirs.DocumentDir + '/' + fileName
        : RNFetchBlob.fs.dirs.DownloadDir + '/medicalApp/download/' + fileName;
    try {
      RNFetchBlob.config({
        addAndroidDownloads: {
          notification: true,
          title: fileName,
          useDownloadManager: true,
          path: DesPath,
          fileCache: true,
          description: 'Downloading file...',
        },
        notification: true,
        title: fileName,
        useDownloadManager: true,
        path: DesPath,
        fileCache: true,
        description: 'Downloading file...',
      })
        .fetch('GET', url, {})
        .then(res => {
          console.log('The file saved to ', res.path());
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      Alert.alert('Download Error', `Error downloading file: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      {AttachementFile &&
        AttachementFile.map((x, i) => {
          return (
            <TouchableOpacity
              onPress={() => downloadFile(x.url, x.name)}
              key={i}
              style={styles.box}>
              <View>
                <Icon
                  name={
                    x?.filetype?.includes('image')
                      ? 'image'
                      : x?.filetype?.includes('pdf')
                      ? 'file-pdf'
                      : 'file'
                  }
                  size={17}
                  color={'white'}
                />
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.nametext}>
                  {x.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
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
