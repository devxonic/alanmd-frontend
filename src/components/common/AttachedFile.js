import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const {width} = Dimensions.get('window');

function AttachedFile({ AttachementFile}) {
  console.log('AttachmentFile', AttachementFile);
  return (
    <View style={styles.container}>
      {AttachementFile &&
        AttachementFile.map((x, i) => 
          {return(
          <View key={i} style={styles.box}>
            <View>
              <Icon name={x?.filetype?.includes('image') ? "image" : x?.filetype?.includes('pdf') ? "file-pdf" : "file"} size={17} color={'white'} />
            </View>
            <View>
              <Text numberOfLines={1} ellipsizeMode='middle' style={styles.nametext}>{x.name}</Text>
            </View>
          </View>
        )})}
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
    width: width * 0.15, // 30% of the screen width
    height: width * 0.15, // make it square
    backgroundColor: '#116754',
    borderRadius: 10,
    gap : 1,
    margin: 10, // Add margin for spacing between boxes
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
