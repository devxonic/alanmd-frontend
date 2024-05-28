import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const { width } = Dimensions.get('window');

function AttachedFile({ AttachmentFile }) {
    console.log("AttachmentFile" , AttachmentFile)
    return (
        <View style={styles.container}>
            {AttachmentFile && AttachmentFile.map((x, i) => (
                <View key={i} style={styles.box}>
                    <Icon
                        name="file"
                        size={40}
                        color={'white'}
                    />
                </View>
            ))}
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
        width: width * 0.2, // 30% of the screen width
        height: width * 0.2, // make it square
        backgroundColor: '#116754',
        borderRadius: 10,
        margin: 10, // Add margin for spacing between boxes
    },
});

export default AttachedFile;
