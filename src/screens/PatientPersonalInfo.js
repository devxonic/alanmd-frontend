import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fonts } from '../components/style';
import Input from '../components/common/Input';
import DropDown from '../components/common/Dropdown';
import DatePickers from '../components/common/DatePicker';
import { getPersonalInfo } from '../api/patient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientPersonalInfo = ({ route, navigation }) => {

  const [FetchedData, setFetchedData] = useState()
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    maritalStatus: '',
    genderTitle: '',
    gender: '',
    dateOfBirth: '2024-06-21T18:26:52.379Z',
  });
  const routeData = route.params;
  let GenderCategories = [
    { name: 'Male', id: 1, value: 'male' },
    { name: 'female', id: 2, value: 'female' },
  ];
  let Mr = [
    { name: 'Mr', value: 'mr', id: 1 },
    { name: 'Mrs', value: 'mrs', id: 2 },
  ];

  const fetchPresonalInfo = async () => {
    try {
      let user = await AsyncStorage.getItem('user')
      console.log("user -----------------",JSON.parse(user).id)
      const response = await getPersonalInfo(JSON.parse(user).id)
      console.log('Patient Profile Response', response.data)
      setFetchedData(response.data)
      setFormData({ ...response.data.personalInformation })
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchPresonalInfo()
  }, [])

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={{ width: '100%' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
              }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.InputHeading}>First Name</Text>
                <DropDown
                  value={Mr}
                  data={Mr}
                  formData={formData}
                  Objkey={'genderTitle'}
                  setFormData={setFormData}
                  prefix={'Mr'}
                />
              </View>
              <View style={{ flex: 3 }}>
                <Text style={styles.InputHeading}> </Text>
                <Input
                  placeholder="Type Something Here..."
                  value={formData.firstName}
                  onChangeText={text =>
                    setFormData({
                      ...formData,
                      firstName: text,
                    })
                  }
                />
              </View>
            </View>
            <Text style={styles.InputHeading}>Middle Name</Text>
            <Input
              placeholder="Type Something Here..."
              value={formData.middleName}
              onChangeText={text =>
                setFormData({ ...formData, middleName: text })
              }
            />
            <Text style={styles.InputHeading}>Last Name</Text>
            <Input
              placeholder="Type Something Here..."
              value={formData.lastName}
              onChangeText={text => setFormData({ ...formData, lastName: text })}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.InputHeading}>Date Of Birth</Text>
                <DatePickers formData={formData} setFormData={setFormData} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.InputHeading}>Gender</Text>
                <DropDown
                  value={GenderCategories}
                  data={GenderCategories}
                  formData={formData}
                  Objkey={'gender'}
                  setFormData={setFormData}
                  prefix={'Select Gender'}
                />
              </View>
            </View>
            <Text style={styles.InputHeading}>Marital Status</Text>
            <Input
              placeholder="Type Something Here..."
              value={formData.maritalStatus}
              onChangeText={text =>
                setFormData({ ...formData, maritalStatus: text })
              }
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button, { borderColor: '#5B8F6B', borderWidth: 1 }]}
            accessibilityLabel="Previous">
            <Text style={[styles.buttonText, { color: '#5B8F6B' }]}>
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PatientContactInfo', {
                personalInformation: formData,
                FetchedData: FetchedData,
                routeData,
              })
            }
            style={[styles.button, { backgroundColor: '#5B8F6B' }]}
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
    marginBottom: 30,
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
});

export default PatientPersonalInfo;
