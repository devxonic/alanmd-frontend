import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fonts} from '../components/style';
import Input from '../components/common/Input';

import Dropdown from '../components/common/Dropdown';

const DoctorInsuranceInformationEdit = ({route, navigation}) => {
  const [formData, setFormData] = useState({name: '', image: '', location: ''});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={{width: '100%'}}>
          <View>
            <Text style={styles.InputHeading}>Insurance Provider</Text>
            <Input placeholder="Type Something Here..." />
          </View>
          <View>
            <Text style={styles.InputHeading}>Policy Number</Text>
            <Input placeholder="Type Something Here..." />
          </View>
          <View>
            <Text style={styles.InputHeading}>Group Number</Text>
            <Input placeholder="Type Something Here..." />
          </View>
          <View>
            <Text style={styles.InputHeading}>Zip Code</Text>
            <Input placeholder="Type Something Here..." />
          </View>
          <View>
            <Text style={styles.InputHeading}>Primary Insured Name</Text>
            <Input placeholder="Type Something Here..." />
          </View>
          <View>
            <Text style={styles.InputHeading}>Relationship to Patient</Text>
            <Input placeholder="Type Something Here..." />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, {borderColor: '#5B8F6B', borderWidth: 1}]}
          accessibilityLabel="Previous">
          <Text style={[styles.buttonText, {color: '#5B8F6B'}]}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DoctorEmergencyInformationEdit')}
          style={[styles.button, {backgroundColor: '#5B8F6B'}]}
          accessibilityLabel="Logout Button">
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3eeeb',
    // alignItems: '',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  profileContainer: {
    flex: 11,
    marginTop: 20,
    marginBottom: 20,
    width: '100%', // Adjusted to take full width
    maxWidth: 400, // Added maxWidth to limit width on larger screens
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 30,
    width: '100%', // Adjusted to take full width
    justifyContent: 'center', // Center buttons horizontally
  },
  button: {
    height: 50,
    width: 180,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    height: 45,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontFamily: Fonts.REGULAR,
    fontSize: 14,
  },
  Input: {
    width: '200%',
    height: 100,
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  InputHeading: {
    color: '#116754',
    fontWeight: '800',
  },
  InputParagraph: {
    color: '#116754',
    fontSize: 10,
  },
  RadioButton: {
    width: 13,
    borderRadius: 10,
    borderColor: '#116754',
    borderWidth: 1,
  },
  Dflex: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 3,
  },
});

export default DoctorInsuranceInformationEdit;
