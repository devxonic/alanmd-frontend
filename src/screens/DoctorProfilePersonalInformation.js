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
import {useSelector} from 'react-redux';
import {updateDoctorProfile} from '../api/doctor';
import {updateNurseProfile} from '../api/nurse';
import DropDown from '../components/common/DropDown2';
import DatePickers from '../components/common/DatePicker';

const DoctorPersonalInformationEdit = ({route, navigation}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    maritalStatus: '',
    mr: '',
    gender: '',
    dateOfBirth: '2024-06-21T18:26:52.379Z',
  });
  console.log('FORM DATA', formData);

  let GenderCategories = [
    {name: 'Male', id: 1, value: 'male'},
    {name: 'female', id: 2, value: 'female'},
  ];
  let Mr = [
    {name: 'Mr', value: 'mr', id: 1},
    {name: 'Mrs', value: 'mrs', id: 2},
  ];
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={{width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
              }}>
              <View style={{flex: 1}}>
                <Text style={styles.InputHeading}>First Name</Text>
                <DropDown
                  value={Mr}
                  data={Mr}
                  formData={formData}
                  Objkey={'mr'}
                  setFormData={setFormData}
                  prefix={'Mr'}
                />
              </View>
              <View style={{flex: 3}}>
                <Text style={styles.InputHeading}> </Text>
                <Input
                  placeholder="Type Something Here..."
                  value={formData.name}
                  onChangeText={text => setFormData({...formData, name: text})}
                />
              </View>
            </View>
            <Text style={styles.InputHeading}>Middle Name</Text>
            <Input
              placeholder="Type Something Here..."
              value={formData.middlename}
              onChangeText={text =>
                setFormData({...formData, middlename: text})
              }
            />
            <Text style={styles.InputHeading}>Last Name</Text>
            <Input
              placeholder="Type Something Here..."
              value={formData.lastname}
              onChangeText={text => setFormData({...formData, lastname: text})}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 1}}>
                <Text style={styles.InputHeading}>Date Of Birth</Text>
                <DatePickers formData={formData} setFormData={setFormData} />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.InputHeading}>Gender</Text>
                <DropDown
                  value={GenderCategories}
                  data={GenderCategories}
                  formData={formData}
                  Objkey={'gender'}
                  setFormData={setFormData}
                  prefix={'Choose Your Gender'}
                />
              </View>
            </View>
            <Text style={styles.InputHeading}>Marital Status</Text>
            <Input
              placeholder="Type Something Here..."
              value={formData.marital}
              onChangeText={text => setFormData({...formData, marital: text})}
            />
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
            onPress={() =>
              navigation.navigate('DoctorContactInformationEdit', formData)
            }
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
    // alignItems: '',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    height: Dimensions.get('window').height,
  },
  profileContainer: {
    // alignItems: 'flex-start',
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
  //   imageContainer:{
  //     elevation:2,
  //     height:200,
  //     width:200,
  //     backgroundColor:'#efefef',
  //     position:'relative',
  //     borderRadius:999,
  //     overflow:'hidden',
  // },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
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
});

export default DoctorPersonalInformationEdit;
