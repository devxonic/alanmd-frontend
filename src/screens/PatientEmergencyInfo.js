import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fonts} from '../components/style';
import Input from '../components/common/Input';
import DropDown2 from '../components/common/Dropdown';

const PatientEmergencyInfo = ({route, navigation}) => {
  const [formData, setFormData] = useState({
    contactName: '',
    relationship: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    primaryInsuredName: '',
    relationshipToPatient: '',
  });
  const routeData = route.params.routeData;
  const insuranceInfo = route.params.insuranceInformation;
  const FetchedData = route.params.FetchedData;
  let Relationship = [
    {name: 'Brother', value: 'brother', id: 1},
    {name: 'Sister', value: 'sister', id: 2},
    {name: 'Mother', value: 'mother', id: 3},
    {name: 'Father', value: 'father', id: 4},
    {name: 'Wife', value: 'wife', id: 5},
    {name: 'Husband', value: 'husband', id: 6},
  ];
  handleNext = () => {
    navigation.navigate('PatientMedicalHistory', {
      routeData: routeData,
      insuranceInformation: insuranceInfo,
      FetchedData: FetchedData,
      emergencyContact: formData,
    });
  };

  useEffect(() => {
    if (FetchedData) setFormData({ ...FetchedData.emergencyContact })
  }, [])
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={{width: '100%'}}>
            <View>
              <Text style={styles.InputHeading}>Contact Name</Text>
              <Input
                placeholder="Type Something Here..."
                value={formData.contactName}
                onChangeText={text =>
                  setFormData({...formData, contactName: text})
                }
              />
            </View>
            <View style={(styles.Dflex, {flexDirection: 'column'})}>
              <View>
                <Text style={styles.InputHeading}>Relationship</Text>
              </View>
              <View style={{height: 60}}>
                <DropDown2
                  value={Relationship}
                  data={Relationship}
                  formData={formData}
                  setFormData={setFormData}
                  Objkey={'relationship'}
                  prefix={'Choose Your Relationship'}
                />
              </View>
            </View>
            <View>
              <Text style={styles.InputHeading}>Phone Number</Text>
              <Input
                placeholder="Type Something Here..."
                value={formData.phoneNumber}
                onChangeText={text =>
                  setFormData({...formData, phoneNumber: text})
                }
              />
            </View>
            <View>
              <Text style={styles.InputHeading}>Alternate Phone Number</Text>
              <Input
                placeholder="Type Something Here..."
                value={formData.alternatePhoneNumber}
                onChangeText={text =>
                  setFormData({...formData, alternatePhoneNumber: text})
                }
              />
            </View>
            <View>
              <Text style={styles.InputHeading}>Primary Insured Name</Text>
              <Input
                placeholder="Type Something Here..."
                value={formData.primaryInsuredName}
                onChangeText={text =>
                  setFormData({...formData, primaryInsuredName: text})
                }
              />
            </View>
            <View>
              <Text style={styles.InputHeading}>Relationship to Patient</Text>
              <Input
                placeholder="Type Something Here..."
                value={formData.relationshipToPatient}
                onChangeText={text =>
                  setFormData({...formData, relationshipToPatient: text})
                }
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button, {borderColor: '#5B8F6B', borderWidth: 1}]}
            accessibilityLabel="Previous">
            <Text style={[styles.buttonText, {color: '#5B8F6B'}]}>
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNext()}
            style={[styles.button, {backgroundColor: '#5B8F6B'}]}
            accessibilityLabel="Next">
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3eeeb',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    height: Dimensions.get('window').height,
  },
  profileContainer: {
    flex: 6,
    marginTop: 20,
    marginBottom: 20,
    width: '100%', // Adjusted to take full width
    maxWidth: 400, // Added maxWidth to limit width on larger screens
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%', // Adjusted to take full width
    justifyContent: 'center', // Center buttons horizontally
  },
  button: {
    height: 50,
    width: Dimensions.get('window').width / 2 - 20,
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

export default PatientEmergencyInfo;
