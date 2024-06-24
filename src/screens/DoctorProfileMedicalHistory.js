import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fonts} from '../components/style';
import Input from '../components/common/Input';

import DropDown2 from '../components/common/DropDown2';
import {useSelector} from 'react-redux';

const DoctorMedicalHistoryEdit = ({route, navigation}) => {
  const [formData, setFormData] = useState({
    primaryCarePhysician: '',
    currentMedications: '',
    allergies: '',
    previousSurgeries: '',
    familyMedicalHistory: '',
    relationshipToPatient: '',
  });
  const role = useSelector(state => state?.user?.Role);
  console.log('FORM DATA', formData, '\n ROLE', role);
  useEffect(() => {
    setFormData({...route.params});
    console.log('Edit Profile', route.params);
    return () => {
      setFormData({});
    };
  }, []);
  let currentMedications = [
    {name: '00000000021', value: '00000000021', id: 1},
    {name: '00000000022', value: '00000000022', id: 2},
  ];
  let allergies = [
    {name: 'Something', value: 'something', id: 1},
    {name: 'Something else', value: 'something else', id: 2},
  ];
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={{width: '100%'}}>
            <View>
              <Text style={styles.InputHeading}>Primary Care Physician</Text>
              <Input
                placeholder="Type Something Here..."
                value={formData.primaryCarePhysician}
                onChangeText={text =>
                  setFormData({...formData, primaryCarePhysician: text})
                }
              />
            </View>
            <View style={(styles.Dflex, {flexDirection: 'column'})}>
              <View>
                <Text style={styles.InputHeading}>Current Mediciations</Text>
              </View>
              <View style={{height: 60}}>
                <DropDown2
                  value={currentMedications}
                  data={currentMedications}
                  formData={formData}
                  setFormData={setFormData}
                  Objkey={'Current Mediciations'}
                  prefix={'Choose Your Current Mediciations'}
                />
              </View>
            </View>
            <View style={(styles.Dflex, {flexDirection: 'column'})}>
              <View>
                <Text style={styles.InputHeading}>Allergies</Text>
              </View>
              <View style={{height: 60}}>
                <DropDown2
                  value={allergies}
                  data={allergies}
                  formData={formData}
                  setFormData={setFormData}
                  Objkey={'Allergies'}
                  prefix={'Choose Your Allergies'}
                />
              </View>
            </View>
            <View>
              <Text style={styles.InputHeading}>Previous Sergeries</Text>
              <Input
                placeholder="Type Something Here..."
                value={formData.previousSurgeries}
                onChangeText={text =>
                  setFormData({...formData, previousSurgeries: text})
                }
              />
            </View>
            <View>
              <Text style={styles.InputHeading}>Family Medical History</Text>
              <Input
                placeholder="Type Something Here..."
                value={formData.familyMedicalHistory}
                onChangeText={text =>
                  setFormData({...formData, familyMedicalHistory: text})
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
            onPress={() => navigation.navigate('ParticularDoctorScreen')}
            style={[styles.button, {backgroundColor: '#5B8F6B'}]}
            accessibilityLabel="Submit Button">
            <Text style={styles.buttonText}>Submit</Text>
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
    // alignItems: '',
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

export default DoctorMedicalHistoryEdit;
