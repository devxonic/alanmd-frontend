import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Fonts} from '../components/style';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Button from '../components/common/Button';
import DocumentPicker from 'react-native-document-picker';
import {BASE_URL, uploadFile} from '../api/apihandler';
import {updateAppoinment} from '../api/doctor';
import {useSelector} from 'react-redux';
import PrescriptionInputCard from '../components/Card/VoiceAndMediaCard/PrescriptionInputCard';
import AttachedFile from '../components/common/AttachedFile';

const ParticularPatientScreen = ({route, navigation}) => {
  const {item} = route.params;
  console.log('ITEM', item);

  // const [isNurse, setIsNurse] = useState(false);
  let data = useSelector(state => state.user.Role);
  const [isLoading, setIsLoading] = useState(false);

  // const [prescriptionFile, setPrescriptionFile] = useState(null);
  //   const [reportsFile, setReportsFile] = useState(null);
  const [notesFile, setNotesFile] = useState(null);

  // const [prescriptionText, setPrescriptionText] = useState('');
  //   const [reportsText, setReportText] = useState('');
  const [NotesText, setNotesText] = useState('');

  // const [isPrescriptionListening, setPrescriptionListening] = useState(false);
  // const [isNotesListening, setNotesListening] = useState(false);
  // const [isReportListening, setReportListening] = useState(false);
  // console.log('PRESCRIPTION File', prescriptionFile, reportsFile, notesFile);
  const handleDocumentPicker = async type => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const formData = new FormData();

      const selectedFile = doc?.[0];
      const file = {
        // Edit Here
        uri: selectedFile.uri, // Edit Here,
        name: selectedFile.name, // Edit Here, Image Name with Extension very important
        type: selectedFile.type, // Edit Here
      };
      formData.append('Media', file);
      const responce = await uploadFile(formData);
      console.log('RESPONSE', responce.data?.url);

      if (type === 'notes') {
        if (!!reportsFile) {
          setNotesFile([
            ...reportsFile,
            {
              name: selectedFile.name,
              filetype: responce?.data?.filetype,
              url: BASE_URL + responce?.data?.url,
            },
          ]);
        } else {
          setNotesFile([
            {
              name: selectedFile.name,
              filetype: responce?.data?.filetype,
              url: BASE_URL + responce?.data?.url,
            },
          ]);
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancel the upload', err);
      } else {
        console.log(err);
      }
    }
  };

  const handleUpdateAppointment = async () => {
    setIsLoading(true);
    console.log('assign Nurse ------------------------------------------------')
    console.log('items  ------------------------------------------------' , item)

    let body = {
      appointmentId : item._id,
      prescription: item.prescription,
      doctorNotes: NotesText,
      doctorReport: item.doctorReport,
      prescriptionMedia: item.prescriptionMedia,
      doctorNotesMedia: notesFile,
      doctorReportsMedia: item.doctorReportsMedia,
    };
    console.log('Body ---------------- ', body);
    try {
      const response = await updateAppoinment(body);
      console.log('RESPONSE', response);
      console.log('Update Appointment Response => -----------------------------------------', response.data);
      setIsLoading(false);
      navigation.navigate('NurseList', {item: body});
    } catch (error) {
      setIsLoading(false);
      console.log('Error in Update Appointment =>', error.response);
    }
  };

  useEffect(() => {
    if (item) {
      setNotesText(item.doctorNotes);
      setNotesFile(item.doctorNotesMedia);
    }
    return () => {
      setNotesFile(null);
      setNotesText('');
    };
  }, [item]);

  const handleNext = () => {
    console.log('Item', item);
    let updateditems = {
      ...item,
      doctorNotes: NotesText,
      doctorNotesMedia: notesFile,
    };
    navigation.navigate('patientReports', {item: updateditems});
  };
  return (
    <View style={{backgroundColor: '#e3eeeb', flex: 1, paddingVertical: 3}}>
      <ScrollView>
        <Text
          style={{
            fontFamily: Fonts.REGULAR,
            fontSize: 26,
            marginVertical: 5,
            width: '100%',
            textAlign: 'center',
            color: 'black',
          }}>
          {data === 'nurse' ? 'Appoinment Details' : 'Patient Details'}
        </Text>
        <View style={styles.container}>
          <View style={styles.childOne}>
            <Image
              style={{
                width: '100%',
                height: 80,
                objectFit: 'cover',
                borderRadius: 5,
              }}
              source={{
                uri: 'https://i.pinimg.com/736x/8b/e9/70/8be970b311337d17d37b354b571565b9.jpg',
              }}
            />
          </View>
          <View style={styles.childTwo}>
            <View style={styles.childTwoOne}>
              <Text style={styles.headingText}>
                {item['patientId']?.email.split('@')?.[0] ||
                  item['patientId']?.username}
              </Text>
              <Text style={styles.badge}>pending</Text>
            </View>
            <View style={styles.childTwoTwo}>
              <Text style={styles.light}>Patient #</Text>
              <Text style={styles.light}>Disease Category</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#116754',
                  padding: 10,
                  borderRadius: 25,
                }}>
                <Icon name="location-dot" size={16} color={'white'} />
              </View>
              <Text
                style={{
                  fontFamily: Fonts.REGULAR,
                  fontSize: 13,
                  color: 'black',
                  paddingLeft: 5,
                }}>
                Abcd location address
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 10,
            height: Dimensions.get('window').height * 0.65,
            justifyContent: 'space-around',
          }}>
          <PrescriptionInputCard
            heading="Doctor's Notes"
            type={'notes'}
            handleDocumentPicker={handleDocumentPicker}
            prescriptionText={NotesText}
            setComponentText={text => setNotesText(text)}
          />
          <AttachedFile AttachementFile={notesFile} />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            paddingTop: 10,
            paddingBottom: 20,
            justifyContent: 'space-around',
          }}>
          {data === 'nurse' ? (
            <AproveAndCancelButtons
              onPressAprove={() =>
                navigation.navigate('Doctordashboard', {item: item})
              }
              onPressCancel={() => navigation.goBack()}
            />
          ) : (
            <AssignNurseButton onPress={handleUpdateAppointment} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ParticularPatientScreen;

const AssignNurseButton = ({onPress}) => {
  return (
    <View style={{paddingHorizontal: 15}}>
      <Button text="Assign Nurse" Link={onPress} />
    </View>
  );
};

const AproveAndCancelButtons = ({onPressAprove, onPressCancel}) => {
  return (
    <View style={{paddingHorizontal: 15}}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onPressAprove}
          style={[styles.button, {backgroundColor: '#116754'}]}>
          <Text style={{color: 'white', fontSize: 14}}>Aprove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressCancel}
          style={[styles.button, {backgroundColor: '#C54B4B'}]}>
          <Text style={{color: 'white', fontSize: 14}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    paddingLeft: 5,
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
    padding: 5,
    borderRadius: 2,
    margin: 5,
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
    margin: 5,
  },
  childThreeThreeText: {
    color: 'white',
    fontSize: 11,
    marginLeft: 3,
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
