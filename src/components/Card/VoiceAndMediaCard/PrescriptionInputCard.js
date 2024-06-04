import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Voice from '@react-native-voice/voice';

import { Fonts } from '../../style';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Platform } from 'react-native';
import { useSelector } from "react-redux";


const PrescriptionInputCard = ({
  heading,
  prescriptionText,
  type,
  handleDocumentPicker,
  setComponentText,
}) => {
  const [isListiner, setIsListiner] = useState(false);
  const onChange = (text) => {
    setComponentText(text);
  };

  let data = useSelector(state => state.user.Role);

  useEffect(() => {
    Voice.onSpeechResults = e => {
      console.log('Voice Results', e);
      setComponentText(prev => prev + " " + e.value[0]);
    };
    // Voice.onSpeechPartialResults = e => { };

    Voice.onSpeechRecognized = e => {
      console.log('Voice Recognized', e);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      setIsListiner(false);
      // setComponentText('')
    };
  }, []);

  const startListening = async () => {
    setIsListiner(true);
    try {
      await Voice.start('en-US');
      console.log('Voice Listening');
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      console.log('Voice Stop');
      await Voice.stop();
      Voice.removeAllListeners();
      setIsListiner(false);
      // setComponentText('')
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            fontFamily: Fonts.REGULAR,
            fontSize: 16,
            color: 'black',
            paddingLeft: 10,
            flex: 1,
          }}>
          {heading || ''}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          {data != "nurse" ? <><TouchableOpacity
            onPress={() => {
              isListiner ? stopListening() : startListening();
            }}>
            <View
              style={{
                ...styles.light,
                backgroundColor: isListiner ? '#C54B4B' : '#E7F0EE',
                borderColor: isListiner ? '#C54B4B' : '#116754',
              }}>
              <Icon
                name="microphone"
                size={13}
                color={isListiner ? 'white' : 'black'}
              />
            </View>
          </TouchableOpacity>
            <TouchableOpacity
              style={styles.childThreeThree}
              onPress={() => handleDocumentPicker(type)}>
              <View style={styles.childThreeThreeText}>
                <Icon
                  name="paperclip"
                  size={15}
                  color={isListiner ? 'white' : 'black'}
                /></View>
            </TouchableOpacity></> : null}
        </View>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <TextInput
          multiline={true}
          placeholder="Type Something"
          textAlignVertical="top"
          value={prescriptionText}
          editable={data == "nurse" ? false : true}
          onChangeText={onChange}
          numberOfLines={Platform.OS === 'ios' ? null : 5}
          minHeight={Platform.OS === 'ios' && 5 ? 20 * 5 : null}
          style={{ backgroundColor: '#E7F0EE', borderRadius: 5 }}
        />
      </View>
    </View>
  );
};

export default PrescriptionInputCard;



const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  scroll: {
    height: '90%',
  },
  headingText: {
    fontSize: 16,
    color: '#116754',
    fontFamily: Fonts.MEDIUM,
    // paddingLeft:13
  },
  main: {
    backgroundColor: '#E5EEEC',
    height: '100%',
  },
  childOne: {
    width: '25%',
    backgroundColor: '#e3eeeb',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#116754',
  },
  childTwo: {
    width: '75%',
    paddingLeft: 10,
  },
  childTwoOne: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  badge: {
    borderRadius: 50,
    padding: 3,
    color: 'white',
    fontSize: 10,
    backgroundColor: '#116754',
    fontFamily: Fonts.REGULAR,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  light: {
    backgroundColor: '#E7F0EE',
    color: '#116754',
    padding: 8,
    borderRadius: 2,
    margin: 8,
    fontSize: 10,
    fontFamily: Fonts.MEDIUM,
    borderWidth: 1,
    borderColor: '#116754',
  },
  childTwoTwo: {
    display: 'flex',
    flexDirection: 'row',
    // paddingLeft:9
  },
  childThree: {
    display: 'flex',
    overflow: 'hidden',
  },
  childThreeThree: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#116754',
    margin: 12,
    marginBottom : 8,
    marginLeft :8 
  },
  childThreeThreeText: {
    color: 'white',
    fontSize: 11,
    // marginLeft: 3,
    fontFamily: Fonts.REGULAR,
    paddingLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 20,
  },
});
