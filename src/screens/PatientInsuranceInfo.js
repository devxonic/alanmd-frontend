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
import DropDown from '../components/common/Dropdown';
import {getInsureanceInfo} from '../api/patient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientInsuranceInfo = ({route, navigation}) => {
  const [FetchedData, setFetchedData] = useState();
  const [formData, setFormData] = useState({
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    zipCode: '',
    primaryInsuredName: '',
    relationshipToPatient: '',
  });
  const routeData = route.params;
  handleNext = () => {
    navigation.navigate('PatientEmergencyInfo', {
      insuranceInformation: formData,
      FetchedData: FetchedData,
      routeData: routeData,
    });
  };
  let insuranceProvidr = [
    {name: '00000000021', value: '00000000021', id: 1},
    {name: '00000000022', value: '00000000022', id: 2},
  ];
  let policyNumbr = [
    {name: '00000000021', value: '00000000021', id: 1},
    {name: '00000000022', value: '00000000022', id: 2},
  ];

  const fetchInsureanceInfo = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      const response = await getInsureanceInfo(JSON.parse(user).id);
      setFetchedData(response.data);
      setFormData({...response.data.insuranceInformation});
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchInsureanceInfo();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={{width: '100%'}}>
            <View style={(styles.Dflex, {flexDirection: 'column'})}>
              <View>
                <Text style={styles.InputHeading}>Insurance Provider</Text>
              </View>
              <View style={{height: 60}}>
                <DropDown
                  value={insuranceProvidr}
                  data={insuranceProvidr}
                  formData={formData}
                  setFormData={setFormData}
                  Objkey={'insuranceProvider'}
                  prefix={'Choose Your Insurance Provider'}
                />
              </View>
            </View>
            <View style={(styles.Dflex, {flexDirection: 'column'})}>
              <View>
                <Text style={styles.InputHeading}>Policy Number</Text>
              </View>
              <View style={{height: 60}}>
                <DropDown
                  value={policyNumbr}
                  data={policyNumbr}
                  formData={formData}
                  setFormData={setFormData}
                  Objkey={'policyNumber'}
                  prefix={'Choose Your Policy Number'}
                />
              </View>
            </View>
            <View style={(styles.Dflex, {flexDirection: 'column'})}>
              <View>
                <Text style={styles.InputHeading}>Group Number</Text>
              </View>
              <View style={{height: 60}}>
                <DropDown
                  value={policyNumbr}
                  data={policyNumbr}
                  formData={formData}
                  setFormData={setFormData}
                  Objkey={'groupNumber'}
                  prefix={'Choose Your Group Number'}
                />
              </View>
            </View>
            <View>
              <Text style={styles.InputHeading}>Zip Code</Text>
              <Input
                placeholder="Type Something Here..."
                value={formData.zipCode}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                onChangeText={text => setFormData({...formData, zipCode: text})}
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
            accessibilityLabel="Logout Button">
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

export default PatientInsuranceInfo;
