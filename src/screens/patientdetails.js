import React, {useEffect} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PatientDetails = ({route, navigation}) => {
  const routeData = route.params;
  let contactInformation = routeData.item.patientId.contactInformation;
  let personalInformation = routeData.item.patientId.personalInformation;
  let emergencyContact = routeData.item.patientId.emergencyContact;
  let insuranceInformation = routeData.item.patientId.insuranceInformation;
  let medicalHistory = routeData.item.patientId.medicalHistory;
  let item = routeData.item;
  let Date = personalInformation.dateOfBirth;
  let Datee = Date.split('T')[0];
  useEffect(() => {
    console.log('Item', item);
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text style={styles.Heading}>Patient Details</Text>
          <View style={styles.subContainer}>
            <Text style={styles.text}>
              First Name : {personalInformation.genderTitle}{' '}
              {personalInformation.firstName}
            </Text>
            <Text style={styles.text}>
              Middle Name : {personalInformation.middleName}
            </Text>
            <Text style={styles.text}>
              Last Name : {personalInformation.lastName}
            </Text>
            <Text style={styles.text}>Date of Birth : {Datee}</Text>
            <Text style={styles.text}>
              Gender : {personalInformation.gender}
            </Text>
            <Text style={styles.text}>
              Marital Status : {personalInformation.maritalStatus}
            </Text>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.Heading}>Patient Contact Details</Text>
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.text}>
                Address : {contactInformation.address}
              </Text>
              <Text style={styles.smalltext}>
                Can we contact you at this address about medical bills |{' '}
                <Text style={styles.radiobutton}>
                  {contactInformation.permissionToSendNewsLetter ? 'Yes' : 'No'}
                </Text>
              </Text>
            </View>
            <Text style={styles.text}>City : {contactInformation.city}</Text>
            <Text style={styles.text}>State : {contactInformation.state}</Text>
            <Text style={styles.text}>
              Zip Code : {contactInformation.zipCode}
            </Text>
            <Text style={styles.text}>
              House Number : {contactInformation.houseNumber}
            </Text>
            <Text style={styles.smalltext}>
              May we call this Number ? |{' '}
              <Text style={styles.radiobutton}>
                {contactInformation.permissionToCallOnNumberHouse
                  ? 'Yes'
                  : 'No'}
              </Text>
            </Text>
            <Text style={styles.text}>
              Mobile Number : {contactInformation.mobileNumber}
            </Text>
            <Text style={styles.smalltext}>
              May we call this Number ? |{' '}
              <Text>
                {contactInformation.permissionToCallOnNumberMobile
                  ? 'Yes'
                  : 'No'}
              </Text>
            </Text>
            <Text style={styles.text}>
              Work Number : {contactInformation.workNumber}
            </Text>
            <Text style={styles.smalltext}>
              May we call this Number ? |{' '}
              <Text style={styles.radiobutton}>
                {contactInformation.permissionToCallOnNumberWork ? 'Yes' : 'No'}
              </Text>
            </Text>
            <Text style={styles.text}>
              Email Address : {contactInformation.emailAddress}
            </Text>
            <Text style={styles.smalltext}>
              May we call this Number ? |{' '}
              <Text>
                {contactInformation.permissionToContactEmail ? 'Yes' : 'No'}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.Heading}>Patient Insurance Details</Text>
          <View style={styles.subContainer}>
            <Text style={styles.text}>
              Insurance Provider : {insuranceInformation.insuranceProvider}
            </Text>
            <Text style={styles.text}>
              Policy Number : {insuranceInformation.policyNumber}
            </Text>
            <Text style={styles.text}>
              Group Number : {insuranceInformation.groupNumber}
            </Text>
            <Text style={styles.text}>
              Zip Code : {insuranceInformation.zipCode}
            </Text>
            <Text style={styles.text}>
              Primary Insured Name : {insuranceInformation.primaryInsuredName}
            </Text>
            <Text style={styles.text}>
              Relationship to Patient :
              {insuranceInformation.relationshipToPatient}
            </Text>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.Heading}>Patient Emergeny Details</Text>
          <View style={styles.subContainer}>
            <Text style={styles.text}>
              Contact Name : {emergencyContact.contactName}
            </Text>
            <Text style={styles.text}>
              Relationship : {emergencyContact.relationship}
            </Text>
            <Text style={styles.text}>
              Phone Number : {emergencyContact.phoneNumber}
            </Text>
            <Text style={styles.text}>
              Alternate Phone Number : {emergencyContact.alternatePhoneNumber}
            </Text>
            <Text style={styles.text}>
              Primary Insured Name : {emergencyContact.primaryInsuredName}
            </Text>
            <Text style={styles.text}>
              Relationship to Patient : {emergencyContact.relationshipToPatient}
            </Text>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.Heading}>Patient Medical History</Text>
          <View style={styles.subContainer}>
            <Text style={styles.text}>
              Allergies : {medicalHistory.allergies}
            </Text>
            <Text style={styles.text}>
              Current Medications : {medicalHistory.currentMedications}
            </Text>
            <Text style={styles.text}>
              Family Medical History : {medicalHistory.familyMedicalHistory}
            </Text>
            <Text style={styles.text}>
              Previous Surgeries : {medicalHistory.previousSurgeries}
            </Text>
            <Text style={styles.text}>
              Primary Care Physician : {medicalHistory.primaryCarePhysician}
            </Text>
            <Text style={styles.text}>
              Relationship to Patient : {medicalHistory.relationshipToPatient}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, {borderColor: '#5B8F6B', borderWidth: 1}]}
          accessibilityLabel="Previous">
          <Text style={[styles.buttonText, {color: '#5B8F6B'}]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ParticularPatientScreen', {item})}
          style={[styles.button, {backgroundColor: '#5B8F6B'}]}
          accessibilityLabel="Next">
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default PatientDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E7F0EE',
  },
  profileContainer: {
    flex: 1,
    width: '100%',
    padding: 15,
  },
  subContainer: {
    backgroundColor: '#c4dbd6',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#116764',
  },
  text: {
    fontSize: 16,
    paddingBottom: 5,
    color: '#116754',
    fontWeight: 'bold',
  },
  smalltext: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  radiobutton: {
    fontWeight:"900",
    fontSize: 12,
  },
  Heading: {
    fontSize: 20,
    color: '#116754',
    fontWeight: 'bold',
    marginBottom: 10,
    borderColor: '#116754',
    borderLeftWidth: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    backgroundColor: '#E7F0EE',
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 30,
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
    fontSize: 14,
  },
});
[
  {
    contactInformation: {
      address: 'Street No 102 New York',
      city: 'Karachi',
      emailAddress: 'Hammad@gmail.com',
      houseNumber: '485',
      mobileNumber: '0312-46648548',
      permissionToCallOnNumberHouse: true,
      permissionToCallOnNumberMobile: false,
      permissionToCallOnNumberWork: true,
      permissionToContactEmail: false,
      permissionToSendNewsLetter: false,
      state: 'NewMexico',
      workNumber: '0345-4664644',
      zipCode: '09098',
    },
  },
];
