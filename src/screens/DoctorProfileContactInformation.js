import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fonts} from '../components/style';
import Input from '../components/common/Input';
import {useSelector} from 'react-redux';
import {updateDoctorProfile} from '../api/doctor';
import {updateNurseProfile} from '../api/nurse';
import Dropdown from '../components/common/Dropdown';
import DropDown2 from '../components/common/DropDown2';
import DatePickers from '../components/common/DatePicker';
import RadioButton from '../components/common/RadioButton';

const DoctorContactInformationEdit = ({route, navigation}) => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    houseNumber: '',
    mobileNumber: '',
    workNumber: '',
    emailAddress: '',
    permissionToSendNewsLetter: false,
    permissionToCallOnNumberHouse: false,
    permissionToCallOnNumberMobile: false,
    permissionToCallOnNumberWork: false,
    permissionToCotactEmail: false,
  });
  console.log('FORM DATA', formData);
  let state = [
    {name: 'Sindh', value: 'sindh', id: 1},
    {name: 'Punjab', value: 'punjab', id: 2},
  ];

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={{width: '100%'}}>
            <View>
              <View>
                <Text style={styles.InputHeading}>Address</Text>
                <Input
                  placeholder="Type Something Here..."
                  value={formData.address}
                  onChangeText={text =>
                    setFormData({...formData, address: text})
                  }
                />
              </View>
              <View style={[styles.Dflex, {flexWrap: 'wrap'}]}>
                <View>
                  <Text style={styles.InputParagraph}>
                    Do we have permission to contact you at this address for
                    medical bills
                  </Text>
                </View>
                <View style={styles.Dflex}>
                  <View style={styles.Dflex}>
                    <RadioButton
                      selected={formData.permissionToSendNewsLetter}
                      onPress={() =>
                        setFormData({
                          ...formData,
                          permissionToSendNewsLetter: true,
                        })
                      }
                      label="Yes"
                    />
                  </View>
                  <View style={styles.Dflex}>
                    <RadioButton
                      selected={!formData.permissionToSendNewsLetter}
                      onPress={() =>
                        setFormData({
                          ...formData,
                          permissionToSendNewsLetter: false,
                        })
                      }
                      label="No"
                    />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.InputHeading}>City</Text>
              <Input
                placeholder="Type Something Here..."
                value={formData.location}
                onChangeText={text =>
                  setFormData({...formData, location: text})
                }
              />
            </View>
            <View style={styles.Dflex}>
              <View style={{flex: 1}}>
                <Text style={styles.InputHeading}>State</Text>
                <DropDown2
                  value={state}
                  data={state}
                  formData={formData}
                  Objkey={'state'}
                  setFormData={setFormData}
                  prefix={'Choose Your State'}
                />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.InputHeading}>Zip Code</Text>
                <Input
                  placeholder="Type Something Here..."
                  value={formData.zipCode}
                  onChangeText={text =>
                    setFormData({...formData, zipCode: text})
                  }
                />
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.InputHeading}>House Number</Text>
                <Input
                  placeholder="Type Something Here..."
                  value={formData.houseNumber}
                  onChangeText={text =>
                    setFormData({...formData, houseNumber: text})
                  }
                />
              </View>
              <View style={styles.Dflex}>
                <View>
                  <Text style={styles.InputParagraph}>
                    May we call this number?
                  </Text>
                </View>
                <View style={styles.Dflex}>
                  <View style={styles.Dflex}>
                    <RadioButton
                      selected={formData.permissionToCallOnNumberHouse}
                      onPress={() =>
                        setFormData({
                          ...formData,
                          permissionToCallOnNumberHouse: true,
                        })
                      }
                      label="Yes"
                    />
                  </View>
                  <View style={styles.Dflex}>
                    <RadioButton
                      selected={!formData.permissionToCallOnNumber}
                      onPress={() =>
                        setFormData({
                          ...formData,
                          permissionToCallOnNumberHouse: false,
                        })
                      }
                      label="No"
                    />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.InputHeading}>Mobile Number</Text>
                <Input
                  placeholder="Type Something Here..."
                  value={formData.mobileNumber}
                  onChangeText={text =>
                    setFormData({...formData, mobileNumber: text})
                  }
                />
              </View>
              <View style={styles.Dflex}>
                <View>
                  <Text style={styles.InputParagraph}>
                    May we call this number?
                  </Text>
                </View>
                <View style={styles.Dflex}>
                  <View style={styles.Dflex}>
                    <RadioButton
                      selected={formData.permissionToCallOnNumberMobile}
                      onPress={() =>
                        setFormData({
                          ...formData,
                          permissionToCallOnNumberMobile: true,
                        })
                      }
                      label="Yes"
                    />
                  </View>
                  <View style={styles.Dflex}>
                    <RadioButton
                      selected={!formData.permissionToCallOnNumberMobile}
                      onPress={() =>
                        setFormData({
                          ...formData,
                          permissionToCallOnNumberMobile: false,
                        })
                      }
                      label="No"
                    />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.InputHeading}>Work Number</Text>
                <Input
                  placeholder="Type Something Here..."
                  value={formData.workNumber}
                  onChangeText={text =>
                    setFormData({...formData, workNumber: text})
                  }
                />
              </View>
              <View style={styles.Dflex}>
                <View style={{marginRight: 2}}>
                  <Text style={styles.InputParagraph}>
                    May we call this number?
                  </Text>
                </View>
                <View style={styles.Dflex}>
                  <View style={styles.Dflex}>
                    <RadioButton
                      selected={formData.permissionToCallOnNumberWork}
                      onPress={() =>
                        setFormData({
                          ...formData,
                          permissionToCallOnNumberWork: true,
                        })
                      }
                      label="Yes"
                    />
                  </View>
                  <View style={styles.Dflex}>
                    <RadioButton
                      selected={!formData.permissionToCallOnNumberWork}
                      onPress={() =>
                        setFormData({
                          ...formData,
                          permissionToCallOnNumberWork: false,
                        })
                      }
                      label="No"
                    />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.InputHeading}>Email Address</Text>
                <Input
                  placeholder="Type Something Here..."
                  value={formData.emailAddress}
                  onChangeText={text =>
                    setFormData({...formData, emailAddress: text})
                  }
                />
              </View>
              <View style={styles.Dflex}>
                <View style={{marginRight: 2}}>
                  <Text style={styles.InputParagraph}>
                    May we call this number?
                  </Text>
                </View>
                <View style={styles.Dflex}>
                  <View style={styles.Dflex}>
                    <RadioButton
                      selected={formData.permissionToCotactEmail}
                      onPress={() =>
                        setFormData({
                          ...formData,
                          permissionToCotactEmail: true,
                        })
                      }
                      label="Yes"
                    />
                  </View>
                  <View style={styles.Dflex}>
                    <RadioButton
                      selected={!formData.permissionToCotactEmail}
                      onPress={() =>
                        setFormData({
                          ...formData,
                          permissionToCotactEmail: false,
                        })
                      }
                      label="No"
                    />
                  </View>
                </View>
              </View>
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
            onPress={() =>
              navigation.navigate('DoctorInsuranceInformationEdit', formData)
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
  },
  profileContainer: {
    // alignItems: 'flex-start',
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

export default DoctorContactInformationEdit;
