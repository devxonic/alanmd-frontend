import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fonts} from '../components/style';
import Input from '../components/common/Input';
import {useSelector} from 'react-redux';
import {updateDoctorProfile} from '../api/doctor';
import {updateNurseProfile} from '../api/nurse';
import Dropdown from '../components/common/Dropdown';
import DatePickers from '../components/common/DatePicker';

const DoctorPersonalInformationEdit = ({route, navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    middlename: '',
    lastname: '',
    Marital: '',
    dateOfBirth: '2024-06-21T18:26:52.379Z',
  });
  console.log('FORM DATA', formData);
  const role = useSelector(state => state?.user?.Role);
  console.log('FORM DATA', formData, '\n ROLE', role);

  useEffect(() => {
    setFormData({...route.params});
    console.log('Edit Profile', route.params);
    return () => {
      setFormData({});
    };
  }, []);
  const EditDoctorProfile = async () => {
    try {
      const response = await updateDoctorProfile(formData);
      console.log('RESPONSE', response);
      navigation.goBack();
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  const EditNurseProfile = async () => {
    try {
      const response = await updateNurseProfile(formData);
      console.log('RESPONSE', response);
      navigation.goBack();
    } catch (error) {
      console.log('ERROR', error);
    }
  };
  const handleUpdate = async () => {
    if (role === 'doctor') {
      EditDoctorProfile();
    } else {
      EditNurseProfile();
    }
  };
  let GenderCategories = [
    {name: 'Male', id: 1},
    {name: 'Female', id: 2},
  ];
  let Mr = [
    {name: 'Mr', id: 1},
    {name: 'Mrs', id: 2},
  ];
  return (
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
              <Dropdown
                data={Mr}
                formData={formData}
                setFormData={setFormData}
                width={90}
                prefix={'Mrs'}
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
            onChangeText={text => setFormData({...formData, middlename: text})}
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
              <Dropdown
                data={GenderCategories}
                formData={formData}
                setFormData={setFormData}
                prefix={'Choose Your Gender'}
              />
            </View>
          </View>
          <Text style={styles.InputHeading}>Marital Status</Text>
          <Input
            placeholder="Type Something Here..."
            value={formData.Marital}
            onChangeText={text => setFormData({...formData, Marital: text})}
          />
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
          onPress={() => navigation.navigate('DoctorContactInformationEdit')}
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
    // alignItems: 'flex-start',
    flex: 11,
    marginTop: 20,
    marginBottom: 20,
    width: '100%', // Adjusted to take full width
    maxWidth: 400, // Added maxWidth to limit width on larger screens
  },

  doctorName: {
    marginTop: 10,
    fontSize: 20,
    color: '#116754',
    fontFamily: Fonts.MEDIUM,
  },
  imageContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    borderRadius: 90,
    overflow: 'hidden',
  },
  imageBorder: {
    flex: 1,
    borderRadius: 90,
    borderColor: '#5B8F6B',
    borderWidth: 1.5,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: 'green',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  profileImage: {
    flex: 1,
    width: undefined,
    height: undefined,
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
